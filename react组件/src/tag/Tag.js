import React from 'react';
import { Component, PropTypes } from '../utils/';
import Icon from '../icon';
import './style/index.less';

export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }
  close = (e) => {
    const { onClose, children } = this.props;
    if (onClose) onClose(e, children);
    if (e.isDefaultPrevented()) return;
    this.setState({
      visible: false,
    });
  }

  isColorValue(color) {
    const span = document.createElement('span');
    span.style.color = color;
    if (span.style.color !== '') return true;
    return false;
  }
  isPresetColor(color) {
    return /^(white|pink|red|yellow|orange|cyan|green|blue|purple)?$/.test(color);
  }
  render() {
    const { prefixCls, color, onClose, className, checked, children, data, ...others } = this.props;
    const { visible } = this.state;
    let colors = '';
    switch (color) {
      case 'default': colors = 'white'; break;
      case 'error': colors = 'red'; break;
      case 'warn': colors = 'orange'; break;
      case 'success': colors = 'green'; break;
      case 'info': colors = 'blue'; break;
      default: colors = color; break;
    }
    const cls = this.classNames(prefixCls, className, checked, {
      [`${prefixCls}-${colors}`]: this.isPresetColor(colors) && color,
      checkable: checked === false,
    });

    // 自定义颜色值
    const styles = {};
    if (!this.isPresetColor(colors) && this.isColorValue(colors)) {
      styles.backgroundColor = colors;
    }

    return visible ? (
      <span {...others} style={styles} className={cls}>
        {children}
        {(onClose && checked !== true && checked !== false) &&
          <Icon type="close"
            className={this.classNames({
              [`${prefixCls}-icon-close`]: onClose,
            })}
            onClick={this.close}
          />
        }
      </span>
    ) : null;
  }
}

Tag.propTypes = {
  prefixCls: PropTypes.string,
  color: PropTypes.string,
  checked: PropTypes.bool,
  onClose: PropTypes.func,
};
Tag.defaultProps = {
  color: 'default',
  prefixCls: 'w-tag',
};
