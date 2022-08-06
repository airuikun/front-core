const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const fs = require("fs");
const path = require("path");

const configJsPath = path.join(__dirname, "./config.js");
const resultPath = path.join(__dirname, "./result.js");

//更新routes文件下views的路由
const updateRoutesViews = () => {
  let configJsData = fs.readFileSync(configJsPath, "utf8");
  let configJsTree = parser.parse(`${configJsData}`,{
    // 加了下面的配置 就可以解析export 和 import了 
    // parse in strict mode and allow module declarations
    sourceType: "module",
    plugins: [
      // enable jsx and flow syntax
      "jsx",
      "flow",
    ],
  });

  // console.log('configJsTree', JSON.stringify(configJsTree));

  // 找到antd的import的代码 然后将CheckBox合并进去
  traverse(configJsTree, {
    ImportDeclaration(path) {
      // 扫描出有antd的引入
      if ( path.node.source.value === 'antd' ) {
        // console.log('path.node.specifiers', path.node.specifiers);
        let sign = false;
        path.node.specifiers.forEach(e=>{
          console.log('e.local.name', e.local.name);
          // 扫描antd里是否引用了CheckBox
          if ( e.local.name === 'CheckBox' ) {
            sign = true;
          }
        })
        // antd里没有引用CheckBox
        if ( !sign ) {
          // 将CheckBox合并到antd的引入中
          const element = t.importSpecifier(t.identifier(`CheckBox`), t.identifier(`CheckBox`))
          path.node.specifiers.push(element)
        }
      }
    },
  });

  // 结果写入文件
  // 解决中文为unicode乱码的问题 jsescOption: { minimal: true }
  const result = generate(configJsTree, { jsescOption: { minimal: true } }, "").code;
  console.log('转化后的结果', result);
  fs.writeFileSync(resultPath, result);
};

updateRoutesViews();
