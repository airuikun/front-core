import React from 'react';
import { Component, PropTypes } from '../utils/';
import Popper from '../popper/';
import { parseTime } from './utils';
import Transition from '../transition';

// 单个时间选择弹出层
export default class TimeSelectPanel extends Component {
  handleClick(item) {
    const { onPicked } = this.props;
    if (!item.disabled) {
      onPicked(item.value);
    }
  }
  items() {
    return TimeSelectPanel.items(this.props);
  }
  render() {
    const { prefixCls, className, value, inputWidth, visible, handleClickOutside } = this.props;
    return (
      <Transition in={visible} sequence="fadeIn">
        <Popper
          className={this.classNames(`${prefixCls}-popper`)}
          clickOutside={handleClickOutside}
          style={{
            minWidth: inputWidth,
          }}
        >
          <div className={this.classNames(className, `${prefixCls}`)}>
            {
              this.items().map((item, idx) => {
                if (item.hideDisabled && item.disabled) return null;
                return (
                  <div
                    key={idx}
                    className={this.classNames({
                      'w-selected': value === item.value,
                      'w-disabled': item.disabled,
                    })}
                    disabled={item.disabled}
                    onClick={() => this.handleClick(item)}
                  >{item.value}
                  </div>
                );
              })
            }
          </div>
        </Popper>
      </Transition>
    );
  }
}

const compareTime = function (time1, time2) {
  const value1 = parseTime(time1);
  const value2 = parseTime(time2);
  const minutes1 = value1.minutes + (value1.hours * 60);
  const minutes2 = value2.minutes + (value2.hours * 60);

  if (minutes1 === minutes2) {
    return 0;
  }

  return minutes1 > minutes2 ? 1 : -1;
};

// 时间转换成字符串
const formatTime = function (time) {
  return `${time.hours < 10 ? `0${time.hours}` : time.hours}:${time.minutes < 10 ? `0${time.minutes}` : time.minutes}`;
};

// 下一个时间段
const nextTime = function (time, step) {
  const timeValue = parseTime(time);
  const stepValue = parseTime(step);
  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes,
  };

  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;

  next.hours += Math.floor(next.minutes / 60);
  next.minutes %= 60;

  return formatTime(next);
};

TimeSelectPanel.items = ({ start, end, step, minTime, maxTime, hideDisabled }) => {
  const result = [];
  if (start && end && step) {
    let current = start;
    while (compareTime(current, end) <= 0) {
      result.push({
        value: current,
        hideDisabled,
        disabled: compareTime(current, minTime || '00:00') <= 0 || compareTime(current, maxTime || '24:60') >= 0,
      });
      current = nextTime(current, step);
    }
  }
  return result;
};

TimeSelectPanel.propTypes = {
  prefixCls: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  format: PropTypes.string, // 时间序列化
  step: PropTypes.string,
  minTime: PropTypes.string,
  maxTime: PropTypes.string,
};

TimeSelectPanel.defaultProps = {
  prefixCls: 'w-timeselect-panel',
  start: '09:00',
  format: 'H:i',
  end: '18:00',
  step: '00:30',
};
