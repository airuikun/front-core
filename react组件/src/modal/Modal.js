import React from 'react';
import { Component, PropTypes } from '../utils/';
import Transition from '../transition';
import Button from '../button';
import Icon from '../icon';

const ButtonGroup = Button.Group;

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      isMount: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragging = this.onDragging.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }
  componentWillMount() {
    if (this.props.visible) {
      this.setState({ isMount: true });
    }
  }
  componentWillUnmount() {
    document.body.style.overflow = 'inherit';
    window.removeEventListener('mousemove', this.onDragging);
    window.removeEventListener('mouseup', this.onDragEnd);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      document.body.style.overflow = nextProps.visible ? 'hidden' : 'inherit';
      const props = { visible: nextProps.visible };
      if (nextProps.visible) {
        props.isMount = true;
      }
      this.setState({ ...props });
    }
  }
  onExited(props) {
    const { onCancel, onExited } = this.props;
    this.setState({ isMount: false }, () => {
      // 动画事件不同步，带来的闪烁问题
      const timer = setTimeout(() => {
        if (!this.state.isMount) {
          onExited(props);
        }
        clearTimeout(timer);
      }, 100);
      if (!this.state.isMount) {
        onCancel();
      }
    });
  }
  onCancel = (ismask) => {
    // 禁止遮罩层关闭
    if (ismask === 'mask' && !this.props.maskClosable) return;
    this.setState({ visible: false });
  }
  handleOk = (e) => {
    const { onOk } = this.props;
    onOk && onOk(e);
  }
  onDragging(event) {
    if (this.moveDom && this.moveDom.dom) {
      const currentX = event.clientX;
      const currentY = event.clientY;
      if (this.type === 'drag' && this.props.dragable) {
        this.moveDom.dom.style.left = `${this.pointDomX - (this.startX - currentX)}px`;
        this.moveDom.dom.style.top = `${this.pointDomY - (this.startY - currentY)}px`;
      } else if (this.type === 'size' && this.props.resizeable) {
        const width = currentX - this.startX;
        const height = currentY - this.startY;
        this.moveDom.dom.style.width = `${this.startWidth + width}px`;
        this.bodyDom.style.height = `${this.startHeight + height}px`;
      }
    }
  }
  onDragEnd() {
    this.moveDom.animation = true;
    window.removeEventListener('mousemove', this.onDragging, false);
    window.removeEventListener('mouseup', this.onDragEnd, false);
  }
  onMouseDown(type, event) {
    const { dragable, resizeable } = this.props;
    if (!dragable && !resizeable) return;
    if (!this.moveDom || !this.moveDom.dom || !this.bodyDom) return;
    this.type = type;
    this.moveDom.animation = false;
    this.startX = event.clientX;
    this.startY = event.clientY;

    this.pointDomX = parseInt(this.moveDom.dom.style.left, 10) || 0;
    this.pointDomY = parseInt(this.moveDom.dom.style.top, 10) || 0;

    this.startWidth = this.moveDom.dom.clientWidth;
    this.startHeight = this.bodyDom.clientHeight;

    window.addEventListener('mousemove', this.onDragging, false);
    window.addEventListener('mouseup', this.onDragEnd, false);
    this.setState({ isMove: true });
  }
  render() {
    const { prefixCls, className, title, footer, horizontal, styleMask, children, confirmLoading, dragable, resizeable, onCancel, cancelText, okText, width, onEntered, ...other } = this.props;
    const { visible, isMount } = this.state;
    let defaultFooter = !footer ? (
      <ButtonGroup>
        <Button key="cancel" size="small" onClick={this.onCancel}>
          {cancelText || '取消'}
        </Button>
        <Button key="confirm" size="small" loading={confirmLoading} onClick={this.handleOk}>
          {okText || '确定'}
        </Button>
      </ButtonGroup>
    ) : footer;
    const cls = this.classNames(prefixCls, className, {
      [`${prefixCls}-wrap`]: isMount,
      [`${prefixCls}-horizontal-left`]: horizontal === 'left' && isMount,
      [`${prefixCls}-horizontal-right`]: horizontal === 'right' && isMount,
    });
    let AnimateType = '';
    switch (horizontal) {
      case 'left': AnimateType = 'fadeIn left'; break;
      case 'right': AnimateType = 'fadeIn right'; break;
      default: AnimateType = 'fadeIn down'; break;
    }
    defaultFooter = (footer === null ? null : <div className={`${prefixCls}-footer`}>{defaultFooter}</div>);
    return (
      <div className={cls}>
        <Transition in={visible} sequence="fadeIn">
          <div className={`${prefixCls}-mask`} style={styleMask} onClick={() => this.onCancel('mask')} />
        </Transition>
        <Transition ref={node => this.moveDom = node} onExited={this.onExited.bind(this)} onEntered={onEntered} in={visible} sequence={AnimateType}>
          <div className={`${prefixCls}-content`} style={{ width, ...other.style }}>
            {title && (
              <div
                className={this.classNames(`${prefixCls}-header`, {
                  [`${prefixCls}-dragable`]: dragable,
                })}
                onMouseDown={this.onMouseDown.bind(this, 'drag')}
              >
                <div className={`${prefixCls}-title`}>
                  {title}
                </div>
                <a onClick={() => this.onCancel()} className={`${prefixCls}-close-icon`}><Icon type="close" /></a>
              </div>
            )}
            <div className={`${prefixCls}-body`} ref={node => this.bodyDom = node}>{children}</div>
            {defaultFooter}
            {resizeable && <div className={`${prefixCls}-resizeable`} onMouseDown={this.onMouseDown.bind(this, 'size')} />}
          </div>
        </Transition>
      </div >
    );
  }
}

Modal.defaultProps = {
  prefixCls: 'w-modal',
  width: 520,
  title: '',
  visible: false,
  dragable: false,
  resizeable: false,
  maskClosable: true,
  confirmLoading: false,
  onCancel: v => v,
  onExited: v => v,
  onEntered: v => v,
};
Modal.propTypes = {
  prefixCls: PropTypes.string,
  visible: PropTypes.bool,
  horizontal: PropTypes.oneOf(['left', 'right']),
  dragable: PropTypes.bool,
  maskClosable: PropTypes.bool,
  styleMask: PropTypes.object,
  style: PropTypes.object,
  confirmLoading: PropTypes.bool,
  title: PropTypes.node,
  footer: PropTypes.node,
  onCancel: PropTypes.func,
  onExited: PropTypes.func,
  onEntered: PropTypes.func,
  width: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]),
};
