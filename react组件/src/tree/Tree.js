import React from 'react';
import { Component, PropTypes } from '../utils/';
import TreeNode from './TreeNode';

export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 默认选中的
      selectedKeys: props.selectedKeys || [],
      checkedKeys: props.checkedKeys || [],
    };
  }
  getChildContext() {
    return { component: this };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedKeys !== this.props.selectedKeys) {
      this.setState({ selectedKeys: nextProps.selectedKeys });
    }
    if (nextProps.checkedKeys !== this.props.checkedKeys) {
      this.setState({ checkedKeys: nextProps.checkedKeys });
    }
  }
  setSelecteKeys = (keys, callback) => {
    this.setState({
      selectedKeys: keys,
    }, () => {
      if (callback) callback();
    });
  }
  getChildrenKeys = (item = []) => {
    const { option } = this.props;
    let arr = [];
    for (let i = 0; i < item.length; i += 1) {
      arr.push(item[i].key);
      if (item[i][option.children] && item[i][option.children].length > -1) {
        arr = arr.concat(this.getChildrenKeys(item[i][option.children]));
      }
    }
    return arr;
  }
  setCheckedKey = (item, checked, parentData) => {
    const { checkedKeys } = this.state;
    const { onCheck } = this.props;
    let childKeys = this.getChildrenKeys(item.children || []);
    let keys = checkedKeys;
    if (!checked) {
      keys = checkedKeys.filter(currentkey => item.key !== currentkey && childKeys.indexOf(currentkey) < 0);
    } else {
      childKeys = childKeys.filter((key) => {
        return keys.indexOf(key) < 0 && item.key !== key;
      });
      if (keys.indexOf(item.key < 0)) {
        keys.push(item.key);
      }
      keys = keys.concat(childKeys);
    }
    // 判断子节点是否全部选中，父级节点放入选中列表中
    // 判断父节点的子节点数据
    // 是否全部被选择
    if (parentData) {
      const parentChildKeys = this.getChildrenKeys(parentData.children || []);
      const parentChildFilterKeys = parentChildKeys.filter(key => keys.indexOf(key) > -1);
      if (parentChildFilterKeys.length === parentChildKeys.length && checked) {
        keys.push(parentData.key);
      } else if (keys.indexOf(parentData.key) > -1) {
        keys.splice(keys.indexOf(parentData.key), 1);
      }
    }
    this.setState({
      checkedKeys: keys,
    }, () => {
      onCheck(keys, item, checked);
    });
  }
  render() {
    const { prefixCls, className, ...resetProps } = this.props;
    const { checkedKeys } = this.state;
    const cls = this.classNames(className, `${prefixCls}`);
    return (
      <div className={cls}>
        <TreeNode {...resetProps} checkedKeys={checkedKeys} level={1} />
      </div>
    );
  }
}

Tree.defaultProps = {
  prefixCls: 'w-tree',
  selectedKeys: [],
  checkedKeys: [],
  showLine: false,
  checkable: false,
  checkStrictly: false,
  data: [],
  // 是否默认展开所有节点
  defaultExpandAll: false,
  option: {
    children: 'children',
    label: 'label',
  },
  onExpand() { },
  onSelect() { },
  onCheck() { },
};
Tree.propTypes = {
  prefixCls: PropTypes.string,
  selectedKeys: PropTypes.array,
  checkedKeys: PropTypes.array,
  showLine: PropTypes.bool,
  checkStrictly: PropTypes.bool,
  checkable: PropTypes.bool,
  data: PropTypes.array,
  defaultExpandAll: PropTypes.bool,
  option: PropTypes.shape({
    children: PropTypes.string,
    label: PropTypes.string,
  }),
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func,
};

Tree.childContextTypes = {
  component: PropTypes.any,
};

