import React from 'react';
import { Component, PropTypes } from '../utils/';
import Icon from '../icon';
import Checkbox from '../checkbox';

export default class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否展开
      showTree: props.defaultExpandAll,
      // 默认关闭的Item
      closedItem: props.defaultExpandAll ? [] : [...props.data],
    };
  }
  onShowTree(item) {
    const { onExpand, option } = this.props;
    if (!item[option.children]) return;
    const { closedItem } = this.state;
    const idx = this.getCloseItemIndex(item, closedItem);
    if (idx > -1) {
      closedItem.splice(idx, 1);
    } else {
      closedItem.push(item);
    }
    this.setState({
      closedItem,
    }, () => {
      onExpand(item.key, idx > -1, item, this);
    });
  }
  onSelect(item, disabled, e) {
    if (disabled) return;
    const { onSelect } = this.props;
    const { selectedKeys } = this.parent().state;
    const { setSelecteKeys } = this.parent();
    setSelecteKeys(selectedKeys.filter((key) => {
      return key === item.key;
    }).length > 0 ? [] : [item.key], () => {
      onSelect([item.key], item, e);
    });
  }
  // 获取关闭节点的数据
  getCloseItemIndex = (item, closedItem) => {
    let idx = -1;
    for (let i = 0; i < closedItem.length; i += 1) {
      if (item.key === closedItem[i].key) {
        idx = i;
      }
    }
    return idx;
  }
  parent() {
    return this.context.component;
  }
  onChangeChecked(item, e, checked) {
    const { parentData } = this.props;
    this.parent().setCheckedKey(item, checked, parentData);
  }
  render() {
    const { prefixCls, data, showTree, showLine, disabled, checkedKeys, checkable, level, option } = this.props;
    const { closedItem } = this.state;
    const { selectedKeys } = this.parent().state;
    const { getChildrenKeys } = this.parent();
    const ulCls = level > 1 ? `${prefixCls}-${showTree ? 'open' : 'close'}` : null;
    return (
      <ul className={this.classNames(`${prefixCls}-item`, ulCls, {
        [`${prefixCls}-show-line`]: showLine,
      })}
      >
        {
          data.map((item, idx) => {
            const childs = item[option.children];
            const isChild = childs && childs.length > 0;
            const props = Object.assign({}, this.props, { parent: this });
            const index = this.getCloseItemIndex(item, closedItem);

            props.showTree = index < 0;
            props.level = level + 1;

            let iconname = 'caret-down';
            if (showLine && isChild) {
              iconname = index > -1 ? 'plus-square-o' : 'minus-square-o';
            }
            if (showLine && !isChild) {
              iconname = 'file-text';
            }
            const checkProps = {};
            if (checkedKeys.indexOf(item.key) > -1) {
              checkProps.checked = true;
            }
            const childKeys = getChildrenKeys(childs);
            const childFilterKeys = childKeys.filter((key) => {
              return checkedKeys.indexOf(key) > -1;
            });
            // 是否选中判断
            if (childFilterKeys.length > 0 && childFilterKeys.length === childKeys.length) {
              checkProps.checked = true;
            }
            // 半需状态
            if (childFilterKeys.length > 0 && childFilterKeys.length < childKeys.length) {
              checkProps.indeterminate = true;
              checkProps.checked = false;
            }
            // 节点是否禁用
            if (Array.isArray(disabled) && disabled.indexOf(item.key) > -1) {
              checkProps.disabled = true;
            }

            const labelClass = this.classNames(`${prefixCls}-item-label`, {
              [`${prefixCls}-disabled`]: checkProps.disabled,
            });
            return (
              <li key={idx.toString()}>
                <div className={labelClass}>
                  <Icon
                    onClick={this.onShowTree.bind(this, item)}
                    className={this.classNames(`${prefixCls}-icon`, {
                      'no-child': !isChild && !showLine,
                      'is-close': isChild && index > -1,
                    })}
                    type={iconname}
                  />
                  {checkable && <Checkbox onChange={this.onChangeChecked.bind(this, item)} {...checkProps} className={`${prefixCls}-checkbox`} />}
                  <span
                    onClick={this.onSelect.bind(this, item, checkProps.disabled)}
                    className={this.classNames(`${prefixCls}-inner`, {
                      [`${prefixCls}-selected`]: selectedKeys.filter(key => key === item.key).length > 0,
                    })}
                  >
                    {item[option.label]}
                  </span>
                </div>
                {isChild && <TreeNode {...props} data={childs} parentData={item} />}
              </li>
            );
          })
        }
      </ul>
    );
  }
}

TreeNode.defaultProps = {
  prefixCls: 'w-tree',
};
TreeNode.propTypes = {
  prefixCls: PropTypes.string,
};

TreeNode.contextTypes = {
  component: PropTypes.any,
};
