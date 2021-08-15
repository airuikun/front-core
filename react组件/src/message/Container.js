import React from 'react';
import { Component, PropTypes } from '../utils/';
import Message from './Message';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {},
    };
    this.addMessage = this.addMessage.bind(this);
  }
  addMessage(msg) {
    const { message } = this.state;
    message[msg.id] = msg;
    this.setState({
      message,
      currentId: msg.id,
    });
  }
  delMessage(props) {
    const { message } = this.state;
    const { willUnmount } = this.props;
    if (message[props.id]) {
      delete message[props.id];
      this.setState({ message });
    }
    const keys = Object.keys(message);
    if (keys.length === 0) {
      willUnmount();
    }
  }
  render() {
    const { prefixCls, className } = this.props;
    const { message, currentId } = this.state;
    let cls = this.classNames(prefixCls);
    const placement = message[currentId] && message[currentId].placement;
    if (placement) {
      cls = this.classNames(className, cls, {
        [`${prefixCls}-top`]: placement === 'top', // 默认顶部中间
        [`${prefixCls}-bottom`]: placement === 'bottom', // 底部中间
        [`${prefixCls}-top-left`]: placement === 'topLeft', // 左边上角
        [`${prefixCls}-top-right`]: placement === 'topRight', // 右边上角
        [`${prefixCls}-bottom-left`]: placement === 'bottomLeft', // 左边下角
        [`${prefixCls}-bottom-right`]: placement === 'bottomRight', // 右边下角
      });
    }
    return (
      <div className={cls}>
        {
          Object.keys(message).map((key) => {
            return <Message key={key} {...message[key]} delMessage={this.delMessage.bind(this)} />;
          })
        }
      </div>
    );
  }
}

Container.propTypes = {
  prefixCls: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
};
Container.defaultProps = {
  placement: 'top', // 位置
  prefixCls: 'w-message',
};

