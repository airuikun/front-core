import React from 'react';
import { Component, PropTypes } from '../utils/';
import Icon from '../icon';

export default class Input extends Component {
  static defaultProps = {
    prefixCls: 'w-input',
    type: 'text',
    placeholder: '',
    autoComplete: 'off',
    onChange() { },
    onSearch() { },
    onKeyUp() { },
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(...props) {
    this.setState({
      ...props,
    });
  }
  handleKeyUp(e) {
    const { onSearch, onKeyUp } = this.props;
    if (e.key === 'Enter') {
      onSearch(e, e.target.value);
    }
    onKeyUp(e);
  }
  // Input-Number 等其它组件使用的方法
  focus() {
    (this.input || this.textarea).focus();
  }
  blur() {
    (this.input || this.textarea).blur();
  }
  handleChange(e) {
    const { onChange } = this.props;
    onChange(e, e.target.value);
  }
  handleClick(type, e) {
    if (this.props[type]) {
      this.props[type](e, this.state.value);
    }
  }
  renderIcon(type) {
    const { prefixCls, preIcon, icon, onIconClick, onPreIconClick, onIconMouseOut, onPreIconMouseOut, onIconMouseOver, onPreIconMouseOver } = this.props;
    let icons;

    if (type === 'icon' && typeof icon === 'string') icons = icon;
    if (type === 'preIcon' && typeof preIcon === 'string') icons = preIcon;

    const renderIcon = () => {
      if ((typeof preIcon === 'string' && icons) || (typeof icon === 'string' && icons)) {
        return (
          <Icon
            className="w-input-icon-inner"
            type={icons}
            onClick={this.handleClick.bind(this, type === 'icon' ? 'onIconClick' : 'onPreIconClick')}
            onMouseOver={this.handleClick.bind(this, type === 'icon' ? 'onIconMouseOver' : 'onPreIconMouseOver')}
            onMouseOut={this.handleClick.bind(this, type === 'icon' ? 'onIconMouseOut' : 'onPreIconMouseOut')}
          />
        );
      }
      return type === 'icon' ? icon : preIcon;
    };
    return (
      <div className={this.classNames({
        [`${prefixCls}-icon-left`]: type === 'preIcon' && preIcon,
        [`${prefixCls}-icon-right`]: type === 'icon' && icon,
        event: (type === 'preIcon' && onPreIconClick) ||
          (type === 'icon' && onIconClick) ||
          (type === 'preIcon' && onPreIconMouseOut) ||
          (type === 'icon' && onIconMouseOut) ||
          (type === 'preIcon' && onPreIconMouseOut) ||
          (type === 'icon' && onIconMouseOver) ||
          (type === 'preIcon' && onPreIconMouseOver),
      })}
      >
        {renderIcon()}
      </div>
    );
  }
  render() {
    const { prefixCls, className, style, type, size, length, preIcon, icon, value,
      onSearch,
      onIconClick,
      onPreIconClick,
      onIconMouseOut,
      onPreIconMouseOut,
      onIconMouseOver,
      onPreIconMouseOver,
      addonBefore,
      addonAfter,
      ...other
    } = this.props;
    const cls = this.classNames(`${prefixCls}`, className, {
      textarea: type === 'textarea',
      'w-disabled': this.props.disabled,
    });

    if (type === 'textarea') {
      return (
        <textarea
          className={this.classNames(cls, `${prefixCls}-inner`)}
          {...other}
          value={value}
          placeholder={this.props.placeholder}
          ref={(elm) => { this.textarea = elm; }}
          type={type}
          style={style}
          onChange={this.handleChange.bind(this)}
        />
      );
    }

    return (
      <div
        style={style}
        className={this.classNames(cls, {
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-icon`]: preIcon || icon,
          [`${prefixCls}-addon`]: addonBefore || addonAfter,
        })}
      >
        {addonBefore && <span className={`${prefixCls}-addon-before`}>{addonBefore}</span>}
        {preIcon && this.renderIcon.bind(this)('preIcon')}
        {icon && this.renderIcon.bind(this)('icon')}
        <input
          {...other}
          type={type}
          ref={(elm) => { this.input = elm; }}
          className={this.classNames(`${prefixCls}-inner`, {
            [`${prefixCls}-p-left`]: preIcon,
            [`${prefixCls}-p-right`]: icon,
            'addon-before': addonBefore,
            'addon-after': addonAfter,
          })}
          value={value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange.bind(this)}
          onKeyUp={this.handleKeyUp.bind(this)}
        />
        {addonAfter && <span className={`${prefixCls}-addon-after`}>{addonAfter}</span>}
      </div>
    );
  }
}

Input.propTypes = {
  prefixCls: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small', 'mini']),
  length: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  preIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onKeyUp: PropTypes.func,
  addonBefore: PropTypes.node,
  addonAfter: PropTypes.node,
};
