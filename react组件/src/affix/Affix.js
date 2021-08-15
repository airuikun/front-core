import React from 'react';
import { Component, PropTypes, ReactDOM, getScrollTop } from '../utils/';

export default class Affix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderStyle: null,
      affixStyle: null,
    };
    this.updatePosition = this.updatePosition.bind(this);
  }
  events = [
    'resize',
    'scroll',
    'touchstart',
    'touchmove',
    'touchend',
    'pageshow',
    'load',
  ]
  eventHandlers = {}
  componentDidMount() {
    this.setTargetEventListeners();
  }
  updatePosition() {
    let { offsetTop } = this.props;
    const { offsetBottom } = this.props;
    const rootElm = ReactDOM.findDOMNode(this);
    const elemSize = {
      width: rootElm.clientWidth,
      height: rootElm.clientHeight,
    };
    const offsetMode = { top: false, bottom: false };
    // 默认钉在顶部还是底部
    if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
      offsetMode.top = true;
      offsetTop = 0;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof offsetBottom === 'number';
    }
    const { clientHeight } = document.body;

    if (rootElm.offsetTop < getScrollTop() && offsetMode.top) {
      // 设置占位高宽
      this.setPlaceholderStyle({ ...elemSize });
      this.setAffixStyle({
        position: 'fixed',
        top: offsetTop || 0,
        left: rootElm.offsetLeft,
        width: rootElm.clientWidth,
      });
    } else if (offsetMode.bottom && (rootElm.offsetTop + rootElm.clientHeight) > (getScrollTop() + clientHeight)) {
      // 设置占位高宽
      this.setPlaceholderStyle({ ...elemSize });
      this.setAffixStyle({
        position: 'fixed',
        bottom: offsetBottom || 0,
        left: rootElm.offsetLeft,
        width: rootElm.clientWidth,
      });
    } else {
      this.setPlaceholderStyle(null);
      this.setAffixStyle(null);
    }
  }
  setAffixStyle(affixStyle) {
    const { onChange } = this.props;
    const affixed = !!this.state.affixStyle;
    this.setState({ affixStyle }, () => {
      onChange(affixed);
    });
  }
  setPlaceholderStyle(placeholderStyle) {
    this.setState({ placeholderStyle });
  }
  // 设置监听事件
  setTargetEventListeners() {
    this.clearEventListeners();
    this.events.forEach((eventName) => {
      this.eventHandlers[eventName] = this.updatePosition;
      window.addEventListener(eventName, this.updatePosition, false);
    });
  }
  clearEventListeners() {
    this.events.forEach((eventName) => {
      const handler = this.eventHandlers[eventName];
      window.removeEventListener(eventName, handler, false);
    });
  }
  render() {
    const { prefixCls, className, children, offsetTop, offsetBottom, ...resetProps } = this.props;
    const cls = this.classNames(className, `${prefixCls}`);
    return (
      <div {...resetProps} style={{ ...this.state.placeholderStyle, ...this.props.style }}>
        <div className={cls} style={this.state.affixStyle}>
          {children}
        </div>
      </div>
    );
  }
}

Affix.propTypes = {
  prefixCls: PropTypes.string,
  offsetTop: PropTypes.number,
  offsetBottom: PropTypes.number,
  onChange: PropTypes.func,
};

Affix.defaultProps = {
  prefixCls: 'w-affix',
  onChange() { },
};
