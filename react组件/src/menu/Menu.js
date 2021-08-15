import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    // 用户判断组件
    this.instanceType = 'Menu';
    this.state = {
      defaultActive: props.defaultActive,
      // 打开子菜单
      openedMenu: props.defaultOpened ? props.defaultOpened.slice(0) : [],
      // 子菜单
      submenus: {},
    };
  }
  getChildContext() {
    return { component: this };
  }
  componentWillReceiveProps(props) {
    if (props.defaultActive !== this.props.defaultActive) {
      this.setState({
        defaultActive: props.defaultActive,
      });
    }
    if (props.defaultOpened !== this.props.defaultOpened) {
      this.setState({ openedMenu: props.defaultOpened });
    }
  }
  // 菜单选择事件
  handleSelect(index, menuItem) {
    let { defaultActive } = this.state;
    defaultActive = index;
    if (this.props.onSelect) {
      this.props.onSelect(index, menuItem, this);
    }
    this.setState({ defaultActive }, () => {
      if (this.props.mode === 'inline') {
        // 处理菜单 mouseenter 引发的抖动问题
        this.modeinlineTimer = true;
        this.setState({ openedMenu: [] });
        this.timer = setTimeout(() => {
          this.modeinlineTimer = false;
          clearTimeout(this.timer);
        }, 0);
      }
    });
  }
  // 打开子菜单
  openMenu(index) {
    const { openedMenu } = this.state;
    if (openedMenu.indexOf(index) !== -1) return;
    openedMenu.push(index);
    this.setState({ openedMenu });
  }
  // 关闭子菜单
  closeMenu(index) {
    const { openedMenu } = this.state;
    openedMenu.splice(openedMenu.indexOf(index), 1);
    this.setState({ openedMenu });
  }
  // 点击子菜单的标题事件
  handleSubmenuClick(index, type) {
    const isOpened = this.state.openedMenu.indexOf(index) !== -1;
    if (type === 'enter' || isOpened) {
      this.closeMenu(index);
      if (this.props.onClose) {
        this.props.onClose(index);
      }
    } else {
      this.openMenu(index);
      if (this.props.onOpen) {
        this.props.onOpen(index);
      }
    }
  }
  render() {
    const { prefixCls, className, style, mode, theme, defaultActive, inlineCollapsed, onSelect, onOpen, defaultOpened, ...resetProps } = this.props;
    return (
      <ul
        style={style}
        className={this.classNames(className, `${prefixCls}`, {
          [`${prefixCls}-${mode}`]: mode,
          [`${prefixCls}-${theme}`]: theme,
          [`${prefixCls}-inline-collapsed`]: inlineCollapsed && mode === 'inline',
        })}
        {...resetProps}
      >
        {this.props.children}
      </ul>
    );
  }
}

Menu.childContextTypes = {
  component: PropTypes.any,
};

Menu.propTypes = {
  prefixCls: PropTypes.string,
  mode: PropTypes.oneOf(['vertical', 'inline', 'horizontal']),
  theme: PropTypes.oneOf(['light', 'dark']),
  defaultActive: PropTypes.string,
  defaultOpened: PropTypes.array,
  inlineCollapsed: PropTypes.bool,
  onSelect: PropTypes.func,
};

Menu.defaultProps = {
  prefixCls: 'w-menu',
  mode: 'vertical',
  defaultOpened: [],
  inlineCollapsed: false,
  theme: 'light',
};
