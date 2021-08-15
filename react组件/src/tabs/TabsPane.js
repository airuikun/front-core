import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class TabsPane extends Component {
  render() {
    const { prefixCls, ...resetProps } = this.props;
    const cls = this.classNames(`${prefixCls}`);
    return (
      <div className={cls} {...resetProps} />
    );
  }
}

TabsPane.propTypes = {
  prefixCls: PropTypes.string,
};

TabsPane.defaultProps = {
  prefixCls: 'w-tabsPane',
};
