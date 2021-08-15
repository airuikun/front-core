import React from 'react';
import { PropTypes } from '../utils/';
import MixinComponent from './MixinComponent';
import Tooltip from '../tooltip';

export default class MenuItem extends MixinComponent {
  active() {
    return this.props.index === this.menu().state.defaultActive;
  }
  handleClick() {
    if (!this.props.disabled) {
      this.menu().handleSelect(this.props.index, this);
    }
  }
  // 第一层菜单 收缩时显示 tooltip 提示
  isShowTooltip() {
    const child = this.menu().props.children;
    let showTooltip = false;
    if (child && child.length > 0) {
      child.forEach((item) => {
        if (item.props.index === this.props.index) showTooltip = true;
      });
    }
    return showTooltip;
  }
  render() {
    const { prefixCls, className, style, resetProps } = this.props;
    const inlineCollapsed = this.menu().props.inlineCollapsed;
    return (
      <li
        style={style}
        className={this.classNames(className, `${prefixCls}`, {
          active: this.active(),
          disabled: this.props.disabled,
        })}
        onClick={this.handleClick.bind(this)}
        {...resetProps}
      >
        {inlineCollapsed && this.isShowTooltip() ? (
          <Tooltip placement="right" content={this.props.children}>
            {this.props.children}
          </Tooltip>
        ) : this.props.children}
      </li>
    );
  }
}

MenuItem.propTypes = {
  prefixCls: PropTypes.string,
  index: PropTypes.string.isRequired,
};

MenuItem.defaultProps = {
  prefixCls: 'w-menu-item',
};
