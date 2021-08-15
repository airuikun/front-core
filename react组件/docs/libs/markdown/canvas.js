import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import marked from 'marked';
import { transform } from 'babel-standalone';

const renderer = new marked.Renderer();
renderer.heading = function (text, level) {
  if (/[\u4E00-\u9FA5]/i.test(text)) {
    return `<h${level} id="${text.toLowerCase()}">${text}</h${level}>`;
  } else {
    var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${level} id="${escapedText}">${text}</h${level}>`;
  }
}
marked.setOptions({
  renderer: renderer,
});

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.playerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`
    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/);
    this.source = this.document[2].match(/```(.*)\n([^]+)```/);
    this.description = marked(this.document[1]);
    this.highlight = marked(this.document[2]);
    this.state = {
      showBlock: false
    };
  }
  componentDidMount() {
    this.renderSource(this.source[2]);
  }
  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock
    });
  }
  renderSource(value) {
    import('../../../src').then(Element => {
      const args = ['context', 'React', 'ReactDOM', 'Component']
      const argv = [this, React, ReactDOM, Component]
      for (const key in Element) {
        args.push(key)
        argv.push(Element[key])
      }
      return { args, argv }
    }).then(({ args, argv }) => {
      const code = transform(`
        ${value}
        ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.playerId}'))
      `, {
          presets: ['es2015', 'react']
        }).code;
      args.push(code)
      new Function(...args).apply(null, argv)
      this.source[2] = value
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    })
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-demo-warpper ${prefixCls}-${this.props.name}`}>
        <div className={`${prefixCls}-demo-source`} ref="source" id={this.playerId}></div>
        <div className={`${prefixCls}-demo-meta`} style={{
          height: this.state.showBlock ? 'inherit' : 0
        }}>
          {
            this.description &&
            <div ref="description" className={`${prefixCls}-demo-des`} dangerouslySetInnerHTML={{ __html: this.description }}></div>
          }
          <div ref="highlight" className={`${prefixCls}-demo-highlight`} dangerouslySetInnerHTML={{ __html: this.highlight }}></div>
        </div>
        {
          this.state.showBlock ? (
            <div className={`${prefixCls}-demo-control`} onClick={this.blockControl.bind(this)}>
              <span>{this.props.locale.hide}</span>
            </div>
          ) : (
            <div className={`${prefixCls}-demo-control`} onClick={this.blockControl.bind(this)}>
              <span>{this.props.locale.show}</span>
            </div>
          )
        }
      </div>
    );
  }
}

Canvas.propTypes = {
  locale: PropTypes.object,
  prefixCls: PropTypes.string,
};

Canvas.defaultProps = {
  locale: {},
  prefixCls: "w-docs"
};
