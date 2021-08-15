import React from 'react';
import AsyncValidator from 'async-validator';
import { Component, PropTypes } from '../utils/';
import Layout from '../layout/';

const { Row, Col } = Layout;

export default class FormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '', // 错误信息
      help: '', // 帮助信息
      isRequired: false, // 是否 【必填】
      validating: false, // 是否验证成功
      valid: false, // 是否有效
      initialValue: null,
    };
    this.oldValue = null;
  }

  setOldValue(value) {
    if (value && value.constructor) {
      switch (value.constructor.name) {
        case 'Array': this.oldValue = [...value]; break;
        case 'Object': this.oldValue = { ...value }; break;
        default: this.oldValue = value;
      }
    } else {
      this.oldValue = value;
    }
  }

  componentDidMount() {
    const { field } = this.props;
    let { isRequired } = this.props;
    if (field) {
      const value = this.getInitialValue();
      this.setOldValue(value);
      this.parent().addField(this);
      // 是否必填处理
      const rules = this.getRules();
      if (rules && rules.length) {
        rules.every((rule) => {
          if (rule && rule.required) isRequired = true;
          return rule;
        });
      }
      this.setState({
        isRequired,
        // help: 11,
        initialValue: value,
      });
    }
  }
  componentWillReceiveProps() {
    const oldValue = this.oldValue;
    const curValue = this.fieldValue();
    // Validating when changing values
    if (JSON.stringify(oldValue) !== JSON.stringify(curValue)) {
      this.setOldValue(curValue);
      this.validate('change');
    }
  }

  getInitialValue() {
    const model = this.parent().props.model;
    return model[this.props.field];
  }
  // 获取 Form组件的 校验规则
  getRules() {
    const formRules = this.parent().props.rules;
    return [].concat(this.props.rules || formRules ? formRules[this.props.field] : [] || []);
  }

  resetField() {
    let { valid, error } = this.state;

    valid = true;
    error = '';

    this.setState({ valid, error });

    const val = this.fieldValue();
    const model = this.parent().props.model;
    if (Array.isArray(val)) {
      model[this.props.field] = this.state.initialValue || [];
    } else {
      model[this.props.field] = this.state.initialValue;
    }
  }

  getFilteredRule() {
    const rules = this.getRules();
    // 过滤数组中的undefined
    return rules.filter((rule) => {
      return rule;
    });
  }

  validate(trigger, cb) {
    let { validating, valid, error } = this.state;
    const rules = this.getFilteredRule();

    if (!rules || rules.length === 0) {
      cb && cb();
      return true;
    }

    validating = true;
    const descriptor = { [this.props.field]: rules };
    const validator = new AsyncValidator(descriptor);
    const model = { [this.props.field]: this.fieldValue() };

    validator.validate(model, { firstFields: true }, (errors) => {
      valid = !errors;
      error = errors ? errors[0].message : '';
      cb && cb(errors);
      validating = false;
    });

    this.setState({ validating, valid, error });
  }

  fieldValue() {
    const model = this.parent().props.model;
    if (!model || !this.props.field) { return; }
    const str = model[this.props.field];
    return str;
  }

  parent() {
    return this.context.component;
  }
  onFieldChange() {
    this.validate('change');
  }

  layoutFilter(col) {
    const { layout } = this.parent().props;
    if (layout === 'vertical' || layout === 'inline') {
      return { span: 0 };
    }
    return col;
  }

  renderLabel() {
    const { label, labelCol, prefixCls } = this.props;
    const labelColClassName = this.classNames(
      `${prefixCls}-label`,
      labelCol && labelCol.className,
    );

    return (
      <Col {...this.layoutFilter(labelCol) } className={labelColClassName}>
        {label && <label className={`${prefixCls}-field`}>{label}</label>}
      </Col>
    );
  }
  renderWrapper() {
    const { prefixCls, wrapperCol, children } = this.props;
    const { error, help } = this.state;

    const className = this.classNames(
      `${prefixCls}-control`,
      wrapperCol && wrapperCol.className,
    );
    return (
      <Col
        {...this.layoutFilter(wrapperCol) }
        className={className}
        onChange={this.onFieldChange.bind(this)}
      >
        {children}
        {
          (error || help) && <div className={this.classNames(`${prefixCls}-explain`)}>{error || help}</div>
        }
      </Col>
    );
  }
  render() {
    const { prefixCls, className, label, field, labelCol, wrapperCol, ...resetProps } = this.props;
    const { isRequired, error, help } = this.state;
    const cls = this.classNames(className, {
      [`${prefixCls}`]: true,
      required: isRequired,
      error: error !== '',
      help: help !== '',
    });
    return (
      <Row className={cls} {...resetProps}>
        {label && this.renderLabel()}
        {this.renderWrapper.bind(this)()}
      </Row>
    );
  }
}

FormItem.contextTypes = {
  component: PropTypes.any,
};

FormItem.propTypes = {
  prefixCls: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelCol: PropTypes.object,
  field: PropTypes.string,
  wrapperCol: PropTypes.object,
  name: PropTypes.string,
};

FormItem.defaultProps = {
  prefixCls: 'w-form-item',
  label: '',
};
