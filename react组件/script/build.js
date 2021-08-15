import webpack from 'webpack';
import load from 'loading-cli';
import 'colors-cli/toxic';
import conf from './conf/webpack.config.prod';

const loading = load('Compiler is running...'.green).start();
loading.color = 'green';

const compiler = webpack(conf);
compiler.run((err, stats) => {
  loading.stop();
  // 官方输出参数
  // https://webpack.js.org/configuration/stats/
  // https://github.com/webpack/webpack/issues/538#issuecomment-59586196
  /* eslint-disable */
  console.log(stats.toString({
    colors: true,
    children: false,
    chunks: false,
    modules: false,
  }));
  /* eslint-enable */
});
