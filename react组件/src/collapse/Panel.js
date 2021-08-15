import React from 'react';
import { Component, PropTypes } from '../utils/';
import Transition from '../transition';
import Icon from '../icon';

export default class Panel extends Component {
  render() {
    const { prefixCls, className, icon, children, isActive, onItemClick, disabled, showArrow, header, childProps, ...resetProps } = this.props;
    const cls = this.classNames([`${prefixCls}-item`], className, {
      [`${prefixCls}-active`]: isActive,
      [`${prefixCls}-disabled`]: disabled,
    });
    const iconRender = typeof (icon) === 'string' ? <Icon type={icon} /> : icon;
    return (
      <div className={cls} {...resetProps}>
        <div
          className={[`${prefixCls}-header`]}
          onClick={onItemClick.bind(this)}
        >
          {showArrow && iconRender}
          {header}
        </div>
        <Transition in={isActive} className={this.classNames([`${prefixCls}-conten`])} unmountOnExit={false} sequence="height">
          <div>
            {children}
          </div>
        </Transition>
      </div>
    );
  }
}

Panel.propTypes = {
  prefixCls: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  disabled: PropTypes.bool,
  onItemClick: PropTypes.func,
  showArrow: PropTypes.bool,
  isActive: PropTypes.bool,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
};

Panel.defaultProps = {
  disabled: false,
  icon: 'arrow-down',
};
