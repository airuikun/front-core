import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
      disabled: props.disabled,
      isButton: false,
    };
  }
  handleChange(e) {
    const checked = e.target.checked;
    const { children } = this.props;
    if (checked) {
      this.props.onChange(e, (this.props.value || children), checked);
      this.setState({ checked });
    }
  }
  // fixed jest test error.
  componentWillReceiveProps(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked });
    }
    if (this.props.disabled !== nextProps.disabled) {
      this.setState({ disabled: nextProps.disabled });
    }
  }
  render() {
    const { prefixCls, className, children, onChange, value, ...other } = this.props;
    const { checked, disabled, isButton } = this.state;
    const cls = this.classNames(`${prefixCls}`, className, {
      disabled, // 禁用状态
      checked, // 选中
      [`${prefixCls}-button`]: isButton,
    });
    const inputProps = {
      ref: (node) => { this.radio = node; },
      type: 'radio',
      value: value || children,
      checked,
      disabled,
      onChange: this.handleChange.bind(this),
    };
    return (
      <label {...other} className={cls}>
        <span className={`${prefixCls}-inner`}>
          <input {...inputProps} />
        </span>
        <span className={`${prefixCls}-text`}>{children || value}</span>
      </label>
    );
  }
}

Radio.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
};

Radio.defaultProps = {
  prefixCls: 'w-radio',
  disabled: false,
  checked: false,
  value: '',
  onChange: v => v,
};
