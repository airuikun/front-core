// 判断是否为日期
export const isDate = function (date) {
  return ((new Date(date).toString() !== 'Invalid Date' && !isNaN(new Date(date))));
};

// 判断是否为正确的时间格式
// 15:21:21 = true
// 15:21 = true
export const isDateTime = function (timeStr) {
  return /^([01][0-9]|[2][0-3]):([0-5][0-9])(?::([0-5][0-9])(\.\d{1,3})?)?$/.test(timeStr);
};

// Defining patterns
const replaceChars = {
  // Day
  d() { const d = this.getDate(); return (d < 10 ? '0' : '') + d; },
  D() { return Date.shortDays[this.getDay()]; },
  j() { return this.getDate(); },
  l() { return Date.longDays[this.getDay()]; },
  N() { const N = this.getDay(); return (N === 0 ? 7 : N); },
  S() {
    const S = this.getDate();
    if (S % 10 === 1 && S !== 11) {
      return 'st';
    }
    if (S % 10 === 2 && S !== 12) {
      return 'nd';
    }
    if (S % 10 === 3 && S !== 13) {
      return 'rd';
    }
    return 'th';
    // return (S % 10 === 1 && S !== 11 ? 'st' : (S % 10 === 2 && S !== 12 ? 'nd' : (S % 10 === 3 && S !== 13 ? 'rd' : 'th')));
  },
  w() { return this.getDay(); },
  z() { const d = new Date(this.getFullYear(), 0, 1); return Math.ceil((this - d) / 86400000); },
  // Week
  W() {
    const target = new Date(this.valueOf());
    const dayNr = (this.getDay() + 6) % 7;
    target.setDate((target.getDate() - dayNr) + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + (((4 - target.getDay()) + 7) % 7));
    }
    const retVal = 1 + Math.ceil((firstThursday - target) / 604800000);

    return (retVal < 10 ? `0${retVal}` : retVal);
  },
  // Month
  F() { return Date.longMonths[this.getMonth()]; },
  m() { const m = this.getMonth(); return (m < 9 ? '0' : '') + (m + 1); },
  M() { return Date.shortMonths[this.getMonth()]; },
  n() { return this.getMonth() + 1; },
  t() {
    let year = this.getFullYear();
    let nextMonth = this.getMonth() + 1;
    if (nextMonth === 12) {
      // year = year++;
      year += 1;
      nextMonth = 0;
    }
    return new Date(year, nextMonth, 0).getDate();
  },
  // Year
  L() { const L = this.getFullYear(); return (L % 400 === 0 || (L % 100 !== 0 && L % 4 === 0)); },
  o() {
    const d = new Date(this.valueOf());
    d.setDate((d.getDate() - ((this.getDay() + 6) % 7)) + 3);
    return d.getFullYear();
  },
  Y() { return this.getFullYear(); },
  y() { return (`${this.getFullYear()}`).substr(2); },
  // Time
  a() { return this.getHours() < 12 ? 'am' : 'pm'; },
  A() { return this.getHours() < 12 ? 'AM' : 'PM'; },
  B() { return Math.floor(((((this.getUTCHours() + 1) % 24) + (this.getUTCMinutes() / 60) + (this.getUTCSeconds() / 3600)) * 1000) / 24); },
  g() { return this.getHours() % 12 || 12; },
  G() { return this.getHours(); },
  h() { const h = this.getHours(); return ((h % 12 || 12) < 10 ? '0' : '') + (h % 12 || 12); },
  H() { const H = this.getHours(); return (H < 10 ? '0' : '') + H; },
  i() { const i = this.getMinutes(); return (i < 10 ? '0' : '') + i; },
  s() { const s = this.getSeconds(); return (s < 10 ? '0' : '') + s; },
  v() {
    const v = this.getMilliseconds();
    if (v < 10) {
      return '00';
    }
    return (v < 100 ? '0' : '') + v;
  },
  // Timezone
  e() { return Intl.DateTimeFormat().resolvedOptions().timeZone; },
  I() {
    let DST = null;
    for (let i = 0; i < 12; i += 1) {
      const d = new Date(this.getFullYear(), i, 1);
      const offset = d.getTimezoneOffset();

      if (DST === null) DST = offset;
      else if (offset < DST) { DST = offset; break; } else if (offset > DST) break;
    }
    return (this.getTimezoneOffset() === DST) || 0;
  },
  O() { const O = this.getTimezoneOffset(); return (-O < 0 ? '-' : '+') + (Math.abs(O / 60) < 10 ? '0' : '') + Math.floor(Math.abs(O / 60)) + (Math.abs(O % 60) === 0 ? '00' : ((Math.abs(O % 60) < 10 ? '0' : '')) + (Math.abs(O % 60))); },
  P() {
    const P = this.getTimezoneOffset();
    return `${-P < 0 ? '-' : '+'}${(Math.abs(P / 60) < 10 ? '0' : '')}${Math.floor(Math.abs(P / 60))}:${(Math.abs(P % 60) < 10 ? '0' : '')}${Math.abs(P % 60)}`;
    // return (-P < 0 ? '-' : '+') + (Math.abs(P / 60) < 10 ? '0' : '') + Math.floor(Math.abs(P / 60)) + ':' + (Math.abs(P % 60) === 0 ? '00' : ((Math.abs(P % 60) < 10 ? '0' : '')) + (Math.abs(P % 60)));
  },
  T() { const tz = this.toLocaleTimeString(navigator.language, { timeZoneName: 'short' }).split(' '); return tz[tz.length - 1]; },
  Z() { return -this.getTimezoneOffset() * 60; },
  // Full Date/Time
  c() { return this.format('Y-m-d\\TH:i:sP'); },
  r() { return this.toString(); },
  U() { return this.getTime() / 1000; },
};
/**
 *
 * formatDate('d-m-Y',new Date('26/11/2017')); // Outputs "26-11-2017"
 * formatDate('d-m-Y H:i:s'); // Outputs "26-11-2017 15:24:30"
 * formatDate('M jS, Y'); // Outputs "Nov 26th, 2017"
 * formatDate('\\T\\o\\d\\a\\y \\i\\s d-m-Y'); // Outputs "Today is 26-11-2017"
 * https://github.com/jacwright/date.format/blob/master/date.format.js
 * @param {*} date
 * @param {*} formatStr
 */
export function formatDate(formatStr, date) {
  date = isDate(date) ? new Date(date) : new Date();
  return formatStr.replace(/(\\?)(.)/g, (_, esc, chr) => {
    return (esc === '' && replaceChars[chr]) ? replaceChars[chr].call(date) : chr;
  });
}

// 是否为闰年
export const isLeapYear = (year) => {
  if (year % 4 === 0 && year % 100 !== 0) return true;
  else if (year % 400 === 0) return true;
  return false;
};
