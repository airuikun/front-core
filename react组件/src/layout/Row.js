import { Children, cloneElement, createElement } from 'react';
import assign from 'object-assign';
import { Component, PropTypes } from '../utils/';

export default class Row extends Component {
  getChildContext() {
    return {
      gutter: this.props.gutter,
    };
  }
  render() {
    const { prefixCls, className, gutter, children, tag, type, justify, align, ...others } = this.props;

    const cols = Children.map(children, (col) => {
      if (!col) return null;

      if (col.props && gutter > 0) {
        return cloneElement(col, {
          style: assign({}, {
            paddingLeft: gutter / 2,
            paddingRight: gutter / 2,
          }, col.props.style),
        });
      }
      return col;
    });

    return createElement(this.props.tag, {
      className: this.classNames(className, {
        [prefixCls]: !type,
        [`${prefixCls}-${type}`]: type,
        // flex 布局下的水平排列方式
        [`${prefixCls}-justify-${justify}`]: type && justify,
        // flex 布局下的垂直对齐方式
        [`${prefixCls}-align-${align}`]: type && align,
      }),
      ...others,
    }, cols);
  }
}


Row.childContextTypes = {
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Row.propTypes = {
  prefixCls: PropTypes.string,
  tag: PropTypes.string,
  children: PropTypes.node,
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(['flex']),
  justify: PropTypes.oneOf([
    'start', 'end', 'center',
    'space-around', 'space-between',
  ]),
  align: PropTypes.oneOf(['top', 'middle', 'bottom', 'baseline']),
};

Row.defaultProps = {
  prefixCls: 'w-row',
  tag: 'div',
};
