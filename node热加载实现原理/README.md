# smart-node-reload

a method of nodejs code hot reload without restart

基于nodejs的云端热部署原理与实现 

大家都知道，nodejs启的后端服务，如果有代码变动，要重启进程，代码才能生效。

nodejs的进程在重启的时候，用户去访问服务，就会出现短暂的 `502 bad gateway`

如果你的服务器加上了watch机制

当服务器上的代码频繁发生变动，或者短时间内发生高频变动，那就会一直 `502 bad gateway`

近段时间在做云编译相关需求的时候，就出现了短时间内线上服务代码高频变动，代码功能模块高频更新，在不能重启服务的情况下，让更新的代码生效的场景。

这就涉及到一个热部署的概念，在不重启服务的情况下，让新部署的代码生效。


# 源码使用

nodejs版本：v10.5.0

`git clone`下来以后，无需安装，直接运行
```javascript
    npm start
```
这时候就开启了热部署变动监听

如何看到效果呢

爸爸请看`/hots/hot.js`文件
```javascript
    const hot = 1
    module.exports = hot
```
将第一行代码改为const hot = 111
```javascript
    const hot = 111
    module.exports = hot
```
这时候就能看到终端里监听到代码变动，然后动态加载你的最新代码并得到执行结果，输出为：
```javascript
    热部署文件： hot.js ，执行结果： { 'hot.js': 111 }
```
热部署服务监听到代码变动，并重新加载了代码，爸爸们就可以实时拿到最新代码的执行结果了，整个过程都在线上环境运行，node进程也没有重启

# 源码解析

### 代码没法实时生效的原因
当我们通过`require('xx/xx.js')`去加载一个功能模块的时候，node会把`require('xx/xx.js')`得到的结果缓存在`require.cache('xx/xx.js')`中

当我们多次调用`require('xx/xx.js')`，node就不再重新加载，而是直接从`require.cache('xx/xx.js')`读取缓存

所以当在服务器上修改`xx/xx.js`这个路径下的文件时，node只会去读取缓存，不会去加载你的最新代码


#### loadHandlers主函数
```javascript
const handlerMap = {};// 缓存
const hotsPath = path.join(__dirname, "hots");

// 加载文件代码 并 监听指定文件夹目录文件内容变动
const loadHandlers = async () => {
  // 遍历出指定文件夹下的所有文件
  const files = await new Promise((resolve, reject) => {
    fs.readdir(hotsPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
  // 初始化加载所有文件 把每个文件结果缓存到handlerMap变量当中
  for (let f in files) {
    handlerMap[files[f]] = await loadHandler(path.join(hotsPath, files[f]));
  }

  // 监听指定文件夹的文件内容变动
  await watchHandlers();
};
```
`loadHandlers`是整个热部署服务的主函数，我们指定了服务器根目录下的`hots`文件夹是用来监听变动和热部署的文件夹

用`fs.readdir`扫描`hots`文件夹下的所有文件，通过`loadHandler`方法去加载和运行每一个扫描到的文件，将结果缓存到`handlerMap`里

然后用`watchHandlers`方法开启文件变动监听

#### watchHandlers监听文件变动
```javascript
// 监视指定文件夹下的文件变动
const watchHandlers = async () => {
  // 这里建议用chokidar的npm包代替文件夹监听
  fs.watch(hotsPath, { recursive: true }, async (eventType, filename) => {
    // 获取到每个文件的绝对路径 
    // 包一层require.resolve的原因，拼接好路径以后，它会主动去帮你判断这个路径下的文件是否存在
    const targetFile = require.resolve(path.join(hotsPath, filename));
    // 当你适应require加载一个模块后，模块的数据就会缓存到require.cache中，下次再加载相同模块，就会直接走require.cache
    // 所以我们热加载部署，首要做的就是清除require.cache中对应文件的缓存
    const cacheModule = require.cache[targetFile];
    // 去除掉在require.cache缓存中parent对当前模块的引用，否则会引起内存泄露，具体解释可以看下面的文章
	//《记录一次由一行代码引发的“血案”》https://cnodejs.org/topic/5aaba2dc19b2e3db18959e63
	//《一行 delete require.cache 引发的内存泄漏血案》https://zhuanlan.zhihu.com/p/34702356
    if (cacheModule.parent) {    
        cacheModule.parent.children.splice(cacheModule.parent.children.indexOf(cacheModule), 1);
    }
    // 清除指定路径对应模块的require.cache缓存
    require.cache[targetFile] = null;

    // 重新加载发生变动后的模块文件，实现热加载部署效果，并将重新加载后的结果，更新到handlerMap变量当中
    const code = await loadHandler(targetFile)
    handlerMap[filename] = code;
    console.log("热部署文件：", filename, "，执行结果：", handlerMap);
  });
};
```
`watchHandlers`函数是用来监听指定文件夹下的文件变动、清理缓存更新缓存用的。

用`fs.watch`原生函数监听`hots`文件夹下文件变动，当文件发生变动，就算出文件的绝对路径`targetFile`

而`require.cache[targetFile]`就是`require`对`targetFile`原文件的缓存，清除缓存用`require.cache[targetFile] = null;`

坑爹的地方来了，仅仅只是将缓存置为null，会发生内存泄露，我们还需要清除缓存父级的引用`require.cache[targetFile].parent`，就是下面这段代码

```javascript
    if (cacheModule.parent) {    
        cacheModule.parent.children.splice(cacheModule.parent.children.indexOf(cacheModule), 1);
    }
```

#### loadHandler加载文件
```javascript
// 加载指定文件的代码
const loadHandler = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        resolve(null);
      } else {
        try {
          // 使用vm模块的Script方法来预编译发生变化后的文件代码，检查语法错误，提前发现是否存在语法错误等报错
          new vm.Script(data);
        } catch (e) {
          // 语法错误,编译失败
          reject(e);
          return;
        }
        // 编译通过后，重新require加载最新的代码
        resolve(require(filename));
      }
    });
  });
};
```
loadHandler函数的作用是加载指定文件，并校验新文件代码语法等。

通过fs.readFile读取文件内容

用node原生vm模块vm.Script方法去预编译发生变化后的文件代码，检查语法错误，提前发现是否存在语法错误等报错

检验通过后，通过resolve(require(filename))方法重新将文件require加载，并自动加入到require.cache缓存中

