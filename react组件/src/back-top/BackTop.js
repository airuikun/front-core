import React from 'react';
import { Component, PropTypes } from '../utils/';
import Icon from '../icon';

export default class BackTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  onClick = (e) => {
    this.props.onClick && this.props.onClick(e);
    this.rafId = window.requestAnimationFrame(this.move2Top);
  }

  componentDidMount() {
    !this.props.showAlways && window.addEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (window.pageYOffset > this.props.showBelow) {
      if (!this.state.show) {
        this.setState({ show: true });
      }
    } else if (this.state.show) {
      this.setState({ show: false });
    }
  }

  move2Top = () => {
    if (window.pageYOffset <= 0) {
      return this.cancelScroll();
    }
    window.scrollTo(0, window.pageYOffset - this.props.speed);
    this.rafId = window.requestAnimationFrame(this.move2Top);
  };

  componentWillUnmount() {
    !this.props.showAlways && window.removeEventListener('scroll', this.onScroll);
    this.rafId && window.cancelAnimationFrame(this.rafId);
  }

  cancelScroll = () => {
    this.rafId && window.cancelAnimationFrame(this.rafId);
  }

  render() {
    const { prefixCls, showAlways, showIcon, showBelow, fixed, shape, showText, bordered, radius, style, text, speed, className, icon, onClick, ...others } = this.props;
    const { show } = this.state;
    const children = this.props.children;
    const cls = this.classNames(prefixCls, className, {
      [`${shape}`]: shape,
      [`${prefixCls}-fixed`]: fixed,
      bordered,
      radius,
    });
    let defalutStyle = {};
    if (!showAlways) {
      defalutStyle = {
        opacity: show ? 1 : 0,
        visibility: show ? 1 : 0,
      };
    }
    const styles = style ? Object.assign(style, defalutStyle) : defalutStyle;

    return (
      <div className={cls} style={styles} onClick={this.onClick} {...others} >
        {showIcon ? icon || <Icon type="caret-up" /> : null}
        {showText && <span className={`${prefixCls}-text`}>{text}</span>}
        {children}
      </div>
    );
  }
}

BackTop.propTypes = {
  prefixCls: PropTypes.string,
  shape: PropTypes.oneOf(['rectangle', 'circle']),
  text: PropTypes.string,
  showText: PropTypes.bool,
  radius: PropTypes.bool,
  bordered: PropTypes.bool,
  fixed: PropTypes.bool,
  showAlways: PropTypes.bool,
  showBelow: PropTypes.number,
  showIcon: PropTypes.bool,
  speed: PropTypes.number,
  onClick: PropTypes.func,
};

BackTop.defaultProps = {
  prefixCls: 'w-back-top',
  shape: 'rectangle',
  text: 'TOP',
  showText: true,
  bordered: true,
  fixed: true,
  radius: true,
  showAlways: false,
  showBelow: 100,
  showIcon: true,
  speed: 100,
};
