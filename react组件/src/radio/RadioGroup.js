import React from 'react';
import { Component, PropTypes } from '../utils/';
import Radio from './Radio';

export default class RadioGroup extends Component {
  getChildContext() {
    return {
      component: this,
    };
  }
  onChange(e, value) {
    if (this.props.onChange) {
      this.props.onChange(e, value);
    }
  }
  getValue(option) {
    if (typeof option === 'string') {
      return option;
    }
    return option.value;
  }
  render() {
    const { prefixCls, options } = this.props;

    let children = this.props.children;

    if (options && options.length > 0) {
      children = options.map((option, idx) => {
        return (
          <Radio
            key={idx}
            disabled={option && option.disabled}
            value={this.getValue(option)}
            onChange={this.onRadioChange}
            checked={this.props.value === this.getValue(option)}
          >
            {option && option.label}
          </Radio>
        );
      });
    }

    return (
      <div className={this.classNames(`${prefixCls}`)}>
        {
          React.Children.map(children, (element) => {
            return React.cloneElement(element, Object.assign({}, element.props, {
              onChange: this.onChange.bind(this),
              checked: element.props.value === this.props.value,
              value: element.props.value,
            }));
          })
        }
      </div>
    );
  }
}


RadioGroup.childContextTypes = {
  component: PropTypes.any,
};

RadioGroup.propTypes = {
  prefixCls: PropTypes.string,
};

RadioGroup.defaultProps = {
  prefixCls: 'w-radio-group',
};
