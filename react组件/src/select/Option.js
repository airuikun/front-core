import React from 'react';
import { Component, PropTypes } from '../utils/';
import Icon from '../icon/';
import { isSreachIndexOF } from './utils';

export default class Option extends Component {
  static names = 'option'
  constructor(props) {
    super(props);
    this.mounted = true;
    this.state = {
      visible: true,
    };
    this.queryChange = this.queryChange.bind(this);
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  componentWillMount() {
    const { selectedLabel } = this.parent().state;
    const { multiple, filterable } = this.parent().props;
    this.parent().onOptionCreate(this);
    // 初始化搜索过滤方法
    if ((filterable && selectedLabel) || (filterable && multiple && selectedLabel.length > 0)) {
      this.queryChange();
    }
  }
  parent() { return this.context.component; }
  // 点击单个Item事件
  selectOptionClick() {
    if (this.props.disabled !== true) {
      this.parent().onOptionClick(this);
    }
  }
  isSelected() {
    const { selected } = this.parent().state;
    const { onSearch, filterable } = this.parent().props;
    const { value } = this.props;
    // 过滤搜索不需要选中
    if (onSearch && filterable) return false;
    if (selected) {
      if (Object.prototype.toString.call(selected) === '[object Object]') {
        return value === selected.props.value;
      } else if (Array.isArray(selected)) {
        return selected.map(el => el.props.value).indexOf(value) > -1;
      }
    }
    return false;
  }
  isMultiple() {
    return this.parent().props.multiple;
  }
  currentLabel() {
    const { label, value } = this.props;
    return label || ((typeof value === 'string' || typeof value === 'number') ? value : '');
  }
  // 搜索过滤方法
  queryChange(_query) {
    const { multiple } = this.parent().props;
    const { query, selectedLabel } = this.parent().state;
    if (!_query) {
      _query = multiple ? query : selectedLabel;
    }
    let visible = isSreachIndexOF(this.currentLabel(), _query);
    // 没有输入内容的情况
    if (!query) visible = true;
    // 判断组件是否挂载
    if (this.mounted) {
      this.setState({ visible });
    }
    return visible;
  }
  render() {
    const { children, disabled } = this.props;
    const { visible } = this.state;
    if (!visible) return null;
    return (
      <li
        onClick={this.selectOptionClick.bind(this)}
        className={this.classNames({
          disabled,
          selected: this.isSelected(),
        })}
      >
        {children || <span>{this.currentLabel()}</span>}
        {this.isSelected() && this.isMultiple() && <span className="check"><Icon type="check" /></span>}
      </li>
    );
  }
}

Option.contextTypes = {
  component: PropTypes.any,
};

Option.propTypes = {
  prefixCls: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Option.defaultProps = {
  prefixCls: 'w-select',
};
