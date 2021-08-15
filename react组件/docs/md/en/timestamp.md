Timestamp 时间戳
===

用于时间格式化。

## 基础实例

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Timestamp value="Wed Nov 22 2017 02:06:01 GMT+0800 (CST)"/>
    )
  }
}
```
<!--End-->

## 格式化时间

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <div>
        <div><Timestamp format="Y年m月d日 h:i:s" value="Wed Nov 22 2017 02:06:01 GMT+0800 (CST)"/></div>
        <div><Timestamp format="Y年m月d日" value="Wed Nov 22 2017 02:06:01 GMT+0800 (CST)"/></div>
        <div><Timestamp format={`\\T\\o\\d\\a\\y \\i\\s d-m-Y`} value={new Date()}/></div>
        <div><Timestamp format={`今天是：Y/m/d`} value={new Date()}/></div>
        <div><Timestamp format="h:i:s" value="Wed Nov 22 2017 02:06:01 GMT+0800 (CST)"/></div>
        <div><Timestamp format="Y" value="Wed Nov 22 2017 02:06:01 GMT+0800 (CST)"/></div>
        <div><Timestamp format="m月" value="Wed Nov 22 2017 02:06:01 GMT+0800 (CST)"/></div>
        <div><Timestamp format="d日" value="Wed Nov 22 2017 02:06:01 GMT+0800 (CST)"/></div>
        <div><Timestamp format="d日" value="Wed Nov 22 2017 02:06:01 GMT+0800 (CST)"/></div>
      </div>
    )
  }
}
```
<!--End-->

## 倒计时

<!--DemoStart--> 
```js
const fillZero = num => (num < 10 ? `0${num}` : num);
const hours = 60 * 60 * 1000;
const minutes = 60 * 1000;

class Demo extends Component {
  renderDate(time){
    const h = fillZero(Math.floor(time / hours));
    const m = fillZero(Math.floor((time - (h * hours)) / minutes));
    const s = fillZero(Math.floor((time - (h * hours) - (m * minutes)) / 1000));
    return `${h}时 ${m}分 ${s}秒`;
  }
  render() {
    return (
      <div>
        <div><Timestamp countDown={true} value={Date.now() + 26400000}/></div>
        <div><Timestamp renderDate={this.renderDate.bind(this)} countDown={true} value={Date.now() + 26400000}/></div>
      </div>
    )
  }
}
```
<!--End-->

## 某时间之前

多少小时前、多少分钟前、多少秒前，`interval=0` 不触发定时器，刷新页面

<!--DemoStart--> 
```js
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const halfamonth = day * 15;
const month = day * 30;
const year = month * 12;

class Demo extends Component {
  onDateChange(number){
    let label = '';
    const _year = number/year;
    const _month = number/month;
    const _week = number/(7*day);
    const _day = number/day;
    const _hour = number/hour;
    const _min = number/minute;

    if(_year>=1) label=parseInt(_year) + "年前";
    else if(_month>=1) label=parseInt(_month) + "个月前";
    else if(_week>=1) label=parseInt(_week) + "周前";
    else if(_day>=1) label=parseInt(_day) +"天前";
    else if(_hour>=1) label=parseInt(_hour) +"个小时前";
    else if(_min>=1) label=parseInt(_min) +"分钟前";
    else label="刚刚";
    return (
      <span>{label}</span>
    )
  }
  render() {
    return (
      <div>
        <div><Timestamp beforeDate={true} renderDate={this.onDateChange.bind(this)} value={Date.now() - 55000}/></div>
        <div><Timestamp beforeDate={true} interval={0} renderDate={this.onDateChange.bind(this)} value={Date.now() - 31000}/></div>
        <div><Timestamp beforeDate={true} interval={0} renderDate={this.onDateChange.bind(this)} value={Date.now() - minute*46}/></div>
        <div><Timestamp beforeDate={true} interval={0} renderDate={this.onDateChange.bind(this)} value={Date.now() - hour*12}/></div>
        <div><Timestamp beforeDate={true} interval={0} renderDate={this.onDateChange.bind(this)} value="Wed Nov 22 2017 02:06:01 GMT+0800 (CST)"/></div>
      </div>
    )
  }
}
```
<!--End-->


## 时区转换

`TZC` 为服务器时间时区，将时间转换到东八区时间

<!--DemoStart--> 
```js
class Demo extends Component {
  render() {
    return (
      <Timestamp tzc={8} format="Y年m月d日 h:i:s" value="Wed Nov 22 2017 02:06:01 GMT+0800 (CST)"/>
    )
  }
}
```
<!--End-->

## 安装和使用

```bash
npm install uiw --save
```

```js
import { Timestamp } from 'uiw';
// or
import Timestamp from 'uiw/lib/timestamp';
```

### Props

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| value | 日期值作为ISO8601字符串或Date对象，`countDown=true`的时候，它是一个倒计时结束时间。 | String | - |
| format | 格式化时间，例如：`Y年m月d日 H:i:s`，年`Y`，月`m`，日`d`，时`H`，分`i`，秒`s` | String | `Y-m-d H:i:s` |
| tzc | 服务器时区，解决因时区变更，导致显示服务器时间不准确 time Zone Converter | Number | - |
| startTime | 倒计时，起始时间 | Number/String/Date | `new Date()` |
| beforeDate | 某时间之前，如`8 分钟之前` | Boolean | `false` |
| countDown | 倒计时，开关 | Boolean | `false` |
| renderDate | 倒计时，回调函数返回Dom，用于格式化时间 | Function(Date) | `new Date()` |
| interval | 倒计时，间隔时间，`interval=0` 不触发定时器 | Number | `1000`ms |
| onDateChange | 倒计时，间隔时间出发事件 | Number | `1000`ms |
| onDateEnd | 倒计时结束触发事件 | Number | `1000`ms |
