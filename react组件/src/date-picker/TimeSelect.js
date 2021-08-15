import React from 'react';
import BasePicker from './BasePicker';
import TimeSelectPanel from './TimeSelectPanel';
import PropTypes from '../utils/PropTypes';

export default class TimeSelect extends BasePicker {
  constructor(props) {
    // props, type, state
    // BasePicker 组件中使用
    super(props, 'timeselect', {
      className: 'w-timeselect',
    });
  }
  panelPreps(props) {
    const minTime = this.dateToStr(this.props.minTime);
    const maxTime = this.dateToStr(this.props.maxTime);
    return { ...(props || this.props), minTime, maxTime };
  }
  pickerPanel(state, props) {
    const value = this.dateToStr(state.value);
    const resetProps = this.panelPreps(props);
    return (
      <TimeSelectPanel
        { ...resetProps }
        value={value}
        visible={state.visible}
        handleClickOutside={this.handleClickOutside.bind(this)}
        inputWidth={state.inputWidth}
        onPicked={this.onPicked.bind(this)}
      />
    );
  }
}

TimeSelect.propTypes = {
  format: PropTypes.string,
};

TimeSelect.defaultProps = {
  format: 'H:i',
};
