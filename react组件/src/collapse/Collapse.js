import React from 'react';
import { Component, PropTypes } from '../utils/';

function toArray(activeKey) {
  let currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    currentActiveKey = currentActiveKey ? [currentActiveKey] : [];
  }
  return currentActiveKey;
}

export default class Collapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: toArray(props.activeKey),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeKey !== this.props.activeKey) {
      this.setState({ activeKey: toArray(nextProps.activeKey) });
    }
  }
  onItemClick(key) {
    const { onChange } = this.props;
    let activeKey = this.state.activeKey;
    if (this.props.accordion) {
      activeKey = activeKey[0] === key ? [] : [key];
    } else {
      activeKey = [...activeKey];
      const index = activeKey.indexOf(key);
      const isActive = index > -1;
      if (isActive) {
        activeKey.splice(index, 1);
      } else {
        activeKey.push(key);
      }
    }
    this.setState({ activeKey }, () => {
      onChange && onChange(activeKey, this.props);
    });
  }
  render() {
    const { prefixCls, className, children, accordion, bordered, showArrow, activeKey, ...resetProps } = this.props;
    const cls = this.classNames(prefixCls, className, {
      'no-border': bordered,
    });
    return (
      <div className={cls} {...resetProps}>
        {React.Children.map(children, (child, index) => {
          // 如果没有密钥提供，请使用面板顺序作为默认密钥
          const key = child.key || String(index);
          const { disabled } = child.props;
          let isActive = false;
          if (accordion) { // 手风琴模式下默认选择第一个
            isActive = this.state.activeKey[0] === key;
          } else {
            isActive = this.state.activeKey.indexOf(key) > -1;
          }
          const childProps = {
            prefixCls,
            isActive,
            disabled,
            showArrow,
            onItemClick: disabled ? () => { } : () => this.onItemClick(key),
            ...child.props,
          };
          return React.cloneElement(child, childProps);
        })}
      </div>
    );
  }
}

Collapse.propTypes = {
  prefixCls: PropTypes.string,
  accordion: PropTypes.bool,
  showArrow: PropTypes.bool,
  onChange: PropTypes.func,
  activeKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Collapse.defaultProps = {
  prefixCls: 'w-collapse',
  accordion: false,
  showArrow: true,
};
