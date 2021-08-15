import React from 'react';
import { Component, PropTypes } from '../utils/';
import Alert from '../alert';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.onClose = this.onClose.bind(this);
  }
  onClose() {
    const { delNotify, willUnmount } = this.props;
    this.stopTimer();
    if (!delNotify) return;
    delNotify(this.props);
    this.setState({
      visible: false,
    }, () => {
      willUnmount && willUnmount(this.props);
    });
  }
  componentDidMount() {
    this.startTimer();
  }
  duration() {
    return this.props.duration * 1000;
  }
  stopTimer() { clearTimeout(this.timeout); }
  startTimer() {
    if (this.props.duration) {
      this.timeout = setTimeout(() => {
        this.onClose();
      }, this.duration());
    }
  }
  render() {
    const { prefixCls, type, className, message, description, placement } = this.props;
    let transition = 'fadeIn left';
    if (placement === ('topRight' || 'bottomRight')) {
      transition = 'fadeIn right';
    }
    return (
      <Alert
        onMouseLeave={this.startTimer.bind(this)}
        onMouseEnter={this.stopTimer.bind(this)}
        visible={this.state.visible}
        className={this.classNames(`${prefixCls}`, className)}
        type={type}
        closable
        showIcon={!!type}
        onClose={this.onClose}
        transition={transition}
        message={message}
        description={description}
      />
    );
  }
}

Notification.propTypes = {
  prefixCls: PropTypes.string,
  message: PropTypes.string,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  showIcon: PropTypes.bool,
  placement: PropTypes.oneOf(['topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
  type: PropTypes.oneOf(['success', 'warning', 'warn', 'info', 'error']),
};

Notification.defaultProps = {
  prefixCls: 'w-notification',
  duration: 4.5,
  showIcon: false,
  top: 12,
  placement: 'topRight',
  onClose() { },
};
