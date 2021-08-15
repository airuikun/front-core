import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Divider extends Component {
  render() {
    const { prefixCls, className, children, dashed, type, ...restProps } = this.props;
    const cls = this.classNames(className, `${prefixCls}`, `${prefixCls}-${type}`, {
      [`${prefixCls}-with-text`]: children,
      [`${prefixCls}-dashed`]: !!dashed,
    });
    return (
      <div className={cls} {...restProps}>
        {children && <span className={`${prefixCls}-inner-text`}>{children}</span>}
      </div>
    );
  }
}

Divider.propTypes = {
  prefixCls: PropTypes.string,
  type: PropTypes.string,
  dashed: PropTypes.bool,
};

Divider.defaultProps = {
  prefixCls: 'w-divider',
  type: 'horizontal',
  dashed: false,
};
