const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//判断是不是目录
function isDir(_path) {
  return exists(_path) && fs.statSync(_path).isDirectory();
}

//检查指定路径的文件或者目录是否存在
function exists(_path) {
  return fs.existsSync(_path);
}

// 返回 UI 组件库所有路径的 Array
// 这些路径用于Webpack配置中
function readSrcSync(filepath, ret) {
  ret = ret || [];
  let files = fs.readdirSync(filepath);
  for (var i = 0; i < files.length; i++) {
    let curPath = path.resolve(filepath, files[i]);
    if (isDir(curPath)) {
      if (files[i] !== 'style' && files[i] !== 'font' && files[i] !== '__test__') {
        readSrcSync(curPath, ret);
      }
    } else if (/\.(js)$/.test(files[i])) {
      ret.push(curPath);
    }
  }
  return ret;
}

module.exports = {
  appBuildDist: resolveApp('dist'),
  appDocs: resolveApp('docs'),
  appHtml: resolveApp('script/public/index.html'),
  appIndexJs: resolveApp('docs/index.js'),
  appFavicon: resolveApp('docs/assets/favicon.png'),
  appSrc: resolveApp('src'),
  readSrcSync,
};
