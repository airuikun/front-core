import React from 'react';
import { Component, PropTypes } from '../utils/';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
    };
  }

  // https://facebook.github.io/react/docs/context.html
  // 通过添加 childContextTypes 和 getChildContext()
  // 自动向下传递数据然后在组件树中的任意组件
  // 都能通过定义 contextTypes 访问
  getChildContext() {
    return {
      component: this,
    };
  }
  // 验证数据
  validate(callback) {
    const { fields } = this.state;
    const { model } = this.props;
    let valid = true;

    // 如果需要验证的fields为空，调用验证时立刻返回callback
    if (fields.length === 0 && callback) callback(true);

    fields.forEach((field, idx) => {
      field.validate('', (errors) => {
        if (errors) {
          valid = false;
        }
        if (typeof callback === 'function' && idx + 1 === fields.length) {
          callback(valid, model);
        }
      });
    });
  }

  addField(field) {
    this.state.fields.push(field);
  }

  // 重置字段方法
  resetFields(callback) {
    this.state.fields.forEach((field) => {
      field.resetField();
    });
    callback && callback(this.props.model);
  }

  render() {
    const { prefixCls, className, layout, model, rules, ...other } = this.props;

    return (
      <form
        className={this.classNames(className, `${prefixCls}`, {
        [`${prefixCls}-${layout}`]: layout,
      })}
        {...other}
      >
        {this.props.children}
      </form>
    );
  }
}

Form.childContextTypes = {
  component: PropTypes.any,
};

Form.propTypes = {
  prefixCls: PropTypes.string,
  layout: PropTypes.oneOf(['horizontal', 'vertical', 'inline']),
  model: PropTypes.object,
  rules: PropTypes.object,
};

Form.defaultProps = {
  prefixCls: 'w-form',
  layout: 'horizontal',
};
