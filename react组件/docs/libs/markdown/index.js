import React from 'react';
import ReactDOM from 'react-dom';
import prism from 'prismjs';
import marked from 'marked';
import Canvas from './canvas';

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: ""
    }
    this.components = new Map();
  }
  componentWillMount() {
    this.renderMarkdown(this.getLang(), this.getPageName())
    this.renderDOM();
  }
  componentDidUpdate() {
    this.renderDOM();
  }
  renderDOM() {
    for (const [id, component] of this.components) {
      this.div = document.getElementById(id);
      if (this.div instanceof HTMLElement) {
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.div));
        ReactDOM.render(component, this.div, () => {
          prism.highlightAll();
        });
      }
    }
    prism.highlightAll();
  }
  renderMarkdown(locale, fileName) {
    return import(`../../md/${locale}/${fileName}.md`).then(module => {
      this.setState({
        markdown: module.default || module,
      });
    })
  }
  getLang() {
    return localStorage.getItem('WUI_LANG') || 'cn';
  }
  getPageName() {
    const routes = window.location.hash.match(/(?:\/(.+))?(\/(.+)\?|\/(.+))/);
    return routes ? (routes[3] || routes[4]) : 'quick-start';
  }
  render() {
    const { markdown } = this.state;
    let prefixCls = 'w-docs'
    if (typeof markdown === 'string') {
      this.components.clear();
      const html = marked(markdown.replace(/<!--\s?DemoStart\s?-->([^]+?)<!--\s?End\s?-->/g, (match, p1, offset) => {
        const id = offset.toString(36);
        this.components.set(id, React.createElement(Canvas, Object.assign({
          name: this.getPageName()
        }, this.props), p1));
        return `<div id=${id}></div>`;
      }));

      return (
        <div>
          <div className={`${prefixCls}-content-warpper`} dangerouslySetInnerHTML={{ __html: html }} />
          <div className={`${prefixCls}-docinfo`}>
            犯了错误还是想对文件做出贡献？ <a href={`https://github.com/uiw-react/uiw/blob/master/docs/md/${this.getLang() + '/' + this.getPageName()}.md`} target="_blank" rel="noopener noreferrer">在Github上编辑本页！</a> <br />
            <a href="https://github.com/uiw-react/uiw/issues" target="_blank" rel="noopener noreferrer">反馈建议</a> | <a target="_blank" rel="noopener noreferrer" href="https://github.com/uiw-react/uiw/issues/new">提交bug</a> | <a target="_blank" rel="noopener noreferrer" href="https://github.com/uiw-react/uiw">Github</a>
          </div>
        </div>
      )
    }
    return (
      <span />
    )
  }
}

