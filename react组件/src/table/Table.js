import React from 'react';
import { Component, PropTypes } from '../utils/';
import Thead from './Thead';
import Tbody from './Tbody';
import Colgroup from './Colgroup';
import Paging from '../paging/';
import Loading from '../loading/';
import Icon from '../icon/';

export default class Table extends Component {
  static childContextTypes = {
    component: PropTypes.any,
  }
  constructor(props) {
    super(props);
    this.state = {
      // data: props.data,          //当前所有数据
      // rowsCount: 0,              //选中的行数
      // rowsChecked: {},           //选中的数据
      // rowsDisabled: {},          //禁用的数据
      // rowCheckedDisable:{},      //选中并禁用的
      ...this.initalState(props),
      ischecked: !!props.rowSelection, // 是否存在选择功能

      trHoverClassName: [], // 行移入移除事件，
      scrollLeft: 0,
      scrollRight: 0,
      scrollTop: 0,
      leftFixedWidth: 0, // 左边固定的宽度
      rightFixedWidth: 0, // 右边固定的宽度
      leftFixedTop: null, // 左边固定的距离顶部距离
    };
  }
  getChildContext() {
    return { component: this };
  }
  // 初始化数据
  initalState(props) {
    const { data, columns } = props;
    let rowsCount = 0;
    const rowsChecked = {};
    const rowsDisabled = {};
    const rowCheckedDisable = {};
    for (let i = 0; i < data.length; i += 1) {
      if (data[i]._checked && data[i]._disabled) {
        rowCheckedDisable[i] = data[i];
      }
      if (data[i]._checked) {
        delete data[i]._checked;
        rowsCount += 1;
        rowsChecked[i] = data[i];
      }
      if (data[i]._disabled) {
        delete data[i]._disabled;
        rowsDisabled[i] = data[i];
      }
      // 值为false的也清除
      delete data[i]._checked;
      delete data[i]._disabled;
    }
    if (props.rowSelection && columns.length > 0 && columns.filter(item => item.key === '_select').length === 0) {
      columns.unshift({ title: '_select', key: '_select', fixed: 'left' });
    }
    return {
      data,
      rowsCount,
      rowsChecked,
      rowsDisabled,
      rowCheckedDisable,
      columns,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      const rowsDisabled = {};
      const rowsChecked = {};
      const rowCheckedDisable = {};
      nextProps.data.forEach((item, idx) => {
        if (item._checked && item._disabled) rowCheckedDisable[idx] = item;
        if (item._disabled) rowsDisabled[idx] = item;
        if (item._checked) rowsChecked[idx] = item;
      });
      this.setState({
        data: nextProps.data.map((item) => {
          delete item._checked;
          delete item._disabled;
          return item;
        }),
        rowsDisabled,
        rowsChecked,
        rowCheckedDisable,
      });
    }
    if (nextProps.columns !== this.props.columns) {
      this.setState({ columns: nextProps.columns });
    }
  }
  componentDidMount() {
    // leftFixedTop
    if (this.tableThead && this.tableThead.thead
      && this.tableThead.thead.offsetHeight > 0) {
      this.setState({
        leftFixedTop: this.tableThead.thead.offsetHeight,
      });
    }
  }
  // 单行选择事件
  onRowSelection = (row, index, checked, e) => {
    const { rowsChecked, rowsCount } = this.state;
    const { rowSelection } = this.props;
    const rowsCheckedNew = rowsChecked;
    const count = Math.abs(checked ? rowsCount + 1 : rowsCount - 1);
    if (checked) {
      rowsCheckedNew[index] = row;
    } else {
      delete rowsCheckedNew[index];
    }
    this.setState({
      rowsChecked: rowsCheckedNew,
      rowsCount: count,
    });
    rowSelection.onSelect && rowSelection.onSelect(row, index, checked, rowsChecked, e);
  }
  // 全选
  selectedAll = (e, checked) => {
    const { rowSelection } = this.props;
    const { data, rowsDisabled, rowCheckedDisable } = this.state;
    const rowsCheckedNew = {};
    let count = 0;
    data.map((item, idx) => {
      if (checked && !rowCheckedDisable[idx] && !rowsDisabled[idx]) {
        rowsCheckedNew[idx] = item;
        count += 1;
      } else if (rowCheckedDisable[idx]) {
        rowsCheckedNew[idx] = item;
      }
      return item;
    });
    this.setState({
      rowsChecked: rowsCheckedNew,
      rowsCount: count,
    }, () => {
      rowSelection.onSelectAll && rowSelection.onSelectAll(rowsCheckedNew, checked, e);
    });
  }
  // 横向滚动事件
  onScroll(e) {
    const { prefixCls } = this.props;
    const target = e && e.target ? e.target : this.bodyWrapper.target;

    if (target instanceof HTMLDivElement) {
      if (e.target === this.leftBodyWrapper) {
        this.bodyWrapper && (this.bodyWrapper.scrollTop = target.scrollTop);
        this.rightBodyWrapper && (this.rightBodyWrapper.scrollTop = target.scrollTop);
      }
      if (e.target === this.rightBodyWrapper) {
        this.bodyWrapper && (this.bodyWrapper.scrollTop = target.scrollTop);
        this.leftBodyWrapper && (this.leftBodyWrapper.scrollTop = target.scrollTop);
      }
      if (e.target === this.bodyWrapper) {
        this.headerWrapper.scrollLeft = target.scrollLeft;

        this.leftBodyWrapper && (this.leftBodyWrapper.scrollTop = target.scrollTop);
        this.rightBodyWrapper && (this.rightBodyWrapper.scrollTop = target.scrollTop);
      }
    }

    if (!this.fixedBodyWrapper) return;
    const scrollRight = target.scrollWidth - (target.scrollLeft + target.clientWidth);
    let fixedClassNames = '';
    if (target.scrollLeft < 1) {
      fixedClassNames = `${prefixCls}-fixed ${prefixCls}-scroll-position-left`;
    }
    if (target.scrollLeft > 0 && scrollRight > 0) {
      fixedClassNames = `${prefixCls}-fixed ${prefixCls}-scroll-position-middle`;
    }
    if (scrollRight < 1) {
      fixedClassNames = `${prefixCls}-fixed ${prefixCls}-scroll-position-right`;
    }
    if (e && e.target === this.bodyWrapper) {
      this.fixedBodyWrapper.className = fixedClassNames;
    }
  }
  setFixedWidth = (leftWidth, rightWidth) => {
    this.setState({
      leftFixedWidth: leftWidth,
      rightFixedWidth: rightWidth,
    });
  }
  onTrHover = (ty, idx) => {
    this.setState({
      trHoverClassName: ty === 'enter' ? [idx] : [],
    });
  }
  // 是否有固定列
  isColumnsFixed(columns, type) {
    let isFixed = false;
    for (let i = 0; i < columns.length; i += 1) {
      if (columns[i].fixed === type) {
        isFixed = true;
        break;
      }
      if (columns[i].children && columns[i].children.length) {
        isFixed = this.isColumnsFixed(columns[i].children, type);
        if (isFixed === true) break;
      }
    }
    return isFixed;
  }
  render() {
    const { prefixCls, className, rowClassName, rowSelection, caption, footer, data, width, paging, loading } = this.props;
    const { trHoverClassName, columns } = this.state;
    const { height, showHeader } = this.props;
    const tableTbody = refname => (<Tbody
      ref={(componet) => { this[refname] = componet; }}
      type={refname}
      rowClassName={rowClassName}
      rowSelection={rowSelection}
      trHoverClassName={trHoverClassName}
      onTrHover={this.onTrHover}
      onRowSelection={this.onRowSelection}
      columns={columns}
      data={data}
    />
    );

    const tableThead = refname => (<Thead
      ref={(componet) => { this[refname] = componet; }}
      rowSelection={rowSelection}
      setFixedWidth={this.setFixedWidth}
      selectedAll={this.selectedAll}
      columns={columns}
    />
    );

    const tableColgroup = (<Colgroup columns={columns} />);
    const tableCaption = caption && (<div className={`${prefixCls}-caption`}>{caption}</div>);
    const tableFooter = footer && (<div className={`${prefixCls}-footer`}>{footer}</div>);

    const pagingView = paging && <Paging className={`${prefixCls}-paging`} {...paging} />;
    if (height || width || rowSelection || loading === (true || false)) {
      const fixedCloneTable = (width) ? (
        <div
          ref={(node) => { this.fixedBodyWrapper = node; }}
          className={this.classNames(`${prefixCls}-fixed`, `${prefixCls}-scroll-position-left`)}
          style={{ marginTop: -this.state.leftFixedTop }}
        >
          {this.isColumnsFixed(columns, 'left') &&
            <div
              className={this.classNames(`${prefixCls}-fixed-left`)}
              style={{ width: this.state.leftFixedWidth }}
            >
              <div className={`${prefixCls}-fixed-head-left`}>
                <table>
                  {React.cloneElement(tableColgroup)}
                  {showHeader && React.cloneElement(tableThead(), {
                    cloneElement: 'left',
                  })}
                </table>
              </div>
              <div ref={(node) => { this.leftBodyWrapper = node; }} onScroll={this.onScroll.bind(this)} style={{ height }} className={`${prefixCls}-fixed-body-left`}>
                <table>
                  {React.cloneElement(tableColgroup, { cloneElement: 'left' })}
                  {React.cloneElement(tableTbody('tbody_left'), { cloneElement: 'left' })}
                </table>
              </div>
            </div>
          }
          {this.isColumnsFixed(columns, 'right') &&
            <div
              className={this.classNames(`${prefixCls}-fixed-right`)}
              style={{ width: this.state.rightFixedWidth }}
            >
              <div className={`${prefixCls}-fixed-head-right`}>
                <table>
                  {React.cloneElement(tableColgroup)}
                  {showHeader && React.cloneElement(tableThead(), {
                    cloneElement: 'right',
                  })}
                </table>
              </div>
              <div ref={(node) => { this.rightBodyWrapper = node; }} style={{ height }} className={`${prefixCls}-fixed-body-right`}>
                <table>
                  {React.cloneElement(tableColgroup, { cloneElement: 'right' })}
                  {React.cloneElement(tableTbody('tbody_right'), { cloneElement: 'right' })}
                </table>
              </div>
            </div>
          }
        </div>
      ) : null;

      // 固定头 或者左右滚动
      return (
        <div className={`${prefixCls}-warpper`}>
          <div className={this.classNames(className, prefixCls, `${prefixCls}-scroll`, {
            'is-empty': data.length === 0,
            'is-footer': tableFooter,
          })}
          >
            {tableCaption}
            <div ref={(node) => { this.headerWrapper = node; }} className={`${prefixCls}-head`}>
              <table style={{ width }}>
                {tableColgroup}
                {showHeader && tableThead('tableThead')}
              </table>
            </div>
            <Loading loading={this.props.loading === undefined ? false : loading}>
              {data.length === 0 ?
                <div className="placeholder"><Icon type="frown-o" /> 暂无数据</div> :
                <div ref={(node) => { this.bodyWrapper = node; }} onScroll={this.onScroll.bind(this)} style={{ height }} className={`${prefixCls}-body`}>
                  <table style={{ width }}>
                    {tableColgroup}
                    {tableTbody('tbody')}
                  </table>
                </div>
              }
              {tableFooter}
              {fixedCloneTable}
              {pagingView}
            </Loading>
          </div>
        </div>
      );
    }

    return (
      <div className={`${prefixCls}-warpper`}>
        <div className={this.classNames(className, prefixCls, `${prefixCls}-default`, {
          'is-empty': data.length === 0,
          'is-footer': tableFooter,
        })}
        >
          {tableCaption}
          <table>
            {tableColgroup}
            {showHeader && tableThead('tableThead')}
            {data.length === 0 ? (
              <tbody>
                <tr>
                  <td ref={(elm) => {
                    if (elm && this.tableThead && showHeader) {
                      elm.colSpan = this.tableThead.getColSpan(columns);
                    }
                  }}
                  ><Icon type="frown-o" /> 暂无数据
                  </td>
                </tr>
              </tbody>
            ) : tableTbody()}
          </table>
          {tableFooter}
        </div>
        {pagingView}
      </div>
    );
  }
}

Table.defaultProps = {
  prefixCls: 'w-table',
  size: 'default',
  // loading: false,
  data: [],
  showHeader: true,
  columns: [],
};

Table.propTypes = {
  columns: PropTypes.array,
  prefixCls: PropTypes.string,
  showHeader: PropTypes.bool,
  rowClassName: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  dataIndex: PropTypes.string,
  size: PropTypes.oneOf(['large', 'default', 'small']),
  data: PropTypes.array,
  height: PropTypes.number,
  rowSelection: PropTypes.shape({
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onCellClick: PropTypes.func,
  }),
  paging: PropTypes.object,
  // onSelectAll: PropTypes.func,
  // onSelect: PropTypes.func,
  scroll: PropTypes.object,
};
