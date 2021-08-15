import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Card extends Component {
  render() {
    const { prefixCls, className, title, extra, footer, bordered, noHover, bodyStyle, bodyClassName, children, ...resetProps } = this.props;
    const cls = this.classNames(prefixCls, className, {
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-no-hover`]: noHover,
    });

    return (
      <div {...resetProps} className={cls}>
        {(title || extra) && (
          <div className={`${prefixCls}-head`}>
            {title && <div className={`${prefixCls}-head-title`}>{title}</div>}
            {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
          </div>
        )}
        {children && <div className={this.classNames(`${prefixCls}-body`, bodyClassName)} style={bodyStyle}>{children}</div>}
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
      </div>
    );
  }
}

Card.propTypes = {
  prefixCls: PropTypes.string,
  bordered: PropTypes.bool,
  extra: PropTypes.node,
  footer: PropTypes.node,
  noHover: PropTypes.bool,
  bodyStyle: PropTypes.object,
  bodyClassName: PropTypes.string,
};

Card.defaultProps = {
  prefixCls: 'w-card',
  bordered: true,
  noHover: false,
};
