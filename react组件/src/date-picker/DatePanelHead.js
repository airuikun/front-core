import React from 'react';
import { Component } from '../utils/';
import Icon from '../icon';

export default class DatePanelHead extends Component {
  onClick(type) {
    const { value, onClickPageBtn, selectYear } = this.props;
    let year = value.getFullYear();
    let month = value.getMonth() + 1;
    const day = value.getDate();
    switch (type) {
      case 'prevYear': year -= 1; break;
      case 'prevMonth':
        if (month === 1) {
          month = 12;
          year -= 1;
        } else {
          month -= 1;
        }
        break;
      case 'nextYear': year += 1; break;
      case 'nextMonth':
        if (month === 12) {
          month = 1;
          year += 1;
        } else {
          month += 1;
        }
        break;
      default: break;
    }
    // 年份翻页
    if (selectYear && type === 'prevYear') {
      year -= 8;
    }
    if (selectYear && type === 'nextYear') {
      year += 8;
    }
    if (onClickPageBtn) onClickPageBtn(new Date(year, month - 1, day, value.getHours(), value.getMinutes(), value.getSeconds()));
  }
  onPickerYear(year) {
    const { onPickerYear } = this.props;
    if (onPickerYear) {
      onPickerYear(year, true);
    }
  }
  render() {
    const { prefixCls, value, onPickerMonth, onPickerYear, selectYear, selectMonth } = this.props;
    if (selectYear || selectMonth) {
      return (
        <div className={`${prefixCls}-bar`}>
          <a className={`${prefixCls}-prev-year-btn`} onClick={this.onClick.bind(this, 'prevYear')}>
            <Icon type="d-arrow-left" />
          </a>
          <a className={`${prefixCls}-year-select`} onClick={this.onPickerYear.bind(this, value.getFullYear())}>
            {value.getFullYear()}
            <Icon type="caret-down" />
          </a>
          <a className={`${prefixCls}-next-year-btn`} onClick={this.onClick.bind(this, 'nextYear')}>
            <Icon type="d-arrow-right" />
          </a>
        </div>
      );
    }
    return (
      <div className={`${prefixCls}-bar`}>
        <a className={`${prefixCls}-prev-year-btn`} onClick={this.onClick.bind(this, 'prevYear')}>
          <Icon type="d-arrow-left" />
        </a>
        <a className={`${prefixCls}-prev-month-btn`} onClick={this.onClick.bind(this, 'prevMonth')}>
          <Icon type="arrow-down" />
        </a>
        <a className={`${prefixCls}-year-select`} onClick={() => onPickerYear(value.getFullYear(), true)}>
          {value.getFullYear()}
          <Icon type="caret-down" />
        </a>
        <a className={`${prefixCls}-month-select`} onClick={() => onPickerMonth(value.getMonth() + 1, true)}>
          {value.getMonth() + 1}
          <Icon type="caret-down" />
        </a>
        <a className={`${prefixCls}-next-year-btn`} onClick={this.onClick.bind(this, 'nextYear')}>
          <Icon type="d-arrow-right" />
        </a>
        <a className={`${prefixCls}-next-month-btn`} onClick={this.onClick.bind(this, 'nextMonth')}>
          <Icon type="arrow-down" />
        </a>
      </div>
    );
  }
}
