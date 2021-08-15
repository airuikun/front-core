import React from 'react';
import { Component, PropTypes, ReactDOM } from '../utils/';
import Transition from '../transition';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, true);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, true);
  }
  handleClickOutside(e) {
    const { onVisibleChange } = this.props;
    // Ignore clicks on the component it self
    // https://codepen.io/graubnla/pen/EgdgZm
    // Detect a click outside of a React Component
    // https://www.dhariri.com/posts/57c724e4d1befa66e5b8e056
    const domNode = ReactDOM.findDOMNode(this);
    if ((!domNode || !domNode.contains(e.target))) {
      this.setState({ visible: false }, () => {
        this.showDropdown = false;
        onVisibleChange(this.state.visible);
      });
    }
  }
  onClick = () => {
    const { visible, onVisibleChange } = this.props;
    if (this.showDropdown) {
      return;
    }
    this.setState({ visible: !visible }, () => {
      this.showDropdown = true;
      onVisibleChange(this.state.visible);
    });
  }
  onMouseEnter = () => {
    const { onVisibleChange } = this.props;
    this.setState({ visible: true }, () => {
      onVisibleChange(this.state.visible);
    });
    this.leaveDelay = false;
  }
  onMouseLeave = () => {
    const { onVisibleChange } = this.props;
    this.leaveDelay = true;
    if (this.timer) clearTimeout(this.timer);
    // 解决闪烁出现隐藏
    this.timer = setTimeout(() => {
      this.leaveDelay && this.setState({ visible: false }, () => {
        onVisibleChange(this.state.visible);
        clearTimeout(this.timer);
      });
    }, 300);
  }
  onSelectMenu = (index, menuItem) => {
    const { menu, onVisibleChange } = this.props;
    if (menu && menu.props) {
      this.setState({ visible: false }, () => {
        this.showDropdown = false;
        menu.props.onSelect && menu.props.onSelect(index, menuItem, menu);
        onVisibleChange(this.state.visible);
      });
    }
  }
  render() {
    const { prefixCls, className, children, disabled, menu, trigger, onVisibleChange, ...resetProps } = this.props;
    const { visible } = this.state;

    if (trigger === 'click') {
      resetProps.onClick = this.onClick;
    }
    if (trigger === 'hover') {
      resetProps.onMouseEnter = this.onMouseEnter;
      resetProps.onMouseLeave = this.onMouseLeave;
    }
    delete resetProps.visible;

    return (
      <div className={this.classNames(prefixCls, className, {
        [`${prefixCls}-disabled`]: disabled,
      })}
        {...resetProps}
      >
        {React.Children.map(children, (child, index) => React.cloneElement(child, { key: index }))}
        <Transition in={visible} sequence="fadeIn">
          <div className={`${prefixCls}-menu-warpper`}>
            {!disabled && menu && !disabled && React.cloneElement(menu, {
              ...menu.props,
              onSelect: this.onSelectMenu,
            })}
          </div>
        </Transition>
      </div>
    );
  }
}

Dropdown.propTypes = {
  prefixCls: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  menu: PropTypes.node,
  onVisibleChange: PropTypes.func,
  trigger: PropTypes.oneOf(['click', 'hover']),
};

Dropdown.defaultProps = {
  prefixCls: 'w-dropdown',
  trigger: 'hover',
  menu: null,
  visible: false,
  onVisibleChange() { },
};
