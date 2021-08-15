import webpack from 'webpack';
import path from 'path';
import loaderUtils from 'loader-utils';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsWebpackPlugin from '@nuxtjs/friendly-errors-webpack-plugin';
import paths from './path';
import pkg from '../../package.json';

export default {
  mode: 'development',
  entry: [
    require.resolve('react-hot-loader/patch'),
    require.resolve('webpack-hot-dev-clients/webpackHotDevClient'),
    paths.appIndexJs,
    // vendors: Object.keys(pkg.dependencies || {}),
  ],
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
  },
  resolve: {
    // https://webpack.js.org/configuration/resolve/#resolve-alias
    alias: { },
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            // 首先运行linter。
            // 在Babel处理js之前做这一点很重要。
            options: {
              // formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              configFile: require.resolve('../../.eslintrc.js'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        oneOf: [
          {
            test: /\.(css|less)$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                  plugins: () => [
                    postcssFlexbugsFixes,
                    // require('postcss-flexbugs-fixes'), // eslint-disable-line
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              require.resolve('resolve-url-loader'),
              require.resolve('less-loader'),
            ],
          },
          {
            // test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            test: /\.(png|jpg)(\?.+)?$/,
            use: [
              {
                loader: require.resolve('file-loader'),
              },
            ],
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: [
              paths.appDocs,
              paths.appSrc,
            ],
            // include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {

              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              plugins: ['react-hot-loader/babel'],
            },
          },
          {
            test: /\.md$/,
            loader: 'raw-loader'
          },
          // “file-loader”确保这些资源由WebpackDevServer服务。
          // 当您导入资源时，您将获得（虚拟）文件名。
          // 在生产中，它们将被复制到`build`文件夹。
          // 此加载程序不使用“test”，因此它将捕获所有模块
          {
            // 排除`js`文件以保持“css”加载器工作，因为它注入它的运行时，否则将通过“文件”加载器处理。
            // 还可以排除“html”和“json”扩展名，以便它们被webpacks内部加载器处理。
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            use: [
              {
                loader: require.resolve('file-loader'),
                options: {
                  name: 'static/fonts/[name].[hash:8].[ext]',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: paths.appFavicon,
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ],
};
