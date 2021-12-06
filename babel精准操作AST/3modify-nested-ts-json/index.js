const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const fs = require("fs");
const path = require("path");

const configJsPath = path.join(__dirname, "./menu.ts");
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
    ObjectProperty(path) {
      // 搜索并识别出配置文件里key: "home" 这个object对象位置
      if ( path.node.key.name === "key" && path.node.value.value === "home" ) {
        path.parent.properties.forEach(e=>{
          if ( e.key.name === "children" ) {
            const newObj = t.objectExpression([
              t.objectProperty(
                t.identifier("key"),
                t.stringLiteral("testPath")
              ),
              t.objectProperty(
                t.identifier("icon"),
                t.identifier("HomeOutlined")
              ),
              t.objectProperty(
                t.identifier("exact"),
                t.booleanLiteral(true)
              ),
            ]);
            e.value.elements.push(newObj)
          }
        })
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
