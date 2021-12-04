const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const fs = require("fs");
const path = require("path");

const configJsPath = path.join(__dirname, "./routes.ts");
const resultPath = path.join(__dirname, "./result.ts");

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
  
  traverse(configJsTree, {
    ArrayExpression(path) {
      // json数组里添加一个对象
      const newObj = t.objectExpression([
        t.objectProperty(
          t.identifier("key"),
          t.stringLiteral("testPath")
        ),
        t.objectProperty(
          t.identifier("path"),
          t.stringLiteral("/testPath")
        ),
        t.objectProperty(
          t.identifier("exact"),
          t.booleanLiteral(true)
        ),
        t.objectProperty(
          t.identifier("Component"),
          t.identifier("XXXX")
        )
      ]);

      path.node.elements.push(newObj);
    },
  });

  // 结果写入文件
  // 解决中文为unicode乱码的问题 jsescOption: { minimal: true }
  const result = generate(configJsTree, { jsescOption: { minimal: true } }, "").code;
  console.log('转化后的结果', result);
  fs.writeFileSync(resultPath, result);
};

updateRoutesViews();
