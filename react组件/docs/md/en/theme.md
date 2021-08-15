定制主题
===

样式使用了 [`Less`](http://lesscss.org/) 作为开发语言，并定义了一系列全局/组件的样式变量，可以根据需求进行相应调整。使用 [`modifyVars`](http://lesscss.org/usage/#using-less-in-the-browser-modify-variables) 的方式来覆盖变量

> 主题更换只需要 `less-loader` 的 `webpack` 相关配置，配置参数 modifyVars即可。

```js
module.exports = {
    //'primary-color': '#1DA57A',
    //'link-color': '#1DA57A',
    //'border-radius-base': '2px',
    '@font-size-base': '14px',
    '@icon-url': '"/assets/iconfont/iconfont"'
};
```

下面在 `webpack` 配置文件中配置，更改主题颜色

```js
//自定义主题
var theme = require('./theme');
var modifyVars = theme;

....

{
    test: /\.less$/,
    loader: ['style-loader', 'css-loader', `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(modifyVars)}}`]
}
...

```

更多 `webpack` 其他配置项，更改主题颜色，图标字体

```js
{
  test: /\.less$/,
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
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: require.resolve('less-loader'),
      options: {
        modifyVars: {
          '@icon-url': '"~font-file...."',
        },
      },
    },
  ],
},
```
