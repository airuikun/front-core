import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes, randomid } from '../utils/';
import Input from '../input/';
import Tag from '../tag';
import Icon from '../icon';
import Transition from '../transition';
import Popper from '../popper/';
import { isSreachIndexOF } from './utils';

function getChildrensComponent(_children) {
  if (!_children) _children = [];
  let items = [];
  if (_children.length > 0) {
    _children.forEach((item) => {
      if (Array.isArray(item)) {
        item.forEach((_item) => {
          items = items.concat(getChildrensComponent(_item.props.children));
        });
      } else if (item.type.names === 'option') {
        items.push(item);
      } else {
        items = items.concat(getChildrensComponent(item.props.children));
      }
    });
  }
  return items;
}

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: props.placeholder,
      inputHovering: false,
      selected: props.multiple ? [] : undefined,
      selectedLabel: props.value, // 默认选中的值 多选为数组
      value: props.value, // 多选或单选值
      visible: false, // 菜单是否显示
      options: [], // 在可搜索的时候，需要调用option里面的方法
      query: '', // 多标签使用
      icon: 'arrow-down',
      inputWidth: 0,
      filterItems: [], // 搜索到的内容暂存
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }
  getChildContext() {
    return { component: this };
  }
  componentWillReceiveProps(props) {
    let { selectedLabel, selected } = this.state;
    if (props.children !== this.props.children && !props.multiple) {
      // 当下拉菜单，比 value 值后传进来，应当显示 label
      props.children.forEach((item) => {
        if (item.props.value === selectedLabel) {
          selectedLabel = item.props.label;
          selected = item;
        }
      });
      this.setState({ selectedLabel, selected });
    }
    if (props.placeholder !== this.props.placeholder) {
      this.setState({
        placeholder: props.placeholder,
      });
    }
    if (props.value !== this.props.value) {
      const state = {
        value: props.value,
        selectedLabel: props.value,
      };
      if (!state.value) {
        state.selected = [];
      }
      this.setState(state, () => {
        this.selectedData();
      });
    }
  }
  componentWillUpdate(props, state) {
    if (state.query !== this.state.query) {
      this.onQueryChange(state.query);
    }
  }
  componentDidMount() {
    if (this.input.input) {
      const input = ReactDOM.findDOMNode(this.input.input);
      this.setState({
        inputWidth: input.getBoundingClientRect().width,
      });
    }
    this.selectedData(true);
  }
  handleClickOutside(e) {
    // Ignore clicks on the component it self
    // https://codepen.io/graubnla/pen/EgdgZm
    // Detect a click outside of a React Component
    // https://www.dhariri.com/posts/57c724e4d1befa66e5b8e056
    const domNode = ReactDOM.findDOMNode(this);
    if ((!domNode || !domNode.contains(e.target))) {
      this.setState({ visible: false });
    }
  }
  // 将所有渲染后的组件，寄存在当前state option上面
  onOptionCreate(option) {
    this.state.options.push(option);
    this.setState({ options: this.state.options });
  }
  showLabelText(props) {
    return props.label ? props.label : props.value;
  }
  // 初始化默认选中
  selectedData(init) {
    const { multiple, filterable, children } = this.props;
    let { selectedLabel, selected } = this.state;
    const { value } = this.state;
    if (multiple && Array.isArray(value)) {
      selected = getChildrensComponent(children).reduce((prev, curr) => {
        return value.indexOf(curr.props.value) > -1 ? prev.concat(curr) : prev;
      }, []);
      selectedLabel = selected.map((option) => {
        return this.showLabelText(option.props);
      });
      // 修复多选 placeholder 内容隐藏
      const state = { selected, selectedLabel };
      state.placeholder = selectedLabel.length > 0 ? '' : this.props.placeholder;
      this.setState({ ...state }, () => {
        filterable && this.resetInputHeight(init);
      });
    } else {
      // 过滤改变 selectedLabel 的value对应的值
      selected = getChildrensComponent(children).filter((option) => {
        return option.props.value === value;
      })[0];
      if (selected) {
        this.setState({
          selected,
          selectedLabel: this.showLabelText(selected.props),
        });
      }
    }
  }
  resetInputHeight(init) {
    const { filterable } = this.props;
    this.input.input.style.height = `${this.tags.clientHeight}px`;
    if (!init) {
      if (filterable) {
        this.inputMultipleFocus();
      } else {
        this.input.focus();
      }
    }
  }
  onQueryChange(query) {
    const { options } = this.state;
    const { filterable, onSearch } = this.props;
    if (onSearch) {
      onSearch(query);
      return;
    }
    let filterItems = [];
    filterable && options.forEach((option) => {
      const { label, value } = option.props;
      if (label && value && (isSreachIndexOF(label, query) || isSreachIndexOF(value, query))) {
        filterItems.push(option);
      }
    });
    if (!query) {
      filterItems = options;
    }
    this.setState({ filterItems }, () => {
      filterItems.forEach((option) => {
        option.queryChange(query);
      });
    });
  }
  // 触发onChange事件
  onSelectedChange(option) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(option, value, option.props.value);
  }
  // 点击选中事件, 选中设置Select值
  onOptionClick(option) {
    const { multiple } = this.props;
    let { value, selectedLabel, filterItems } = this.state;
    if (multiple) {
      if (value.indexOf(option.props.value) > -1) {
        value.splice(value.indexOf(option.props.value), 1);
      } else {
        value.push(option.props.value);
      }
    } else {
      value = option.props.value;
      selectedLabel = option.props.label || value;
      filterItems = [option];
      this.setState({ visible: false });
    }
    this.setState({ value, selectedLabel, query: '', filterItems }, () => {
      this.selectedData();
      this.onSelectedChange(option);
      this.onQueryChange(option.props.value);
    });
  }
  onTagClose(item) {
    this.onOptionClick(item);
  }
  // 展示隐藏菜单
  toggleMenu(e) {
    const { disabled, children } = this.props;
    const { visible } = this.state;
    const domNode = ReactDOM.findDOMNode(this);

    if (children.length === 0) return;
    if (!disabled) {
      this.inputMultipleFocus();
      // 展开点击控件不消失
      if (visible && domNode && domNode.contains(e.target)) return;
      this.setState({ visible: !visible }, () => {
      });
    }
  }
  inputMultipleFocus() {
    const { multiple, filterable } = this.props;
    // 多标签输入过滤获得焦点
    if (multiple && filterable) {
      this.filterInput.input.focus();
    }
  }
  // 输入内容，回调事件
  onInputKeyUpChange() {
    if (this.props.filterable) {
      this.setState({ visible: true }, () => {
        this.setState({
          selectedLabel: this.state.selectedLabel,
        });
      });
    }
  }
  onChange(e, value) {
    const { onChange } = this.props;
    onChange(e, value, this.state.value);
  }
  // 多标签搜索方法
  onInputFilterChange(e, value) {
    this.setState({ query: value, selectedLabel: ' ' }, () => {
      if (this.filterInput && this.filterInputWidth) {
        let width = this.filterInputWidth.offsetWidth + 10;
        if (this.filterInputWidth.offsetWidth + 20 > this.rootNode.offsetWidth) {
          width = this.rootNode.offsetWidth - 20;
        }
        ReactDOM.findDOMNode(this.filterInput.input).style.width = `${width + 10}px`;
        this.resetInputHeight(true);
        this.onChange(e, value);
      }
    });
  }
  onInputChangeValue(e) {
    const value = e.target.value;
    this.setState({ selectedLabel: value, query: value }, () => {
      this.onChange(e, value);
    });
  }
  onMouseDown(e) {
    e.preventDefault();
    if (this.input) {
      this.input.focus();
    }
    // 单选展开菜单
    this.toggleMenu(e);
  }
  // 清空选中内容
  onIconClick(e) {
    const { multiple, onClear } = this.props;
    if (this.state.icon === 'close') {
      this.setState({
        selectedLabel: multiple ? [] : '',
        selected: multiple ? [] : '',
        value: multiple ? [] : '',
        icon: 'arrow-down',
      }, () => {
        onClear(this.state);
      });
      return;
    }
    if (this.input) this.input.focus();
    this.toggleMenu(e);
  }
  showCloseIcon(type) {
    if (this.state.selectedLabel && this.props.clearable) {
      this.setState({
        icon: type,
      });
    }
  }
  onIconMouseOver() { this.showCloseIcon('close'); }
  onIconMouseOut() { this.showCloseIcon('arrow-down'); }
  onMouseEnter() { this.showCloseIcon('close'); }
  onMouseLeave() { this.showCloseIcon('arrow-down'); }
  renderMultipleTags() {
    const { multiple, filterable, prefixCls } = this.props;
    const { selected } = this.state;
    if (!multiple) return null;
    return (
      <div ref={(elm) => { this.tags = elm; }} className={`${prefixCls}-tags`} onClick={this.toggleMenu.bind(this)}>
        {
          selected.map((item, idx) => {
            return (
              <Tag
                key={`${idx}${randomid()}`}
                onClose={this.onTagClose.bind(this, item)}
              >{this.showLabelText(item.props)}
              </Tag>
            );
          })
        }
        {filterable && (
          <div className={`${prefixCls}-tags-filter`}>
            <div className="cal" ref={elm => this.filterInputWidth = elm}>{this.state.query}</div>
            <Input
              ref={(component) => { this.filterInput = component; }}
              style={{ width: 21 }}
              value={this.state.query || ''}
              onChange={this.onInputFilterChange.bind(this)}
              size="mini"
            />
          </div>
        )}
      </div>
    );
  }
  renderListItem() {
    const { filterable, searchPlaceholder, onSearch, loading, children } = this.props;
    const { filterItems, query } = this.state;
    const notFound = <li>{searchPlaceholder}</li>;
    if (!onSearch && filterable && query && filterItems && filterItems.length === 0) {
      return notFound;
    }
    if (onSearch) {
      if (loading) {
        return <li><Icon type="loading" spin /></li>;
      }
      if (!loading && children.length < 1) {
        return notFound;
      }
    }
    return children;
  }
  showIcon() {
    const { multiple, onSearch } = this.props;
    let icon = null;
    if (!multiple && !onSearch) {
      icon = this.state.icon;
    }
    return icon;
  }
  render() {
    const { prefixCls, size, name, clearable, multiple, filterable, disabled, children, onChange, onClear, onSearch, loading, searchPlaceholder, ...resetProps } = this.props;
    const { visible, inputWidth, selectedLabel } = this.state;
    const inputValue = selectedLabel && multiple ? '' : selectedLabel;

    return (
      <div
        {...resetProps}
        ref={(elm) => { this.rootNode = elm; }}
        className={this.classNames(`${prefixCls}`, {
          unfold: this.state.visible, // 是否展开
          [`${prefixCls}-multiple`]: multiple,
        })}
      >
        {this.renderMultipleTags()}
        <Input
          type="text"
          ref={(component) => { this.input = component; }}
          name={name}
          size={size}
          disabled={disabled}
          value={inputValue}
          icon={this.showIcon()}
          readOnly={!filterable || multiple}
          placeholder={this.state.placeholder}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
          onIconClick={this.onIconClick.bind(this)}
          onIconMouseOut={this.onIconMouseOut.bind(this)}
          onIconMouseOver={this.onIconMouseOver.bind(this)}
          onChange={this.onInputChangeValue.bind(this)}
          onKeyUp={this.onInputKeyUpChange.bind(this)}
        />
        <Transition in={!!(visible && children)} sequence="fadeIn">
          <Popper
            className={this.classNames(`${prefixCls}-popper`)}
            clickOutside={this.handleClickOutside.bind(this)}
            style={{
              minWidth: inputWidth,
            }}
          >
            <ul className={`${prefixCls}-warp`}>
              {this.renderListItem()}
            </ul>
          </Popper>
        </Transition>
      </div>
    );
  }
}


Select.childContextTypes = {
  component: PropTypes.any,
};

Select.propTypes = {
  prefixCls: PropTypes.string,
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  loading: PropTypes.bool, // onSearch 搜索的时候 loading效果
  disabled: PropTypes.bool, // 是否禁用
  filterable: PropTypes.bool, // 是否可过滤搜索
  multiple: PropTypes.bool, // 是否可多选
  clearable: PropTypes.bool, // 清空单选
  value: PropTypes.oneOfType([// 是否可多选
    PropTypes.string,
    PropTypes.array,
  ]),
  size: PropTypes.oneOf(['large', 'small', 'default', 'mini']),
};

Select.defaultProps = {
  prefixCls: 'w-select',
  placeholder: '请选择',
  value: '',
  searchPlaceholder: '没有匹配的数据',
  disabled: false,
  loading: false,
  onChange: () => {},
  onClear: () => {},
  onSearch: null,
};
