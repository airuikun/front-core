import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class MenuItemGroup extends Component {
  constructor(props) {
    super(props);
    this.instanceType = 'SubMenu';
    this.state = {
      active: false,
    };
  }
  render() {
    const { prefixCls, className, title, children, resetProps } = this.props;
    return (
      <li className={this.classNames(`${prefixCls}`, className)} {...resetProps} >
        <div className={`${prefixCls}-title`}>{title}</div>
        <ul>
          {React.Children.map(children, (child) => {
            const childProps = {};
            return React.cloneElement(child, childProps);
          })}
        </ul>
      </li>
    );
  }
}

MenuItemGroup.propTypes = {
  prefixCls: PropTypes.string,
};

MenuItemGroup.defaultProps = {
  prefixCls: 'w-menu-item-group',
};
