import React from 'react';
import { Component, PropTypes } from '../utils/';
import './style/index.less';

export default class List extends Component {
  render() {
    const { prefixCls, className, children, bordered, striped, header, footer, size, dataSource, renderItem, ...resetProps } = this.props;
    let items;
    if (dataSource && dataSource.length > 0) {
      items = dataSource.map((item, index) => renderItem(item, index));
    } else {
      items = children;
    }
    const childrenList = React.Children.map(items, (child, index) => React.cloneElement(child, {
      key: index,
    }));
    const classString = this.classNames(`${prefixCls}`, className, {
      [`${prefixCls}-striped`]: striped,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-size-${size}`]: size && size !== 'default',
    });
    return (
      <div className={classString} {...resetProps}>
        {header && <div className={`${prefixCls}-header`}>{header}</div>}
        {childrenList}
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
      </div>
    );
  }
}

List.propTypes = {
  prefixCls: PropTypes.string,
  bordered: PropTypes.bool,
  striped: PropTypes.bool,
  header: PropTypes.node,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  renderItem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  dataSource: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  footer: PropTypes.node,
};

List.defaultProps = {
  prefixCls: 'w-list',
  bordered: true,
  striped: false,
  header: null,
  size: 'default',
  renderItem() { },
  dataSource: null,
  data: null,
  footer: null,
};
