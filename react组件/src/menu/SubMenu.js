import React from 'react';
import { PropTypes } from '../utils/';
import MixinComponent from './MixinComponent';
import Icon from '../icon';

/**
 * getMenuKeyList 获取菜单选中的，一条线的所有key
 * @param {String} key 当前选中的 key
 * @param {Array} menus 菜单
 */
function getMenuKeyList(key, menus) {
  let menuArray = [];
  if (toString.apply(menus) === '[object Object]') {
    menuArray.push(menus);
  } else {
    menuArray = menus;
  }

  let isAtive = false;
  menuArray.forEach((item) => {
    if (
      (item.props && item.props.index === key) ||
      (toString.apply(item.props.children) === '[object Array]' && getMenuKeyList(key, item.props.children)) ||
      (toString.apply(item.props.children) === '[object Object]' && item.props.children.props.index === key)
    ) {
      isAtive = true;
    }
  });
  return isAtive;
}

export default class SubMenu extends MixinComponent {
  constructor(props) {
    super(props);
    this.instanceType = 'SubMenu';
    this.state = {
      active: false,
      mode: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  componentDidMount() {
    // 记录 组件对象
    // this.menu().state.submenus[this.props.index] = this;
    this.initEvents();
    this.setState({
      mode: this.menu().props.mode,
    });
  }
  componentWillReceiveProps() {
    if (this.state.mode !== this.menu().props.mode) {
      this.unMountEvents();
      this.menu().closeMenu(this.props.index);
      this.setState({
        mode: this.menu().props.mode,
      });
    }
  }
  unMountEvents() {
    this.submenu.removeEventListener('click', this.handleClick);
    this.submenuwarpper.removeEventListener('mouseenter', this.handleClick);
    this.submenuwarpper.removeEventListener('mouseleave', this.handleMouseLeave);
    this.initEvents();
  }
  initEvents() {
    // 切换 mode 弹出的浮层隐藏
    // horizontal(水平) 和 vertical(垂直) 和 inline
    if (this.menu().props.mode === 'vertical') {
      this.submenu.addEventListener('click', this.handleClick);
    } else if (this.menu().props.mode === 'inline') {
      this.submenuwarpper.addEventListener('mouseenter', this.handleClick);
      this.submenuwarpper.addEventListener('mouseleave', this.handleMouseLeave);
    }
  }
  isModeLineHideMenu() {
    const mode = this.menu().props.mode;
    if (mode === 'inline' && this.menu().modeinlineTimer) return true;
    return false;
  }
  handleMouseLeave() {
    if (this.isModeLineHideMenu()) return;
    this.menu().handleSubmenuClick(this.props.index, 'enter');
  }
  handleClick() {
    if (this.isModeLineHideMenu()) return;
    this.menu().handleSubmenuClick(this.props.index);
    const mode = this.menu().props.mode;
    const parent = this.submenulist.parentNode;
    if (parent && mode === 'inline') {
      this.submenulist.style.left = `${parent.clientWidth}px`;
      this.submenulist.style.top = 0;
    }
  }
  isCheckMenuItem(idx) {
    if (!idx) return false;
    return getMenuKeyList(this.menu().state.defaultActive, this.props.children);
  }
  opened() {
    return this.menu().state.openedMenu.indexOf(this.props.index) !== -1;
  }
  render() {
    const { prefixCls, index, className, title, ...resetProps } = this.props;
    const isSelected = this.isCheckMenuItem(index);
    return (
      <li
        ref={(elm) => { this.submenuwarpper = elm; }}
        className={this.classNames(className, `${prefixCls}`, {
          opened: this.opened(),
          [`${prefixCls}-selected`]: isSelected,
        })}
        {...resetProps}
      >
        <div ref={(elm) => { this.submenu = elm; }} className={`${prefixCls}-title`}>
          <span>{this.props.title}</span>
          <Icon
            className={this.classNames(`${prefixCls}-arrow`, {
              opened: this.opened(),
            })}
            type="arrow-down"
          />
        </div>
        <ul ref={(elm) => { this.submenulist = elm; }} className={this.classNames(`${prefixCls}-con`, { opened: this.opened() })} >
          {this.props.children}
        </ul>
      </li>
    );
  }
}

SubMenu.propTypes = {
  prefixCls: PropTypes.string,
};

SubMenu.defaultProps = {
  prefixCls: 'w-sub-menu',
};
