import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes } from '../utils/';
import { parseTime, parseTimeStr } from './utils';

// http://easings.net/zh-cn
// https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L451
// 缓动函数
// 比方说我们要从位置0的地方运动到100，时间是10秒钟，此时，b, c, d三个参数就已经确认了
// b=0
// c=100 变化值c就是100-0就是100
// d=10 只要给一个小于最终时间10的值
// 假设 当前进入到第五秒 easeInQuad(5,0,100,10)
const easeInQuad = (t, b, c, d) => {
  return (c * (t /= d) * t) + b;
};

// 时间滚动内容调整时间
export default class TimeSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 显示几组数据
      several: (props.format || '').split(':'),
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.renderItem = this.renderItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  // 生成时间
  rangeTime(end, ty) {
    return TimeSpinner.items(end, ty, this.props);
  }
  // 点击当前节点滚动到顶部
  scrollTopNow(elm) {
    const currentDom = ReactDOM.findDOMNode(elm);
    const offsetTop = currentDom.offsetTop;
    const rootTop = currentDom.parentNode.parentNode.scrollTop;
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      const offsetTopMove = parseInt(easeInQuad(time, rootTop, offsetTop, offsetTop), 10);
      if (currentDom.offsetParent) currentDom.offsetParent.scrollTop = offsetTopMove > offsetTop ? offsetTop : offsetTopMove;
      if (currentDom.offsetParent && currentDom.offsetParent.scrollTop < offsetTop) {
        window.requestAnimationFrame(frameFunc);
      }
    };
    window.requestAnimationFrame(frameFunc);
  }
  handleClick(item, e) {
    const { onPicked, value } = this.props;
    if (!item.disabled) {
      const date = new Date();
      const time = parseTime(new Date(`${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${value}`));
      time[`${item.ty}`] = Number(item.value);

      onPicked(parseTimeStr(time), true);
      // 点击当前节点滚动到顶部
      this.scrollTopNow(e.target);
    }
  }
  renderItem(arr) {
    const { prefixCls, hideDisabled } = this.props;
    return (
      <div className={this.classNames(`${prefixCls}-select`)}>
        <ul ref={(tag) => {
          if (tag) {
            tag.style.paddingBottom = `${tag.parentNode.clientHeight - tag.firstChild.clientHeight}px`;
          }
        }}
        >
          {
            arr.map((item, idx) => {
              if (hideDisabled && item.disabled) return null;
              return (
                <li
                  ref={(tag) => {
                    if (tag && item.checked) {
                      const currentDom = ReactDOM.findDOMNode(tag);
                      if (currentDom.offsetParent) currentDom.offsetParent.scrollTop = currentDom.offsetTop;
                    }
                  }}
                  key={`${idx}`}
                  className={this.classNames({
                    'w-disabled': item.disabled,
                    'w-checked': item.checked,
                  })}
                  onClick={e => this.handleClick(item, e)}
                >
                  {item.value}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
  render() {
    const { prefixCls, className, isDatePicker } = this.props;
    const { several } = this.state;
    return (
      <div
        ref={(elm) => {
          if (!isDatePicker && elm && elm.children && elm.children[0]) {
            // elm.style.width = `${elm.children[0].offsetWidth * several.length}px`;
          }
        }}
        className={this.classNames(`${prefixCls}`, className)}
      >
        {several.length > 0 && this.renderItem(this.rangeTime(24, 'hours'))}
        {several.length > 1 && this.renderItem(this.rangeTime(60, 'minutes'))}
        {several.length > 2 && this.renderItem(this.rangeTime(60, 'seconds'))}
      </div>
    );
  }
}

TimeSpinner.items = (end, ty, { disabledHours, disabledMinutes, disabledSeconds, value }) => {
  const currentTime = parseTime(value);
  const r = [];
  for (let i = 0; i < end; i += 1) {
    const time = i < 10 ? `0${i}` : `${i}`;
    let disabledArr = [];
    let checked = false;
    switch (ty) {
      case 'hours': disabledArr = disabledHours; if (value && i === currentTime.hours) checked = true; break;
      case 'minutes': disabledArr = disabledMinutes; if (value && i === currentTime.minutes) checked = true; break;
      case 'seconds': disabledArr = disabledSeconds; if (value && i === currentTime.seconds) checked = true; break;
      default: break;
    }
    r.push({
      value: time,
      ty,
      disabled: disabledArr.indexOf(time) > -1,
      checked,
    });
  }
  return r;
};
TimeSpinner.propTypes = {
  hours: PropTypes.number, // 时
  minutes: PropTypes.number, // 分
  seconds: PropTypes.number, // 秒
  value: PropTypes.string.isRequired,
  format: PropTypes.string, // 时间序列化
  isDatePicker: PropTypes.bool, // 是否为时间选择器
  disabledHours: PropTypes.array, // 禁用时
  disabledMinutes: PropTypes.array, // 禁用分
  disabledSeconds: PropTypes.array, // 禁用秒
  isShowSeconds: PropTypes.bool, // 是否显示秒
};

TimeSpinner.defaultProps = {
  prefixCls: 'w-time-spinner',
  isDatePicker: false,
  format: 'H:i:s',
  disabledHours: [], // 时
  disabledMinutes: [], // 分
  disabledSeconds: [], // 秒
  hours: 0, // 时
  minutes: 0, // 分
  seconds: 0, // 秒
};
