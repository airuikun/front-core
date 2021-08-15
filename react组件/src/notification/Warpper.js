import React from 'react';
import { Component, PropTypes } from '../utils/';
import Notification from './Notification';

const notify = {};
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placement: '',
      visible: true,
    };
    this.addNotify = this.addNotify.bind(this);
  }
  addNotify(porps) {
    if (!notify[porps.placement]) {
      notify[porps.placement] = {};
    }
    notify[porps.placement][porps._key] = porps;
    this.setState({ visible: true, placement: porps.placement });
  }
  /**
   * 删除 Notify
   * @param {*} _props
   */
  delNotify(_props) {
    const { placement, _key } = _props;
    const _notify = {};
    for (const i in notify[placement]) {
      if (i !== _key) _notify[_key] = notify[placement][_key];
    }
    notify[placement] = _notify;
  }
  render() {
    const { prefixCls } = this.props;
    const { placement, visible } = this.state;
    if (!visible) return null;
    return (
      <div className={this.classNames(prefixCls, placement)}>
        {placement && Object.keys(notify[placement]).map((key) => {
          return <Notification delNotify={this.delNotify.bind(this)} key={key} {...notify[placement][key]} />;
        })}
      </div>
    );
  }
}

Container.propTypes = {
  placement: PropTypes.oneOf(['top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
};
Container.defaultProps = {
  placement: 'top', // 位置
  prefixCls: 'w-notification-warpper',
};

