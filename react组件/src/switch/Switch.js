import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _checked: props.checked,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({ _checked: nextProps.checked });
    }
  }

  onChange(e) {
    const { onChange } = this.props;
    this.setState({
      _checked: e.target.checked,
    });
    onChange && onChange(e, e.target.checked);
  }
  render() {
    const { prefixCls, className, style, size, disabled, checkedChildren, unCheckedChildren, color, unColor } = this.props;
    const { _checked } = this.state;

    const cls = this.classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-checked`]: _checked,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-color`]: !!((color || unColor)),
    });

    return (
      <label
        style={{
          backgroundColor: _checked ? color : unColor,
          ...style,
        }}
        className={cls}
      >
        <input disabled={disabled} checked={_checked} onChange={this.onChange} type="checkbox" />
        <span>{_checked ? checkedChildren : unCheckedChildren}</span>
      </label>
    );
  }
}

Switch.propTypes = {
  prefixCls: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  unColor: PropTypes.string,
  checkedChildren: PropTypes.string,
  size: PropTypes.oneOf(['mini', 'small', 'default', 'large']),
  unCheckedChildren: PropTypes.string,
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  prefixCls: 'w-switch',
  size: 'default',
  disabled: false,
  checked: false,
};
