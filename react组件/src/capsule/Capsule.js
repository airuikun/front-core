import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Capsule extends Component {
  render() {
    const { prefixCls, className, title, children, type, color, disabled, ...other } = this.props;
    const cls = this.classNames(`${prefixCls}`, className, {
      'w-disabled': disabled,
      [`${prefixCls}-shields`]: type === 'shields',
    });
    let styl = {};
    if (type === 'shields') {
      styl = { backgroundColor: color, borderColor: color };
    } else {
      styl = { borderColor: color, color };
    }
    return (
      <span className={cls} {...other}>
        {title && <span style={{ backgroundColor: color, borderColor: color }} className={`${prefixCls}-title`}>{title}</span>}
        <span style={styl} className={`${prefixCls}-content`}>{children}</span>
      </span>
    );
  }
}

Capsule.propTypes = {
  prefixCls: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['shields', 'default']),
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

Capsule.defaultProps = {
  prefixCls: 'w-capsule',
  disabled: false,
  color: '#1C7CEB',
  type: 'default',
  title: '',
};
