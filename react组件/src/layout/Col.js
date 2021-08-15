import { createElement } from 'react';
import { Component, PropTypes } from '../utils/';

export default class Col extends Component {
  render() {
    const { prefixCls, className, tag, span, xs, sm, md, lg, ...others } = this.props;
    const classList = [];
    ['span', 'offset', 'pull', 'push', 'order'].forEach((prop) => {
      const num = this.props[prop];
      if (num) {
        classList.push(
          prop !== 'span' ? `w-col-${prop}-${num}` : `w-col-${num}`
        );
      }
    });

    ['xs', 'sm', 'md', 'lg'].forEach((size) => {
      if (typeof this.props[size] === 'object') {
        const props = this.props[size];
        Object.keys(props).forEach((prop) => {
          classList.push(
            prop !== 'span'
              ? `w-col-${size}-${prop}-${props[prop]}`
              : `w-col-${size}-${props[prop]}`
          );
        });
      } else if (this.props[size]) {
        classList.push(`w-col-${size}-${Number(this.props[size])}`);
      }
    });

    classList.push(className);

    return createElement(this.props.tag, {
      className: this.classNames('w-col', classList), ...others,
    }, this.props.children);
  }
}


const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const objectOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]);

Col.propTypes = {
  prefixCls: PropTypes.string,
  span: stringOrNumber,
  offset: stringOrNumber,
  pull: stringOrNumber,
  push: stringOrNumber,
  className: PropTypes.string,
  children: PropTypes.node,
  xs: objectOrNumber,
  sm: objectOrNumber,
  md: objectOrNumber,
  lg: objectOrNumber,
  tag: PropTypes.string,
};

Col.defaultProps = {
  prefixCls: 'w-col',
  tag: 'div',
  span: 24,
};
