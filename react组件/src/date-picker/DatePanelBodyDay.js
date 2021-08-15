import React from 'react';
import { Component, PropTypes } from '../utils/';
import { fillUpDays } from './utils';

export default class DatePanelBodyDay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { prefixCls, format, weekLabel, selectDate, disabledDate, dateCellRender, date, renderDate, labelToday, onClick } = this.props;
    const items = [];
    let td = [];
    fillUpDays(date, format, selectDate).forEach((item, index) => {
      const isInteger = ((index + 1) / 7) % 1;
      const dayProps = { key: index };
      if (!disabledDate || (disabledDate && !disabledDate(item))) {
        dayProps.onClick = () => onClick(item);
      }
      const marked = dateCellRender ? (
        <div key={`mark${index}`} className={`${prefixCls}-marked`}>
          <div className={`${prefixCls}-inner`}>
            {typeof dateCellRender === 'function' && dateCellRender(item)}
          </div>
        </div>
      ) : null;
      if (renderDate) {
        const child = renderDate(item, item.selectDay && selectDate);
        td.push(React.cloneElement(<td>{child}{marked}</td>, { ...dayProps }));
      } else {
        td.push(React.createElement('td', {
          ...dayProps,
          title: item.today ? labelToday : item.format,
          className: this.classNames(item.className, {
            [`${prefixCls}-today`]: item.today,
            [`${prefixCls}-disable`]: disabledDate && disabledDate(item),
            [`${prefixCls}-select-day`]: item.selectDay && selectDate,
            [`${prefixCls}-sun`]: item.week === 0,
            [`${prefixCls}-sat`]: item.week === 6,
          }),
        }, [<div key={`label${index}`} className={`${prefixCls}-label`}>{item.day}</div>, marked]));
      }
      if (isInteger === 0) {
        items.push(td);
        td = [];
      }
    });
    return (
      <table className={`${prefixCls}-days`}>
        <thead>
          <tr className={`${prefixCls}-week`}>
            {weekLabel.map((label, idx) => {
              return (
                <th key={idx} title={label} className={this.classNames({ end: idx === 0 || idx === 6 })} >
                  {label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {
            items.map((item, index) => {
              return (
                <tr key={index}>
                  {item}
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

DatePanelBodyDay.propTypes = {
  prefixCls: PropTypes.string,
  disabledDate: PropTypes.func,
  format: PropTypes.string,
  selectDate: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date),
  weekLabel: PropTypes.arrayOf(PropTypes.string),
  dateCellRender: PropTypes.func,
  onClick: PropTypes.func,
};

DatePanelBodyDay.defaultProps = {
  prefixCls: 'w-datepicker',
  format: 'Y/m/d',
  date: new Date(),
  selectDate: null,
  onClick() { },
  weekLabel: ['日', '一', '二', '三', '四', '五', '六'],
  dateCellRender: null,
};
