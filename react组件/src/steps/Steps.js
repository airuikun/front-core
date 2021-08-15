import React from 'react';
import { Component, PropTypes, findDOMNode } from '../utils/';
// import { findDOMNode } from 'react-dom';

export default class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastStepOffsetWidth: 0,
    };
  }
  componentDidMount() {
    this.calcStepOffsetWidth();
  }
  componentDidUpdate() {
    this.calcStepOffsetWidth();
  }
  // 计算每一步的宽度
  calcStepOffsetWidth() {
    const domNode = findDOMNode(this);
    const lastStepOffsetWidth = (domNode.lastChild.offsetWidth || 0) + 1;
    if (this.state.lastStepOffsetWidth === lastStepOffsetWidth ||
      Math.abs(this.state.lastStepOffsetWidth - lastStepOffsetWidth) <= 3) {
      return;
    }
    this.setState({ lastStepOffsetWidth });
  }
  render() {
    const { prefixCls, style = {}, icon, className, children, current, status, progressDot, direction, ...resetProps } = this.props;
    const { lastStepOffsetWidth } = this.state;
    const filteredChildren = React.Children.toArray(children).filter(c => !!c);
    const lastIndex = filteredChildren.length - 1;// 最后一个节点的索引数字
    const classString = this.classNames(prefixCls, `${prefixCls}-${direction}`, {
      [`${prefixCls}-dot`]: !!progressDot,
    });
    return (
      <div className={classString} style={style} {...resetProps}>
        {React.Children.map(children, (child, index) => {
          const childProps = {
            stepNumber: `${index + 1}`,
            prefixCls,
            progressDot,
            ...child.props,
          };
          if (index !== lastIndex && direction !== 'vertical') {
            childProps.itemWidth = `${100 / lastIndex}%`;
            childProps.adjustMarginRight = -Math.round((lastStepOffsetWidth / lastIndex) + 1);
          }

          if (progressDot && direction !== 'vertical') {
            childProps.itemWidth = `${100 / filteredChildren.length}%`;
            childProps.adjustMarginRight = 0;
          }
          // 错误前面
          if (status === 'error' && index === current - 1) {
            childProps.className = `${prefixCls}-next-error`;
          }
          if (!child.props.status) {
            if (index === current) {
              childProps.status = status;
            } else if (index < current) {
              childProps.status = 'finish';
            } else {
              childProps.status = 'wait';
            }
          }
          return React.cloneElement(child, childProps);
        })}
      </div>
    );
  }
}

Steps.propTypes = {
  prefixCls: PropTypes.string,
  status: PropTypes.oneOf(['wait', 'process', 'finish', 'error']),
  progressDot: PropTypes.bool,
  current: PropTypes.number,
};
Steps.defaultProps = {
  prefixCls: 'w-steps',
  status: 'process',
  progressDot: false,
  direction: 'horizontal',
  current: 0,
};
