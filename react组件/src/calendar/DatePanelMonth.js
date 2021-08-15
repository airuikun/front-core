import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class DatePanelMonth extends Component {
  render() {
    const { prefixCls, date, monthCellRender } = this.props;
    const months = [];
    let monthTd = [];
    for (let i = 0; i < 12; i += 1) {
      const isInteger = ((i + 1) / 3) % 1;
      const monthProps = { key: i };
      const marked = monthCellRender ? (
        <div key={`mark${i}`} className={`${prefixCls}-marked`}>
          <div className={`${prefixCls}-inner`}>
            {typeof monthCellRender === 'function' && monthCellRender(date, i + 1)}
          </div>
        </div>
      ) : null;
      monthTd.push(React.cloneElement(<td>{i + 1}月 {marked}</td>, { ...monthProps }));
      if (isInteger === 0) {
        months.push(monthTd);
        monthTd = [];
      }
    }
    return (
      <table className={this.classNames(prefixCls)}>
        <tbody>
          {months.map((item, index) => {
            return (<tr key={index}>{item}</tr>);
          })}
        </tbody>
      </table>
    );
  }
}

DatePanelMonth.propTypes = {
  prefixCls: PropTypes.string,
};

DatePanelMonth.defaultProps = {
  prefixCls: 'w-calendar-month',
  date: new Date(),
  dateCellRender: () => { },
};
