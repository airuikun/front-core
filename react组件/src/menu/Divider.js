import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Divider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { prefixCls, className, children, ...resetProps } = this.props;
    return (
      <li className={this.classNames(className, prefixCls)} {...resetProps}>{children}</li>
    );
  }
}

Divider.propTypes = {
  prefixCls: PropTypes.string,
};

Divider.defaultProps = {
  prefixCls: 'w-menu-item-divider',
};
