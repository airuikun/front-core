import React from 'react';
import { PropTypes } from '../utils/';
import Input from '../input/';

export default class InputPassword extends Input {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  render() {
    const { prefixCls, onIconClick, ...other } = this.props;
    const { toggle } = this.state;
    const cls = this.classNames(prefixCls, {
      isShow: toggle,
    });

    return (
      <Input
        {...other}
        className={cls}
        type={toggle ? 'text' : 'password'}
        onIconClick={() => {
          this.setState({ toggle: !toggle }, onIconClick);
        }}
      />
    );
  }
}

InputPassword.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.string,
};

InputPassword.defaultProps = {
  prefixCls: 'w-input-password',
  icon: 'eye-o',
  value: '',
};
