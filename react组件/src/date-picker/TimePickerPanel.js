import React from 'react';
import { Component, PropTypes } from '../utils/';
import Popper from '../popper/';
import TimePickerSpinner from './TimePickerSpinner';
import Transition from '../transition';

// 单个时间选择弹出层
export default class TimePickerPanel extends Component {
  render() {
    const { prefixCls, className, visible, handleClickOutside, inputWidth, ...other } = this.props;
    return (
      <Transition in={visible} sequence="fadeIn" >
        <Popper
          className={this.classNames(`${prefixCls}-popper`)}
          clickOutside={handleClickOutside}
        >
          <div className={this.classNames(className, `${prefixCls}`)}>
            <TimePickerSpinner {...other} />
          </div>
        </Popper>
      </Transition>
    );
  }
}

TimePickerPanel.propTypes = {
  prefixCls: PropTypes.string,
  visible: PropTypes.bool,
  format: PropTypes.string,
  disabledHours: PropTypes.arrayOf(PropTypes.string),
  disabledMinutes: PropTypes.arrayOf(PropTypes.string),
  disabledSeconds: PropTypes.arrayOf(PropTypes.string),
};

TimePickerPanel.defaultProps = {
  prefixCls: 'w-timepicker-panel',
  visible: false,
  format: 'HH:mm:ss',
  disabledHours: [],
  disabledMinutes: [],
  disabledSeconds: [],
};
