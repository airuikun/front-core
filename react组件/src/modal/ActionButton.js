import React from 'react';
import { Component, findDOMNode } from '../utils/';
import Button from '../button';

export default class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {
    // 焦点自动定位到按钮上面
    if (this.props.autoFocus) {
      const $this = findDOMNode(this);
      this.timeoutId = setTimeout(() => $this.focus());
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
  onClick(...args) {
    const { onOk, closeModals } = this.props;
    if (!onOk) return closeModals('ok', ...args);

    let ret;
    if (onOk.length) ret = onOk(closeModals);

    ret = onOk();
    if (!ret) closeModals();

    if (ret && ret.then) {
      this.setState({ loading: true });
      ret.then((...argsRet) => {
        closeModals(...argsRet);
      });
    }
  }
  render() {
    const { type, size, children } = this.props;
    const loading = this.state.loading;
    return (
      <Button type={type} size={size} onClick={this.onClick.bind(this)} loading={loading}>
        {children}
      </Button>
    );
  }
}
