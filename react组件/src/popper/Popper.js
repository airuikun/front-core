import React from 'react';
// import ReactDOM from 'react-dom';
import { Component, PropTypes } from '../utils/';

export default class Popper extends Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, true);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, true);
  }
  handleClickOutside(e) {
    const { clickOutside } = this.props;
    clickOutside && clickOutside(e);
  }
  render() {
    const { style, className, prefixCls, tag, clickOutside, children, ...other } = this.props;
    const wrapStyle = Object.assign.apply(null, [style, {}]);
    return (
      <div className={`${prefixCls}-warpper`}>
        {
          React.createElement(tag, { style: wrapStyle, className: this.classNames(prefixCls, className), ...other }, children)
        }
      </div>
    );
  }
}

Popper.propTypes = {
  prefixCls: PropTypes.string,
  tag: PropTypes.string,
  onChange: PropTypes.func,
};

Popper.defaultProps = {
  prefixCls: 'w-popper',
  tag: 'div',
  style: {},
  onChange() { },
};
