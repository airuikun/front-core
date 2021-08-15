import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
      indeterminate: props.indeterminate,
      value: props.children,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.indeterminate !== nextProps.indeterminate) {
      this.setState({ indeterminate: nextProps.indeterminate, checked: false });
    }
    if (this.props.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }
  handleChange(e) {
    const { onChange, children } = this.props;
    const checked = !this.state.checked;
    this.setState({
      checked,
      indeterminate: false,
      value: children,
    });
    onChange(e, checked);
  }
  render() {
    const { prefixCls, className, children, disabled, onChange, ...resetProps } = this.props;
    const { checked, indeterminate } = this.state;
    const cls = this.classNames(prefixCls, {
      disabled, // 禁用状态
      indeterminate, // 半选中
      checked, // 选中
    });
    delete resetProps.indeterminate;
    return (
      <label className={this.classNames(`${prefixCls}-warpper`, className)} {...resetProps}>
        <span className={cls}>
          <input type="checkbox" disabled={disabled} checked={checked} value={children} onChange={this.handleChange.bind(this)} />
        </span>
        {children && <span>{children}</span>}
      </label>
    );
  }
}

Checkbox.defaultProps = {
  prefixCls: 'w-checkbox',
  checked: false,
  indeterminate: false,
  onChange() { },
};
Checkbox.propTypes = {
  prefixCls: PropTypes.string,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
