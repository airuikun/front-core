import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Breadcrumb extends Component {
  getChildContext() {
    return {
      separator: this.props.separator,
    };
  }

  render() {
    const { prefixCls, className, separator, ...other } = this.props;
    return (
      <div {...other} className={this.classNames(prefixCls, className)}>
        {this.props.children}
      </div>
    );
  }
}

Breadcrumb.childContextTypes = {
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Breadcrumb.propTypes = {
  prefixCls: PropTypes.string,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Breadcrumb.defaultProps = {
  prefixCls: 'w-breadcrumb',
  separator: '/',
};
