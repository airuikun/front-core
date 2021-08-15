import React from 'react';
import { Component, PropTypes } from '../utils/';
import './style/index.less';

export default class Loading extends Component {
  render() {
    const { prefixCls, className, size, children, tip, loading, ...resetProps } = this.props;
    const iconContent = (<div className={`${prefixCls}-icon`} />);
    const loadingElm = (<div className={`${prefixCls}-tips-nested`}>{iconContent}{tip}</div>);
    const cls = this.classNames(prefixCls, {
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-large`]: size === 'large',
      [className]: className,
    });


    return (
      <div className={cls} {...resetProps}>
        {loading &&
          <div className={`${prefixCls}-tips`}>
            {loadingElm}
          </div>
        }
        {children && (
          <div
            className={this.classNames(`${prefixCls}-warp`, {
              [`${prefixCls}-blur`]: loading === true,
            })}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
}

Loading.defaultProps = {
  prefixCls: 'w-loading',
  loading: true,
  size: 'default',
};
Loading.propTypes = {
  prefixCls: PropTypes.string,
  tip: PropTypes.string,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large']),
};
