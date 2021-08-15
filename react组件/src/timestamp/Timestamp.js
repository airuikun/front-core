import React from 'react';
import { Component, PropTypes, formatDate, isDate } from '../utils/';

const fillZero = num => (num < 10 ? `0${num}` : num);
const hours = 60 * 60 * 1000;
const minutes = 60 * 1000;
const dateLeft = value => (new Date()).getTime() - (new Date(value)).getTime();

function timeZoneConverter(date, timeZone) {
  const oldDate = new Date(date);
  const newDate = new Date();
  const stamp = oldDate.getTime();
  if (!timeZone) return oldDate;
  return (isNaN(timeZone) && !timeZone)
    ? oldDate :
    new Date(stamp + (newDate.getTimezoneOffset() * 60 * 1000) + (timeZone * 60 * 60 * 1000));
}

function formatCountDown(timeleft, renderTime) {
  if (renderTime) return renderTime(timeleft);
  const h = fillZero(Math.floor(timeleft / hours));
  const m = fillZero(Math.floor((timeleft - (h * hours)) / minutes));
  const s = fillZero(Math.floor((timeleft - (h * hours) - (m * minutes)) / 1000));
  return `${h}:${m}:${s}`;
}
export default class Timestamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  componentDidMount() {
    const { value, format, startTime, tzc, beforeDate, renderDate, countDown, renderTime } = this.props;
    this.initDate(value, format, startTime, tzc, beforeDate, renderDate, countDown, renderTime);
  }
  componentWillReceiveProps(nextProps) {
    const { value, format, startTime, tzc, beforeDate, renderDate, countDown, renderTime } = nextProps;
    this.initDate(value, format, startTime, tzc, beforeDate, renderDate, countDown, renderTime);
  }
  initDate(value, format, startTime, tzc, beforeDate, renderDate, countDown, renderTime) {
    let date = formatDate(format, timeZoneConverter(value, tzc));
    if (countDown && (isDate(value) && isDate(startTime))) {
      this.timeleft = (new Date(value)).getTime() - (new Date(startTime)).getTime();
      date = formatCountDown(this.timeleft, renderTime);
      this.tick();
    }
    if (beforeDate) {
      this.timeleft = Date.now() - value;
      date = renderDate(dateLeft(value));
      this.tick();
    }
    this.setState({ date });
  }
  tick() {
    const { interval, beforeDate } = this.props;
    this.clear();
    if (interval < 1) return;
    this.timer = setInterval(() => (beforeDate ? this.dateAgo() : this.count()), interval);
  }
  clear() {
    this.timer && clearInterval(this.timer);
  }
  dateAgo() {
    const { renderDate, value, onDateChange } = this.props;
    this.setState({
      date: renderDate(dateLeft(value)),
    }, () => {
      onDateChange(dateLeft(value));
    });
  }
  count() {
    const { interval, renderDate, onDateEnd, onDateChange } = this.props;
    if (this.timeleft > interval) {
      this.timeleft = this.timeleft - interval;
      this.setState({ date: formatCountDown(this.timeleft, renderDate) }, () => {
        onDateChange(this.timeleft);
      });
    } else {
      this.timeleft = 0;
      this.setState({ date: 0 }, () => {
        this.clear();
        onDateEnd(this.timeleft);
      });
    }
  }
  render() {
    const { prefixCls, className, format, beforeDate, renderDate, tzc, value, countDown, onDateEnd, onDateChange, startTime, ...resetProps } = this.props;
    const { date } = this.state;
    return (
      <span className={this.classNames(`${prefixCls}`, className)} {...resetProps}>
        {date}
      </span>
    );
  }
}

Timestamp.propTypes = {
  prefixCls: PropTypes.string,
  tzc: PropTypes.number, // time Zone Converter
  value: PropTypes.oneOfType([
    PropTypes.string, // ISO-8601 string
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  format: PropTypes.string,
  renderDate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  beforeDate: PropTypes.bool,
  countDown: PropTypes.bool,
  interval: PropTypes.number,
  startTime: PropTypes.oneOfType([
    PropTypes.string, // ISO-8601 string
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  onDateEnd: PropTypes.func,
  onDateChange: PropTypes.func,
};

Timestamp.defaultProps = {
  prefixCls: 'w-timestamp',
  value: new Date(),
  format: 'Y-m-d h:i:s',
  beforeDate: false,
  interval: 1000,
  countDown: false,
  startTime: new Date(),
  onDateEnd() { },
  onDateChange() { },
  renderDate() { },
};
