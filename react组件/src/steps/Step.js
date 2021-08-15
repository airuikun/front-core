import React from 'react';
import { Component, PropTypes } from '../utils/';
import Icon from '../icon';

export default class Step extends Component {
  render() {
    const { prefixCls, className, style, status, itemWidth, icon, adjustMarginRight, stepNumber, title, description, progressDot, ...restProps } = this.props;
    const classString = this.classNames(
      `${prefixCls}-item`,
      `${prefixCls}-item-${status}`,
      className, {
        [`${prefixCls}-custom`]: icon,
      }
    );
    const stepItemStyle = { ...style };
    const stepItemDotStyle = {};
    if (itemWidth) {
      stepItemStyle.width = itemWidth;
    }
    if (adjustMarginRight) {
      stepItemStyle.marginRight = adjustMarginRight;
      if (progressDot) {
        stepItemDotStyle.paddingRight = Math.abs(adjustMarginRight);
      }
    }
    let iconNode = null;
    if (progressDot) {
      iconNode = <span className={`${prefixCls}-dot`} />;
    } else if (icon && typeof icon !== 'string') {
      iconNode = <span className={`${prefixCls}-icon`}>{icon}</span>;
    } else if ((icon && typeof icon === 'string') || status === 'finish' || status === 'error') {
      iconNode = (<Icon type={this.classNames({
        [`${icon}`]: icon && typeof icon === 'string',
        check: !icon && status === 'finish',
        close: !icon && status === 'error',
      })}
      />);
    } else {
      iconNode = <span className={`${prefixCls}-icon`}>{stepNumber}</span>;
    }
    return (
      <div {...restProps} className={classString} style={stepItemStyle}>
        <div className={`${prefixCls}-item-tail`} style={stepItemDotStyle}><i /></div>
        <div className={`${prefixCls}-item-head`}>
          <div className={this.classNames(`${prefixCls}-item-inner`, {
            'is-icon': icon,
          })}
          >
            {iconNode}
          </div>
        </div>
        <div className={`${prefixCls}-item-main`}>
          <div className={`${prefixCls}-item-title`}>
            {title}
          </div>
          {description && <div className={`${prefixCls}-item-description`}>{description}</div>}
        </div>
      </div>
    );
  }
}

Step.propTypes = {
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  style: PropTypes.object,
  status: PropTypes.oneOf(['wait', 'process', 'finish', 'error', 'success']),
  progressDot: PropTypes.bool,
  stepNumber: PropTypes.string,
  icon: PropTypes.node,
  itemWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  adjustMarginRight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};
