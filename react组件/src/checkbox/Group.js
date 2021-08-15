import React from 'react';
import { Component, PropTypes } from '../utils/';
import Checkbox from './';


export default class Group extends Component {
  render() {
    const { prefixCls, className, onChange, options, checkedValues, disabled, ...otherProps } = this.props;
    return (
      <div className={this.classNames(prefixCls, className)} {...otherProps}>
        {Array.from(options, (item, i) => {
          const value = item.value ? item.value : item;
          const label = item.label ? item.label : value;
          let props = {};
          if (typeof item === 'object') {
            props = { ...item };
          }
          this.checkedValues = checkedValues;
          return (
            <Checkbox
              key={i}
              onChange={(e, checked) => {
                if (checked) {
                  if (this.checkedValues.indexOf(value) === -1) this.checkedValues.push(value);
                } else if (this.checkedValues.indexOf(value) > -1) {
                  this.checkedValues = this.checkedValues.filter(_item => _item !== value);
                }
                onChange(e, this.checkedValues, value, checked, item);
              }}
              disabled={item.disabled === false ? false : disabled}
              checked={checkedValues.indexOf(value) > -1}
              {...props}
            >
              {label}
            </Checkbox>
          );
        })}
      </div >
    );
  }
}

Group.defaultProps = {
  prefixCls: 'w-checkbox-group',
  options: [],
  disabled: false,
  checkedValues: [],
  onChange() { },
};
Group.propTypes = {
  prefixCls: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  checkedValues: PropTypes.array,
  onChange: PropTypes.func,
};
