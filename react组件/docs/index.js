import React from 'react';
import ReactDOM from 'react-dom'
// import { render } from 'react-dom';
import { hot } from 'react-hot-loader'
import { AppContainer } from 'react-hot-loader';

/* eslint import/no-webpack-loader-syntax: off */
// 这个地方很重要，主要是公共的模块提出一个js来进行引用
// 但是因为懒加载的原因，被打包到多个需要懒加载的文件中去了
// 这里将他们做一个标记，便于公共依赖提出来，减小打包体积
import marked from 'marked';
import prism from 'prismjs';
import transform from 'babel-standalone';
import Markdown from './libs/markdown/index.js';
import Canvas from './libs/markdown/canvas.js';
/* eslint import/no-webpack-loader-syntax: off */

import Router from './Router';

import './style/base.less';
import '../src/index.less';

// render(<Router />, document.getElementById('app'));
// render(hot(module)(Router), document.getElementById('app'));
ReactDOM.render(<AppContainer><Router /></AppContainer>, document.getElementById('app'));
