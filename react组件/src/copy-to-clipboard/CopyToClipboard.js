import React from 'react';
import { Component, PropTypes } from '../utils/';
import Tooltip from '../tooltip';

function copyTextToClipboard(text, cb) {
  const textArea = document.createElement('textarea');
  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //
  // Place in top-left corner of screen regardless of scroll position.

  textArea.style = {
    position: 'fixed',
    top: '-100px',
    left: 0,
    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    width: '2em',
    height: '2em',
    // We don't need padding, reducing the size if it does flash render.
    padding: 0,
    // Clean up any borders.
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    // Avoid flash of white box if rendered for any reason.
    background: 'transparent',
  };
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    const isCopy = !!successful;
    cb && cb(isCopy);
  } catch (err) {
    // console.log('Oops, unable to copy');
  }
  document.body.removeChild(textArea);
}

export default class CopyToClipboard extends Component {
  onClick(e) {
    const { onClick, text } = this.props;
    copyTextToClipboard(text, (isCopy) => {
      onClick(text, isCopy, e);
    });
  }
  render() {
    const { prefixCls, text, tooltip, children, leaveDelay, ...resetProps } = this.props;
    const concatProps = {
      ...resetProps,
      ...{
        onClick: this.onClick.bind(this),
        className: `${prefixCls}`,
      },
    };
    return (
      <a {...concatProps}>
        <Tooltip {...{ content: tooltip, trigger: 'click', leaveDelay: leaveDelay || 1000 }}>
          <span className={`${prefixCls}-select`}>{text}</span>
          {children}
        </Tooltip>
      </a>
    );
  }
}
CopyToClipboard.propTypes = {
  prefixCls: PropTypes.string,
  text: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  leaveDelay: PropTypes.number,
};

CopyToClipboard.defaultProps = {
  prefixCls: 'w-copy-to-clipboard',
  tooltip: '复制成功！',
  onClick() { },
};
