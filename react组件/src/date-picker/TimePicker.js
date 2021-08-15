import React from 'react';
import BasePicker from './BasePicker';
import TimePickerPanel from './TimePickerPanel';

export default class TimePicker extends BasePicker {
  constructor(props) {
    // props, type, state
    // BasePicker 组件中使用
    super(props, 'timepicker', {
      className: 'w-timepicker',
    });
  }
  panelPreps(props) {
    return { ...(props || this.props) };
  }
  pickerPanel(state, props) {
    const value = this.dateToStr(state.value);
    return (
      <TimePickerPanel
        {...this.panelPreps(props) }
        value={value}
        visible={state.visible}
        handleClickOutside={this.handleClickOutside.bind(this)}
        inputWidth={state.inputWidth}
        onPicked={this.onPicked.bind(this)}
      />
    );
  }
}
