import React from 'react';
import { Component, ReactDOM } from '../utils/';
import Modals from './Modal';
import ActionButton from './ActionButton';

class ContainerModel extends Component {
  constructor(props) {
    super(props);
    this.closeModals = this.closeModals.bind(this);
    this.state = {
      visible: true,
    };
  }
  closeModals() {
    this.modal.onCancel();
  }
  onExited() {
    this.props.removeChild();
  }
  render() {
    const { icon, title, content, onOk, className, onCancel, cancelText, okText,
      maskClosable = false,
      width = 416,
      type = 'success',
      prefixCls = 'w-modal-confirm', ...others
    } = this.props;

    const footer = [];
    if (cancelText) {
      footer.push(
        <ActionButton key="cancel" size="small" closeModals={this.closeModals} onOk={onCancel} autoFocus>
          {cancelText}
        </ActionButton>
      );
    }
    if (okText) {
      footer.push(
        <ActionButton key="ok" type={type} size="small" closeModals={this.closeModals} onOk={onOk} autoFocus>
          {okText}
        </ActionButton>
      );
    }
    return (
      <Modals
        ref={(component) => { this.modal = component; }}
        {...others}
        className={this.classNames(prefixCls, className, {
          [`${type}`]: type,
        })}
        onExited={this.onExited.bind(this)}
        visible={this.state.visible}
        maskClosable={maskClosable}
        onOk={onOk} // 点击确定提交按钮
        width={width} // 有默认值可以不传递
        onCancel={this.closeModals}
        footer={footer}
      >
        <div className={`${prefixCls}-icon`}>{icon}</div>
        <div className={`${prefixCls}-title`}>
          {title}
        </div>
        <div className={`${prefixCls}-content`}>
          {content}
        </div>
      </Modals>
    );
  }
}

export default function Container(config) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  function removeChild() {
    // 从 DOM 中移除已经挂载的 React 组件，清除相应的事件处理器和 state。
    // 如果在 container 内没有组件挂载，这个函数将什么都不做。
    // 如果组件成功移除，则返回 true；如果没有组件被移除，则返回 false。
    const unmountResult = ReactDOM.findDOMNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }
  ReactDOM.render(
    <ContainerModel removeChild={removeChild.bind(this, div)} {...config} />, div
  );
}
