import React from 'react';
import { Component, PropTypes } from '../utils/';
import Tooltip from '../tooltip/';

export default class Button extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: 0
    // }
    this.onDragging = this.onDragging.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentDidMount() {
    const { value } = this.props;
    this.startPoint = value;
    this.parent().setButtonPosition(this, value);
  }
  parent() {
    return this.context.component;
  }
  getStep() {
    return this.parent().props.step;
  }
  getMax() {
    return this.parent().props.max;
  }
  getMin() {
    return this.parent().props.min;
  }
  isDisabled() {
    return this.parent().props.disabled;
  }
  isVertical() {
    return this.parent().props.vertical;
  }
  isTooltip() {
    return this.parent().props.tooltip;
  }
  onDragging(event) {
    const { onChange } = this.props;
    const count = this.parent().getSliderSize();
    const currentX = event.clientX;
    const currentY = event.clientY;
    const move = ((this.isVertical() ? (this.startY - currentY) : (currentX - this.startX)) / count) * 100;
    const startPoint = this.startPoint + parseInt(move, 10);
    if (startPoint < 0 || startPoint > 100) return;
    if (
      this.startPoint !== startPoint && this.currentPoint !== startPoint
    ) {
      this.parent().isDragging(true);
      this.currentPoint = startPoint;
      this.button.style.zIndex = 99999;
      onChange(startPoint);
    }
  }
  onDragEnd() {
    const { onChange } = this.props;
    window.removeEventListener('mousemove', this.onDragging, true);
    window.removeEventListener('mouseup', this.onDragEnd, true);
    const startPoint = parseInt(this.button.style[this.isVertical() ? 'bottom' : 'left'], 10) || 0;
    if (this.startPoint !== startPoint) {
      onChange(startPoint);
    }
    this.startPoint = startPoint;
    this.button.style.zIndex = 1001;
    // 拖拽和点击，导致设置值不准确
    this.timeout = setTimeout(() => {
      this.parent().isDragging(false);
      clearTimeout(this.timeout);
    }, 0);
  }
  onButtonDown(event) {
    if (this.isDisabled()) return;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startPoint = this.startPoint || 0;
    this.currentPoint = this.startPoint;
    window.addEventListener('mousemove', this.onDragging, true);
    window.addEventListener('mouseup', this.onDragEnd, true);
  }
  showNumber(num) {
    return parseInt((this.getMin() + ((num * (this.getMax() - this.getMin())) / 100)), 10);
  }
  render() {
    const { prefixCls, value } = this.props;
    return (
      <div
        ref={(node) => { this.button = node; }}
        className={`${prefixCls}-btn-wapper`}
        onMouseDown={this.onButtonDown.bind(this)}
      >
        {this.isTooltip() ?
          <Tooltip content={this.showNumber(value)}>
            <div style={{ backgroundColor: this.parent().props.color }} className={`${prefixCls}-btn-inner`} />
          </Tooltip> :
          <div className={`${prefixCls}-btn-inner`} />
        }
      </div>
    );
  }
}

Button.contextTypes = {
  component: PropTypes.any,
};

Button.propTypes = {
  prefixCls: PropTypes.string,
};

Button.defaultProps = {
  prefixCls: 'w-slider',
};
