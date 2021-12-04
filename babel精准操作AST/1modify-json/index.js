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
  let configJsTree = parser.parse(`${configJsData}`);

  traverse(configJsTree, {
    ArrayExpression(path) {
      // json数组里添加一个对象
      const newObj = t.objectExpression([
        t.objectProperty(
          t.identifier("description"),
          t.stringLiteral(`哈哈和`)
        )
      ]);
      path.node.elements.push(newObj);
      // json数组里添加一个数组
      const arr = t.arrayExpression([newObj]);
      path.node.elements.push(arr);
      // json数组里添加一个数字、字符串
      path.node.elements.push(t.stringLiteral('1111'));
      path.node.elements.push(t.numericLiteral(222));
      path.node.elements.push(t.identifier("XXXX"));
      // 因为我们添加了数组 会导致无限次数的ArrayExpression的traverse 会报错 所以要加path.skip()
      path.skip()
    },
  });

  // 结果写入文件
  // 解决中文为unicode乱码的问题 jsescOption: { minimal: true }
  const result = generate(configJsTree, { jsescOption: { minimal: true } }, "").code;
  console.log('转化后的结果', result);
  fs.writeFileSync(resultPath, result);
};

updateRoutesViews();
