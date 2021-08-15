import React from 'react';
import { Component, PropTypes } from '../utils/';
import Transition from '../transition';

export default class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: props.visible,
      content: props.content,
      stylesPopup: {},
    };
    this.hideTooltip = this.hideTooltip.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.styles = this.styles.bind(this);
  }
  componentDidMount() {
    this.setState({
      stylesPopup: this.styles(),
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.content !== nextProps.content) {
      this.setState({
        content: nextProps.content,
      }, () => {
        // console
        this.setState({
          stylesPopup: this.styles(),
        });
      });
    }
    if (this.props.visible !== nextProps.visible) {
      const { enterDelay, onVisibleChange } = this.props;
      this.setState({ showTooltip: !this.state.showTooltip });
      // 解决无法获取节点样式
      setTimeout(() => {
        this.setState({
          stylesPopup: this.styles(),
        });
        onVisibleChange(true);
      }, enterDelay || 0);
    }
  }
  showTooltip() {
    const { enterDelay, onVisibleChange } = this.props;
    clearTimeout(this.leaveTime);
    clearTimeout(this.styleTime);
    if (enterDelay) {
      this.leaveTime = setTimeout(() => {
        this.setState({
          showTooltip: true,
          stylesPopup: this.styles(),
        }, () => {
          onVisibleChange(true);
        });
      }, enterDelay);
    } else {
      this.setState({
        showTooltip: true,
        stylesPopup: this.styles(),
      }, () => {
        onVisibleChange(true);
      });
    }
    // 解决无法获取节点样式
    this.styleTime = setTimeout(() => {
      this.setState({
        stylesPopup: this.styles(),
      });
    }, enterDelay || 0);
  }
  hideTooltip(e, isDelay) {
    const { leaveDelay, onVisibleChange } = this.props;
    const { showTooltip } = this.state;
    clearTimeout(this.leaveTime);

    if (isDelay === true) {
      this.setState({
        showTooltip: !showTooltip,
      }, () => {
        this.setState({
          stylesPopup: this.styles(),
        });
      });
      onVisibleChange && onVisibleChange(false);
    } else {
      this.leaveTime = setTimeout(() => {
        this.setState({
          showTooltip: false,
        });
        onVisibleChange && onVisibleChange(false);
      }, leaveDelay || 0);
    }
  }
  // 弹出的位置
  styles() {
    const { placement } = this.props;
    let top = 0;
    let left = 0;

    const popwidth = this.popup.offsetWidth;
    const popheight = this.popup.offsetHeight;

    const refwidth = this.reference.offsetWidth;
    const refheight = this.reference.offsetHeight;

    const diffwidth = popwidth - refwidth;
    const diffheight = popheight - refheight;

    switch (placement) {
      case 'top':
        top = -(refheight > popheight ? refheight : popheight);
        left = diffwidth > 0 ? -(diffwidth / 2) : Math.abs(diffwidth / 2);
        break;
      case 'topLeft':
        top = -(refheight > popheight ? refheight : popheight);
        left = 0;
        break;
      case 'topRight':
        top = -(refheight > popheight ? refheight : popheight);
        left = -(refwidth > popwidth ? refwidth - popwidth : popwidth - refwidth);
        break;
      case 'left':
        top = diffheight > 0 ? -(diffheight / 2) : Math.abs(diffheight / 2);
        left = -popwidth;
        break;
      case 'leftTop':
        top = 0;
        left = -popwidth;
        break;
      case 'leftBottom':
        top = (refheight > popheight ? (refheight - popheight) : -(popheight - refheight));
        left = -popwidth;
        break;
      case 'right':
        top = diffheight > 0 ? -(diffheight / 2) : Math.abs(diffheight / 2);
        left = refwidth;
        break;
      case 'rightTop':
        top = 0;
        left = refwidth;
        break;
      case 'rightBottom':
        top = (refheight > popheight ? (refheight - popheight) : -(popheight - refheight));
        left = refwidth;
        break;
      case 'bottom':
        top = refheight;
        left = diffwidth > 0 ? -(diffwidth / 2) : Math.abs(diffwidth / 2);
        break;
      case 'bottomLeft':
        top = refheight;
        left = 0;
        break;
      case 'bottomRight':
        top = refheight;
        left = -(refwidth > popwidth ? refwidth - popwidth : popwidth - refwidth);
        break;
      default: break;
    }
    const sty = {};
    if (top || top === 0) sty.top = `${top}px`;
    if (left) sty.left = `${left}px`;
    return sty;
  }

  render() {
    const { prefixCls, className, disabled, children, visibleArrow, placement,
      trigger, style, effect, leaveDelay } = this.props;
    const { stylesPopup, content, showTooltip } = this.state;
    const cls = this.classNames(prefixCls, className, {
      [`${prefixCls}-placement-${placement}`]: placement,
      [`${prefixCls}-${effect}`]: effect,
    });

    const props = {};
    if (trigger === 'hover') {
      props.onMouseEnter = this.showTooltip;
      props.onMouseLeave = this.hideTooltip;
    } else {
      props.onClick = () => {
        if (leaveDelay) {
          this.setState({
            showTooltip: true,
          }, () => {
            this.setState({
              stylesPopup: this.styles(),
            });
          });
        }
        clearTimeout(this.clickLeaveTimeout);
        this.clickLeaveTimeout = setTimeout(f => this.hideTooltip(f, true), leaveDelay || 0);
      };
    }

    return (
      <div className={cls} style={style || {}} {...props}>
        <div ref={(node) => { this.reference = node; }} className={`${prefixCls}-children`}> {children} </div>
        <div ref={(node) => { this.popup = node; }} style={stylesPopup} className={`${prefixCls}-popup`}>
          <Transition in={showTooltip} sequence="fadeIn">
            <div>
              {!disabled &&
                <div className={`${prefixCls}-content`}>
                  {visibleArrow && <div className={`${prefixCls}-arrow`} />}
                  <div className={`${prefixCls}-inner`}>{content}</div>
                </div>
              }
            </div>
          </Transition>
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = {
  prefixCls: PropTypes.string,
  // 显示的内容，也可以通过 slot#content 传入 DOM
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  // Tooltip 的出现位置
  placement: PropTypes.oneOf([
    'top', 'topLeft', 'topRight',
    'left', 'leftTop', 'leftBottom',
    'right', 'rightTop', 'rightBottom',
    'bottom', 'bottomLeft', 'bottomRight',
  ]),
  // 默认提供的主题: dark, light
  effect: PropTypes.oneOf(['dark', 'light']),
  // 触发行为
  trigger: PropTypes.oneOf(['hover', 'focus', 'click']),
  // 状态是否可用
  disabled: PropTypes.bool,
  // 手动控制状态的展示
  visible: PropTypes.bool,
  // 是否显示 Tooltips 箭头
  visibleArrow: PropTypes.bool,
  // 鼠标离开或者点击之后延时多少才隐藏 Tooltips，单位：秒
  leaveDelay: PropTypes.number,
  // 显示隐藏的回调
  onVisibleChange: PropTypes.func,
  style: PropTypes.object,
};

Tooltip.defaultProps = {
  prefixCls: 'w-tooltip',
  effect: 'dark',
  placement: 'top',
  disabled: false,
  visible: false,
  visibleArrow: true,
  trigger: 'hover',
  onVisibleChange: e => (e),
};
