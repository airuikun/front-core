import React from 'react';
import { Component, PropTypes } from '../utils/';
import Icon from '../icon/';

export default class Progress extends Component {
  relativeStrokeWidth(bl, type, elm) {
    const { strokeWidth, percent } = this.props;
    if (elm) {
      const { width } = elm.parentNode.getBoundingClientRect();
      const _strokeWidth = ((strokeWidth / width) * 100).toFixed(1);
      const radius = parseInt(
        50 - (parseFloat(_strokeWidth) / 2),
        10
      );
      elm.setAttribute('stroke-width', _strokeWidth);
      elm.setAttribute('d', `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`);
      if (type === 'track') {
        // 计算周长
        const perimeter = 2 * Math.PI * radius;
        elm.setAttribute('style', `stroke-dasharray:${perimeter}px,${perimeter}px;stroke-dashoffset:${(1 - (percent / 100)) * perimeter}px;transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease;`);
      }
    }
  }
  stroke() {
    const { percent } = this.props;
    let ret;
    switch (this.props.status) {
      case 'success': ret = '#13ce66'; break;
      case 'exception': ret = '#ff4949'; break;
      default: ret = '#20a0ff';
    }
    if (percent === 100) {
      ret = '#13ce66';
    }
    return ret;
  }
  render() {
    const { prefixCls, style, type, className, showText, percent, format, strokeWidth, width, status, ...resetProps } = this.props;
    const cls = this.classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-show-text`]: showText,
      [`${prefixCls}-status-${status}`]: status,
      [`${prefixCls}-status-success`]: parseInt(percent.toString(), 10) >= 100,
    });
    let progress;
    let progressInfo;
    const progressStatus = parseInt(percent.toString(), 10) >= 100 && !('status' in this.props) ? 'success' : status;
    if (showText) {
      let text;
      const circleStyle = {};
      if (progressStatus === 'exception') {
        text = format ? format(percent) : <Icon type={type === 'line' ? 'circle-close' : 'close'} />;
      } else if (progressStatus === 'success') {
        text = format ? format(percent) : <Icon type={type === 'line' ? 'circle-check' : 'check'} />;
      } else {
        text = format ? format(percent) : `${percent}%`;
      }
      if (type === 'circle') {
        circleStyle.fontSize = (width * 0.16) + 6;
      }
      progressInfo = <span className={`${prefixCls}-text`} style={{ ...circleStyle }}>{text}</span>;
    }
    if (type === 'line') {
      const percentStyle = {
        width: `${percent}%`,
        height: strokeWidth,
      };
      progress = (
        <div className={`${prefixCls}-bar`}>
          <div className={`${prefixCls}-inner`}>
            <div className={`${prefixCls}-bg`} style={percentStyle} />
          </div>
        </div>
      );
    } else {
      progress = (
        <svg viewBox="0 0 100 100" width={`${width}`}>
          <path ref={this.relativeStrokeWidth.bind(this, true, 'bg')} stroke="#e5e9f2" fill="none" />
          <path ref={this.relativeStrokeWidth.bind(this, true, 'track')} strokeLinecap="round" stroke={this.stroke()} fill="none" />
        </svg>
      );
    }
    return (
      <div className={cls} style={style} {...resetProps}>{progress}{progressInfo}</div>
    );
  }
}

Progress.propTypes = {
  prefixCls: PropTypes.string,
  showText: PropTypes.bool,
  format: PropTypes.func,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
  status: PropTypes.oneOf([
    'success',
    'active',
    'exception',
  ]),
  type: PropTypes.oneOf([
    'line',
    'circle',
  ]),
  percent: PropTypes.number.isRequired,
};

Progress.defaultProps = {
  prefixCls: 'w-progress',
  showText: true, // 是否显示进度条文字内容
  percent: 0, // 百分比（必填）
  width: 126, // 圆圈进度条画布宽度
  strokeWidth: 6, // 进度条大小设置
  type: 'line',
};
