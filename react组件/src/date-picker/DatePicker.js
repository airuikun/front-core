import React from 'react';
import { PropTypes } from '../utils/';
import BasePicker from './BasePicker';
import DatePanel from './DatePanel';

export default class DatePicker extends BasePicker {
  constructor(props) {
    // props, type, state
    // BasePicker 组件中使用
    super(props, 'datepicker', {
      prefixCls: 'w-datepicker',
      placeholder: '选择日期',
      ...props,
    });
  }
  panelPreps(props) {
    return { ...Object.assign({}, props, this.props) };
  }
  pickerPanel(state) {
    return (
      <DatePanel
        {...this.panelPreps(state) }
        value={state.value}
        visible={state.visible}
        handleClickOutside={this.handleClickOutside.bind(this)}
        onPicked={this.onPicked.bind(this)}
      />
    );
  }
}

DatePicker.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]),
  format: PropTypes.string,
  weekLabel: PropTypes.array,
  shortcutinline: PropTypes.bool,
  shorts: PropTypes.array,
};
DatePicker.defaultProps = {
  value: '',
  placeholder: '选择日期',
  format: 'Y/m/d',
  shortcutinline: true,
};
