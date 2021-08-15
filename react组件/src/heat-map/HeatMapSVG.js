import React from 'react';
import { Component, PropTypes, findDOMNode } from '../utils/';

export default class HeatMapSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
    };
    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }
  componentDidMount() {
    // 根据宽度来生成多少天的图形
    const { days, rectWidth } = this.parent().props;
    const $this = findDOMNode(this);
    const width = $this.parentNode.offsetWidth;
    const col = parseInt(width / (rectWidth + 2), 10);
    const daycount = (col * 7) - 14;
    this.setState({
      days: days || daycount,
    });
  }
  // 返回不同深浅的颜色
  isExistColor(num) {
    const { panelColors } = this.parent().props;
    let color = '';
    let keys = [];
    const nums = Object.keys(panelColors);
    // 转换成数字
    for (let a = 0; a < nums.length; a += 1) {
      keys.push(parseInt(nums[a], 10));
    }
    // 排序
    keys = this.numberSort(keys);
    // 判断使用什么颜色
    for (let a = 0; a < keys.length; a += 1) {
      if (keys[a] > num) {
        color = panelColors[keys[a]];
        break;
      }
      color = panelColors[keys[a]];
    }
    return color;
  }
  onClick(e, curdate, curdt) {
    const { onClick } = this.parent().props;
    onClick(e, curdate, curdt);
  }

  isCurrentData(date) { // 判断传进来的数据，并返回颜色
    const { values, panelColors } = this.parent().props;
    let curdt = {};
    for (let i = 0; i < values.length; i += 1) {
      let curdate = new Date(values[i].date);
      curdate = `${curdate.getFullYear()}/${curdate.getMonth() + 1}/${curdate.getDate()}`;
      if (curdate === date) {
        curdt = values[i];
        break;
      }
    }
    curdt.date = date;
    if (curdt.count && curdt.count > 0) {
      curdt.color = this.isExistColor(curdt.count);
    } else {
      curdt.color = panelColors[0] || '#EBEDF0';
    }
    return curdt;
  }
  onMouseLeave() {
    this.rect = null;
    this.parent().hideTooltip();
  }
  onMouseMove(e, curdatestr, curdt) {
    if (e.target.tagName === 'rect' && e.target.dataset && e.target.dataset.date) {
      if (this.rect !== e.target) {
        this.rect = e.target;
        this.parent().onMouseOver(e, e.target.dataset.date, curdt);
      }
    }
  }
  renderPanelColors() {
    const { panelColors, rectWidth, rectHeight } = this.parent().props;
    const col = rectWidth + 2;
    const rectPanelColors = [];
    // 颜色说明栏
    const nums = Object.keys(panelColors);
    for (let i = 0; i < nums.length; i += 1) {
      const xl = i * col;
      rectPanelColors.push(<rect key={i} width={rectWidth} height={rectHeight} x={xl} y="0" fill={panelColors[nums[i]]} />);
    }
    return rectPanelColors;
  }
  parent() {
    return this.context.component;
  }
  // 排序 比较函数
  numberSort(keys) {
    return keys.sort((x, y) => { // 比较函数
      if (x < y) return -1;
      else if (x > y) return 1;
      return 0;
    });
  }
  renderPanelHeader(ty) {
    const { endDate, weekLables, rectWidth, rectHeight, monthLables } = this.parent().props;
    let { days } = this.state;
    let dayDate = [];
    const oneday = 86400000;
    const timestamp = endDate.getTime();
    const curweek = new Date(timestamp).getDay();
    days = days + curweek + 1;

    for (let i = 0; i < days; i += 1) {
      dayDate.push(timestamp - (oneday * i));
    }
    dayDate = this.numberSort(dayDate);
    // 日历
    const rectdays = [];
    const rectweeks = [];
    const rectMonth = [];
    const col = rectWidth + 2;
    for (let i = 0; i < days; i += 1) {
      const xl = parseInt(i / 7, 10) * col;
      const yl = 21 + (parseInt(i % 7, 10) * col);
      const curdate = new Date(dayDate[i]);
      const curdatestr = `${curdate.getFullYear()}/${curdate.getMonth() + 1}/${curdate.getDate()}`;
      const curdt = this.isCurrentData(curdatestr);
      // 日方块
      rectdays.push(<rect
        data-date={curdatestr}
        key={i}
        fill={curdt.color}
        x={col + xl}
        y={yl}
        onClick={e => this.onClick(e, curdatestr, curdt)}
        onMouseMove={e => this.onMouseMove(e, curdatestr, curdt)}
        // onMouseMove={this.onMouseMove.bind(this)}
        width={rectWidth}
        height={rectHeight}
      />);
      // 周标题
      if (Object.keys(weekLables).indexOf(i.toString()) > -1 && i < 7) {
        rectweeks.push(<text key={i} x={xl + 7} y={yl} width={rectWidth + 10} height={rectHeight}>{weekLables[i]}</text>);
      }
      // 月标题
      if (parseInt(curdate.getDate(), 10) === 1) {
        rectMonth.push(<text key={i} x={xl + 12}> {monthLables[parseInt(curdate.getMonth(), 10)]} </text>);
      }
    }
    if (ty === 'week') {
      return rectweeks;
    } else if (ty === 'month') {
      return rectMonth;
    } else if (ty === 'day') {
      return rectdays;
    }
  }
  render() {
    const { prefixCls, className } = this.props;
    const { rectWidth, rectHeight } = this.parent().props;
    const cls = this.classNames(prefixCls, className);
    return (
      <svg className={cls} width="100%" height={`${(rectHeight * 7) + 60}px`}>
        <g className={`${prefixCls}-week`} transform="translate(0, 10)">
          {this.renderPanelHeader('week')}
        </g>
        <g className={`${prefixCls}-month`} transform={`translate(${rectWidth}, ${16})`}>
          {this.renderPanelHeader('month')}
        </g>
        <g transform={`translate(${rectWidth + 2}, ${(rectHeight * 7) + 40})`}> {this.renderPanelColors()} </g>
        <g onMouseLeave={this.onMouseLeave.bind(this)}>
          {this.renderPanelHeader('day')}
        </g>
      </svg>
    );
  }
}

HeatMapSVG.propTypes = {
  prefixCls: PropTypes.string,
};

HeatMapSVG.defaultProps = {
  prefixCls: 'w-heatmap',
};

HeatMapSVG.contextTypes = {
  component: PropTypes.any,
};
