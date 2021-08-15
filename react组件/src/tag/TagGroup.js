import React from 'react';
import { Component, PropTypes } from '../utils/';
import Tag from './Tag';
import './style/tag-group.less';

export default class TagGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicTags: props.options,
    };
  }
  getChildContext() {
    return { component: this };
  }
  onFieldChange = (e) => { this.getValue(e); }
  getValue(e) {
    const { options, onChange } = this.props;
    onChange(e, this.getFilteredTags(options));
  }
  getFilteredTags = (tags) => {
    return tags.map((tag) => {
      return typeof (tag) === 'object' ? tag.value : tag;
    });
  }
  handleClose(tag, e) {
    const { onChange } = this.props;
    const { dynamicTags } = this.state;
    dynamicTags.splice(dynamicTags.indexOf(tag), 1);

    this.setState({ dynamicTags }, () => {
      onChange(e, this.getFilteredTags(dynamicTags));
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      this.setState({ dynamicTags: nextProps.options });
    }
  }

  onClickTag(data, checked, e) {
    const { options, onChange, isRadio, checkedValues } = this.props;
    const checkedValue = options.map((item) => {
      return item.value;
    }).filter((value) => {
      if (isRadio) {
        return value === data.value;
      }
      let checkeds = checkedValues;
      if (checkeds.indexOf(value) < 0 && value === data.value) {
        checkeds.push(value);
      } else if (checked && checkeds.indexOf(value) > -1) {
        checkeds = checkeds.filter((val) => { return val !== data.value; });
      }
      return checkeds.indexOf(value) > -1;
    });
    onChange(e, checkedValue);
  }
  render() {
    const { prefixCls, children, options, isRadio, checkedValues, onChange, checked, className, ...other } = this.props;
    const cls = this.classNames(`${prefixCls}`, className);
    return (
      <div className={cls} {...other}>
        {options.map((item, idx) => {
          const data = typeof item === 'string' ? { value: item, label: item } : item;
          const prop = {
            data,
            color: item.color ? item.color : 'default',
          };
          if (checked === false || checked === true) {
            prop.checked = checkedValues.indexOf(data.value) > -1;
          }
          return (
            <Tag {...prop} key={idx} onClose={this.handleClose.bind(this, item)} onClick={this.onClickTag.bind(this, item, prop.checked)}>{prop.data.label || prop.data.value}</Tag>
          );
        })}
        {children &&
          <div
            className={this.classNames(`${prefixCls}-children`)}
            onBlur={this.onFieldChange}
            onKeyUp={this.onFieldChange}
          >
            {children}
          </div>
        }
      </div>
    );
  }
}

TagGroup.childContextTypes = {
  component: PropTypes.any,
};

TagGroup.propTypes = {
  prefixCls: PropTypes.string,
  options: PropTypes.array,
  checked: PropTypes.bool,
  isRadio: PropTypes.bool,
  checkedValues: PropTypes.array,
  onChange: PropTypes.func,
};

TagGroup.defaultProps = {
  prefixCls: 'w-tag-group',
  checkedValues: [],
  onChange: v => (v),
};
