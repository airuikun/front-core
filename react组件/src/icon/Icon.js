import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Icon extends Component {
  render() {
    const { prefixCls, type, spin, className, ...other } = this.props;
    return <i {...other} className={this.classNames(`${prefixCls}-${type}`, className, { [`${prefixCls}-spin`]: spin })} />;
  }
}

Icon.propTypes = {
  prefixCls: PropTypes.string,
  type: PropTypes.string.isRequired,
  spin: PropTypes.bool,
};

Icon.defaultProps = {
  prefixCls: 'w-icon',
  spin: false,
};
