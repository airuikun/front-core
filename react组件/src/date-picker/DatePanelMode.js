import React from 'react';
import { Component } from '../utils/';
import { solarMonthDays } from './utils';

const rangesYear = (year) => {
  year = parseInt(year, 10) || 0;
  const arr = [];
  const panelNum = 12;
  for (let i = 0; i < panelNum; i += 1) {
    arr.push(year - ((panelNum / 2) - i));
  }
  return arr;
};

const parseDate = (date) => {
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay(),
    date,
  };
};
export default class DatePanelMonth extends Component {
  onClickMonth = (num) => {
    const { value, selectYear, selectMonth, onClicPanelkMode } = this.props;
    const time = value;
    if (selectMonth) {
      time.setMonth(num);
    }
    if (selectYear) {
      time.setFullYear(num);
    }
    if (onClicPanelkMode) onClicPanelkMode(new Date(time));
  }
  render() {
    const { prefixCls, selectMonth, selectYear, disabledDate, value } = this.props;
    const rangesYearArr = rangesYear(value.getFullYear());
    return (
      <div className={this.classNames(`${prefixCls}-mode-select`, {
        [`${prefixCls}-mode-select-year`]: selectYear,
      })}
      >
        {selectMonth && solarMonthDays().map((item, idx) => {
          const monthProps = {
            key: idx,
            className: this.classNames({ select: idx === value.getMonth() }),
          };
          const dateValue = value;
          const date = new Date(dateValue.setMonth(idx));
          let onClick = () => { };
          if (!disabledDate || (disabledDate && !disabledDate(parseDate(date)))) {
            onClick = () => this.onClickMonth(idx);
          } else {
            monthProps.className = this.classNames(monthProps.className, {
              [`${prefixCls}-disable`]: disabledDate && disabledDate(parseDate(date)),
            });
          }

          return (
            <div {...monthProps}> <span onClick={onClick}>{idx + 1}月</span> </div>
          );
        })}
        {selectYear && <div className={`${prefixCls}-panel-range`}>{rangesYearArr[0]} ~ {rangesYearArr[rangesYearArr.length - 1]}</div>}
        {selectYear && rangesYearArr.map((item, idx) => {
          const yearProps = {
            key: idx,
            className: this.classNames({ select: item === value.getFullYear() }),
          };
          const dateValue = value;
          const date = new Date(dateValue.setFullYear(item));
          let onClick = () => { };

          if (!disabledDate || (disabledDate && !disabledDate(parseDate(date)))) {
            onClick = () => this.onClickMonth(item);
          } else {
            yearProps.className = this.classNames(yearProps.className, {
              [`${prefixCls}-disable`]: disabledDate && disabledDate(parseDate(date)),
            });
          }

          return (
            <div {...yearProps}> <span onClick={onClick}>{item}年</span> </div>
          );
        })}
      </div>
    );
  }
}
