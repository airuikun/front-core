import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Colgroup extends Component {
  state = {}
  getColCount(columns, arrs) {
    let arr = arrs || [];
    for (let i = 0; i < columns.length; i += 1) {
      if (columns[i].children) {
        arr = this.getColCount(columns[i].children, arr);
      } else {
        arr.push({ key: columns[i].key, width: columns[i].width });
      }
    }
    return arr;
  }
  renderCol(columns) {
    const arrs = this.getColCount(columns);
    const colelm = [];
    for (let i = 0; i < arrs.length; i += 1) {
      const attri = {};
      if (arrs[i].width) attri.width = arrs[i].width;
      colelm.push(<col key={i} {...attri} />);
    }
    return colelm;
  }
  render() {
    const { columns } = this.props;
    return (
      <colgroup>
        {this.renderCol(columns)}
      </colgroup>
    );
  }
}

Colgroup.defaultProps = {
};
Colgroup.propTypes = {
  columns: PropTypes.array,
};
