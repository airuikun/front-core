import React from 'react';
import { Component, PropTypes } from '../utils/';
import './style/index.less';
import Icon from '../icon/';

export default class Button extends Component {
  render() {
    const { prefixCls, type, size, icon, active, disabled, block, className, loading, children, htmlType, ...others } = this.props;
    let types = type;
    switch (type) {
      case 'error': types = 'danger'; break;
      default: types = type; break;
    }
    const cls = this.classNames(prefixCls, {
      'w-transition-base': type !== 'link',
      // [`${prefixCls}-default`]: size === 'default',         //（默认尺寸）Default button
      [`${prefixCls}-size-${size}`]: size,
      [`${prefixCls}-${types}`]: types,
      [`${prefixCls}-loading`]: loading, // 加载
      disabled: disabled || loading, // 禁用状态
      active, // 激活状态
      block, // （块级元素）Block level

      [className]: className,
    });
    return (
      <button {...others} disabled={disabled || loading} type={htmlType} className={cls}>
        {icon && <Icon type={icon} />}
        {children && React.Children.map(children, (child) => {
          if (React.isValidElement(child)) return child;
          return (
            <span> {child} </span>
          );
        })}
      </button>
    );
  }
}

Button.defaultProps = {
  disabled: false,
  active: false,
  loading: false,
  block: false,
  htmlType: 'button',
  type: 'default',
  size: 'default',
  prefixCls: 'w-btn',
};
Button.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  htmlType: PropTypes.string,
  active: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'default', 'small', 'mini']),
  type: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warn', 'error', 'danger', 'link']),
};

