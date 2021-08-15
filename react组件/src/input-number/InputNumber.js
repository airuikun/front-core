import React from 'react';
import { Component, PropTypes } from '../utils/';
import { accAdd, accSub } from '../utils/number';
import Input from '../input/';
import Icon from '../icon/';

export default class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(props) {
    if (props.value !== this.props.value) {
      this.setState({ value: props.value });
    }
  }
  handleInput(e) {
    let { max, min } = this.props;
    const { onChange } = this.props;
    if (!e) return;
    let val = Number((e.target.value) || 0);
    max = Number(max);
    min = Number(min);
    if (val > max) {
      val = max;
    }
    if (val < min) {
      val = min;
    }
    this.setState({ value: val }, () => {
      onChange(e, val);
    });
  }
  handleClick(type, e) {
    let { value } = this.state;
    const { max, min, step, onChange } = this.props;
    this.input.focus();
    value = value ? Number(value) : 0;
    if (type === 'up') {
      value = accAdd(value, step);
      if (value > Number(max)) return;
    }
    if (type === 'down') {
      value = accSub(value, step);
      if (value < Number(min)) return;
    }

    this.setState({ value }, () => {
      onChange(e, value);
    });
  }
  renderSelectable() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-control`}>
        <div className={this.classNames(`${prefixCls}-push`)} onClick={this.handleClick.bind(this, 'up')}><Icon type="arrow-up" /></div>
        <div className={this.classNames(`${prefixCls}-minus`)} onClick={this.handleClick.bind(this, 'down')}><Icon type="arrow-down" /></div>
      </div>
    );
  }
  render() {
    const { prefixCls, defaultValue, onChange, min, max, ...other } = this.props;

    return (
      <div className={`${prefixCls}`}>
        <Input
          {...other}
          ref={(component) => { this.input = component; }}
          type="number"
          icon={this.renderSelectable.bind(this)()}
          value={this.state.value}
          onChange={this.handleInput.bind(this)}
        />
      </div>
    );
  }
}

InputNumber.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InputNumber.defaultProps = {
  prefixCls: 'w-input-number',
  onChange: v => v,
  step: 1,
  value: 0,
};
