
import { formatDate, isLeapYear, isDate } from '../utils';

// 获得太阳月，俗称阳历月份
// 通过计算闰年第二月 可能 29天
export const solarMonthDays = () => {
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};

// 获取当月第一天星期几
export const getMonthToWeek = (year, month) => {
  return new Date(`${year}/${month}/${1}`).getDay();
};

// 填充一个月份界面单元格
export const fillUpDays = (dateObject, format, selectDate) => {
  const monthDays = solarMonthDays();
  const year = dateObject.getFullYear();
  if (isLeapYear(year)) {
    monthDays[1] = 29;
  }
  const month = dateObject.getMonth() + 1;
  const week = getMonthToWeek(year, month);
  const day = dateObject.getDate();
  const preMonth = month - 1 < 1 ? 12 : month - 1;
  const nextMonth = month + 1 > 12 ? 1 : month + 1;

  const preMonthDay = monthDays[preMonth - 1];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  // 1-42数组
  let i = 1;
  const timeLabel = `${(selectDate || currentDate).getHours()}:${(selectDate || currentDate).getMinutes()}:${(selectDate || currentDate).getSeconds()}`;
  const arr = [];
  for (; i < 43; i += 1) {
    const json = {};
    let date;
    if (i <= week) { // 上个月
      json.day = preMonthDay - (week - i);
      json.month = preMonth;
      date = new Date(`${month === 1 ? year - 1 : year}/${preMonth}/${json.day} ${timeLabel}`);
      json.date = date;
      json.format = formatDate(format, date);
      json.className = 'prev';
      json.week = date.getDay();
    } else if (i <= (monthDays[month - 1] + week)) {
      json.day = i - week;
      json.month = month;
      date = new Date(`${year}/${month}/${json.day} ${timeLabel}`);
      json.date = date;
      json.format = formatDate(format, date);
      json.week = date.getDay();
    } else { // 下个月
      json.day = i - (monthDays[month - 1] + week);
      json.month = nextMonth;
      json.className = 'next';
      date = new Date(`${month === 12 ? year + 1 : year}/${nextMonth}/${json.day} ${timeLabel}`);
      json.date = date;
      json.format = formatDate(format, date);
      json.week = date.getDay();
    }
    // 判断是否为今天
    if (json.day === currentDay && json.month === currentMonth && year === currentYear) {
      json.today = true;
    }
    // 选中的日子
    if (json.day === day && json.month === month && selectDate && isDate(selectDate) && selectDate.getFullYear() === year && month === selectDate.getMonth() + 1) {
      json.selectDay = true;
    }
    arr.push(json);
  }
  return arr;
};

// parseTime 方法生成的Object 对象转换时间 `22:32`
export const parseTimeStr = (obj) => {
  const time = [];
  for (const a in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, a)) {
      time.push(obj[a] < 10 ? `0${obj[a]}` : obj[a]);
    }
  }
  return time.join(':');
};

// 时间字符串转`22:32` 或者 时间 new Date 换成对象 {'hours':22,'minutes':32} || null
export const parseTime = function (time) {
  if (!time) return null;
  let hours;
  let minutes;
  let seconds;
  if (time instanceof Date) {
    const _time = new Date(time);
    hours = _time.getHours();
    minutes = _time.getMinutes();
    seconds = _time.getSeconds();
    return { hours, minutes, seconds };
  }

  const values = ('' || time).split(':');
  const timeParse = {};
  if (values.length >= 1 && values[0]) {
    hours = parseInt(values[0], 10);
    timeParse.hours = hours;
  }
  if (values.length >= 1 && values[1]) {
    minutes = parseInt(values[1], 10);
    timeParse.minutes = minutes;
  }
  if (values.length >= 1 && values[2]) {
    seconds = parseInt(values[2], 10);
    timeParse.seconds = seconds;
  }
  return timeParse;
};

//  new Date 换成对象 根据format 转换成 `22:32`
export const dateTimeToStr = (date, format = 'HH:mm:ss') => {
  const time = [];
  const _format = format.split(':');
  date = parseTime(date);
  if (!date) return '';
  if (_format.length > 0) {
    time.push(date.hours < 10 ? `0${date.hours}` : date.hours);
  }
  if (_format.length > 1) {
    time.push(date.minutes < 10 ? `0${date.minutes}` : date.minutes);
  }
  if (_format.length > 2) {
    time.push(date.seconds < 10 ? `0${date.seconds}` : date.seconds);
  }
  return time.join(':');
};
