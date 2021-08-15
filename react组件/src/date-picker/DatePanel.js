import React from 'react';
import { Component } from '../utils/';
import Transition from '../transition';
import Popper from '../popper/';
import DatePanelBody from './DatePanelBody';

export default class DatePanel extends Component {
  render() {
    const { visible, prefixCls, handleClickOutside, ...resetProps } = this.props;
    return (
      <Transition in={visible} sequence="fadeIn">
        <Popper
          className={this.classNames(`${prefixCls}-popper`)}
          clickOutside={handleClickOutside}
        >
          <DatePanelBody {...resetProps} />
        </Popper>
      </Transition>
    );
  }
}
