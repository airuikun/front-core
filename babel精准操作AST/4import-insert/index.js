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

  traverse(configJsTree, {
    // 整个代码的根节点
    Program(path) {

      // console.log('path.node.body', path.node.body);

      // 生成：import bbb from "aa";
      const importStatment1 = t.importDeclaration([t.importDefaultSpecifier(t.identifier(`bbb`))], t.stringLiteral(`aa`))
      path.node.body.push(importStatment1)

      // 生成：import { aa as bbb } from "aa";      
      const importStatment2 = t.importDeclaration([t.importSpecifier(t.identifier(`bbb`), t.identifier(`aa`))], t.stringLiteral(`aa`))
      path.node.body.push(importStatment2)

      // 生成：import * as bbb from "aa";     
      const importStatment3 = t.importDeclaration([t.importNamespaceSpecifier(t.identifier(`bbb`))], t.stringLiteral(`aa`))
      path.node.body.push(importStatment3)

      // 生成：import { bbb, bbb1 } from "aa";     
      const importStatment4 = t.importDeclaration([t.importSpecifier(t.identifier(`bbb`), t.identifier(`bbb`)), t.importSpecifier(t.identifier(`bbb1`), t.identifier(`bbb1`))], t.stringLiteral(`aa`))
      path.node.body.push(importStatment4)
     
    },
  });

  // 结果写入文件
  // 解决中文为unicode乱码的问题 jsescOption: { minimal: true }
  const result = generate(configJsTree, { jsescOption: { minimal: true } }, "").code;
  console.log('转化后的结果', result);
  fs.writeFileSync(resultPath, result);
};

updateRoutesViews();
