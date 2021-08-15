// 这样做是为了让所有读取的代码都知道正确的env。
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// 使脚本在未处理的拒绝中崩溃而不是静默
// 忽略它们 在将来，承诺拒绝是不会被处理的
// 用一个非零的退出码终止Node.js进程。
process.on('unhandledRejection', err => {
  throw err;
});


const jest = require('jest');
const argv = process.argv.slice(2);

// console.log(argv, argv[argv.length -1])
// 除非在CI或覆盖模式下监听
// if (argv[argv.length - 1].indexOf('--coverage') < 0) {
//   argv.push('--watch');
// }

jest.run(argv);
