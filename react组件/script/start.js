import webpack from 'webpack';
import detect from 'detect-port';
import openBrowsers from 'open-browsers';
import WebpackDevServer from 'webpack-dev-server';
import prepareUrls from 'local-ip-url/prepareUrls';
import load from 'loading-cli';
import 'colors-cli/toxic';
import conf from './conf/webpack.config.dev';

let PORT = 2087;
const HOST = '0.0.0.0';

const compiler = webpack(conf);
const loading = load('Compiler is running...'.green).start();
loading.color = 'green';


detect(PORT).then((_port) => {
  if (PORT !== _port) PORT = _port;

  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const urls = prepareUrls({ protocol, host: HOST, port: PORT });
  // https://webpack.js.org/api/compiler-hooks/#aftercompile
  // 编译完成之后打印日志
  compiler.hooks.done.tap('done', () => {
    loading.stop();
    /* eslint-disable */
    console.log(`Dev Server Listening at Local: ${urls.localUrl.green}`);
    console.log(`              On Your Network: ${urls.lanUrl.green}`);
    /* eslint-enable */
  });

  const devServer = new WebpackDevServer(compiler, {
    // contentBase: conf.output.appPublic,
    publicPath: conf.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: true,
  })
  devServer.listen(PORT, HOST, (err) => {
    if (err) {
      return console.log(err); // eslint-disable-line
    }
    // open browser
    openBrowsers(urls.localUrl);

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        devServer.close();
        process.exit();
      });
    });
  });
}).catch((err) => {
  console.log(err); // eslint-disable-line
});
