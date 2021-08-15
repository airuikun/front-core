import React from 'react';
import Transition, { ENTERED, ENTERING, EXITING, EXITED } from 'react-transition-group/Transition';
import { Component, PropTypes } from '../utils/';
import './style/index.less';

/**
 * 老的文档
 * https://facebook.github.io/react/docs/animation.html
 * 新的文档
 * https://reactcommunity.org/react-transition-group/
 * 动画效果
 * https://daneden.github.io/animate.css/
 */
export default class Animate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      in: false,
    };
  }
  componentDidMount() {
    // 提供一个停止动画的对象
    // 例如 Modal 拖拽的时候，先要停止动画，进行拖拽，完事儿之后，关闭 Modal 框需要动画继续
    this.animation = true;
    if (this.props.in === true) {
      this.setState({
        in: true,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.in === undefined) return;
    this.setState({
      in: nextProps.in,
    });
  }
  refsSizeChange(elm, status) {
    const { sequence } = this.props;
    if (!elm || !/(?:^|\s)(width|height)(?!\S)/.test(sequence)) return;
    if (status === EXITED) {
      elm.style.height = 0;
    } else if (status === ENTERED) {
      elm.style.height = `${elm.scrollHeight}px`;
    }
  }
  render() {
    const { prefixCls, sequence, className, wait, children, duration, ...other } = this.props;
    const transitionIn = this.state.in;
    const timeout = {
      enter: wait,
      exit: wait,
    };
    // 样式动画
    const sequenceClassNames = sequence ? sequence.split(' ').map(s => `is-${s}`).join(' ') : null;
    const animationStyles = {
      [ENTERING]: 'is-mounting',
      [ENTERED]: 'is-mounted',
      [EXITING]: 'is-unmounting',
      [EXITED]: 'is-unmounted',
    };
    const childStyle = (child) => {
      return Object.assign({}, child && child.props ? child.props.style : {}, other.style, {
        transitionDuration: `${this.animation ? duration : 0}ms`,
      });
    };
    const childClassName = (child, transitionStatus) => {
      const clss = this.classNames(
        { [`${prefixCls}`]: prefixCls && this.animation },
        className,
        sequenceClassNames,
        transitionStatus && animationStyles[transitionStatus],
        child && child.props && child.props.className
      );
      return clss;
    };
    return (
      <Transition
        {...other}
        style={other.style}
        className={prefixCls}
        in={transitionIn}
        timeout={timeout}
      >
        {status => React.cloneElement(children, {
          className: childClassName(children, status),
          style: childStyle(children, status),
          ref: (elm) => {
            this.dom = elm;
            this.refsSizeChange(elm, status);
          },
        })}
      </Transition>
    );
  }
}

Animate.propTypes = {
  animateOnMount: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  duration: PropTypes.number,
  in: PropTypes.bool,
  sequence: PropTypes.string,
  wait: PropTypes.number,
};
Animate.defaultProps = {
  prefixCls: 'w-animate',
  unmountOnExit: true, // 设置 true 销毁根节点
  animateOnMount: true, // 安装动画
  duration: 200, // 持续时间
  wait: 200, // 等待出现和退出时间
};
