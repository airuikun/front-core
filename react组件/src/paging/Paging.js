import React from 'react';
import { Component, PropTypes } from '../utils/';
import Icon from '../icon';

export default class Paging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: props.activePage,
      hoverMoreBtn: 'more',
    };
    this.onPrevOrNext = this.onPrevOrNext.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activePage !== this.props.activePage) {
      this.setState({
        activePage: nextProps.activePage,
      });
    }
  }
  onPrevOrNext(ty) {
    const { total, pageSize, onChange } = this.props;
    const { activePage } = this.state;
    const totalPage = total / pageSize;
    if ((ty === 'prev' && activePage === 1) || (ty === 'next' && (activePage === totalPage || activePage > totalPage))) {
      return;
    }
    let num = ty === 'prev' ? activePage - 1 : activePage + 1;

    switch (ty) {
      case 'prev': num = activePage - 1; break;
      case 'next': num = activePage + 1; break;
      case 'jump-prev': num = activePage - 3; break;
      case 'jump-next': num = activePage + 3; break;
      default: break;
    }
    if (num) {
      this.setState({ activePage: num });
      onChange && onChange(num, total, pageSize);
    }
  }
  getPages() {
    const { pageSize, total } = this.props;
    const pagerCount = 5;
    const activePage = Number(this.state.activePage); // 当前页数
    const totalPage = parseInt((total / pageSize), 0) + (total % pageSize > 0 ? 1 : 0); // 总页数
    const offset = Math.floor(pagerCount / 2); // 左右各显示条数

    let showPrevMore = false; // 更多向前翻页
    let showNextMore = false; // 更多向后翻页

    if (totalPage > pagerCount) {
      if (activePage > pagerCount) showPrevMore = true;
      if (activePage < totalPage - offset) showNextMore = true;
    }

    let items = [];

    // 当前少于缩进页数
    if (pagerCount + 1 >= totalPage) {
      for (let i = 1; i < totalPage + 1; i += 1) {
        items.push(i);
      }
      return items;
    }

    for (let i = 1; i < pagerCount + 1; i += 1) {
      items.push(i);
    }

    items = items.map((item) => {
      if (pagerCount < activePage) {
        item = (activePage - offset - 1) + item;
      }
      if (activePage > totalPage - offset) {
        return item - (offset + (activePage - totalPage));
      }
      return item;
    });

    if (showNextMore && showPrevMore) {
      items.unshift(1, 'prev');
      if ((activePage + offset + 1) !== totalPage) {
        items.push('next', totalPage);
      } else {
        items.push(totalPage);
      }
    } else if (showNextMore && !showPrevMore) {
      if (totalPage === pagerCount + 1) {
        items.push(totalPage);
      } else {
        items.push('next', totalPage);
      }
    } else if (!showNextMore && showPrevMore) {
      items.unshift(1, 'prev');
    }
    return items;
  }
  render() {
    const { prefixCls, className, style, alignment, size, total, pageSize, onChange } = this.props;
    const { activePage, hoverMoreBtn } = this.state;

    const totalPage = total / pageSize; // 总页数
    return (
      <ul
        style={style}
        className={this.classNames(prefixCls, className, {
          [`${prefixCls}-alignment-${alignment}`]: alignment,
          [`${prefixCls}-${size}`]: size,
        })}
      >
        <li
          key="prev"
          onClick={() => this.onPrevOrNext('prev')}
          className={this.classNames(`${prefixCls}-prev`, {
            [`${prefixCls}-disable`]: activePage === 1,
          })}
        />
        {this.getPages().map((item, idx) => {
          if (item === 'next' || item === 'prev') {
            return (
              <li key={idx}
                onMouseEnter={() => this.setState({ hoverMoreBtn: item })}
                onMouseLeave={() => this.setState({ hoverMoreBtn: 'more' })}
                onClick={() => this.onPrevOrNext(`jump-${item}`)}
                className={this.classNames(`${prefixCls}-jump-${item}`)}
              >
                <a>
                  {item === 'next' && hoverMoreBtn === 'next' && <Icon className="arrow" type="d-arrow-right" />}
                  {item === 'prev' && hoverMoreBtn === 'prev' && <Icon className="arrow" type="d-arrow-left" />}
                  {item === 'prev' && hoverMoreBtn === 'next' && <Icon className="arrow" type="more" />}
                  {item === 'next' && hoverMoreBtn === 'prev' && <Icon className="arrow" type="more" />}
                  {(item === 'next' || item === 'prev') && hoverMoreBtn === 'more' && <Icon type="more" />}
                </a>
              </li>
            );
          }
          return (
            <li
              key={idx}
              className={activePage === item ? `${prefixCls}-active` : `${prefixCls}-item`}
              onClick={() => {
                this.setState({ activePage: item });
                onChange && onChange(item, total, pageSize);
              }}
            >
              <a>{item}</a>
            </li>
          );
        })}
        <li
          key="next"
          onClick={() => this.onPrevOrNext('next')}
          className={this.classNames(`${prefixCls}-next`, {
            [`${prefixCls}-disable`]: activePage === totalPage || activePage > totalPage,
          })}
        />
      </ul>
    );
  }
}


Paging.defaultProps = {
  prefixCls: 'w-paging',
  alignment: 'left',
  size: '',
  total: 0, // 数据总数
  pageSize: 10, // 每页条数
  activePage: 1, // 当前页数，选中的页数
  onChange: e => (e),
};
Paging.propTypes = {
  prefixCls: PropTypes.string,
  alignment: PropTypes.oneOf(['left', 'center', 'right']),
  total: PropTypes.number,
  size: PropTypes.string,
  pageSize: PropTypes.number,
  activePage: PropTypes.number,
  onChange: PropTypes.func,
};

