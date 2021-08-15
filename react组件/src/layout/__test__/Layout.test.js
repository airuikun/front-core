import React from 'react';
import { mount } from 'enzyme';
import { Layout } from '../../../src';

const { Row, Col } = Layout;

describe('<Row>', () => {
  const wrapper = mount(<Row />);

  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Row');
    // 默认值测试
    expect(wrapper.find('.w-row')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Row);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-row');
  });

  it('Test tag attributes', () => {
    wrapper.setProps({ tag: 'div' });
    expect(wrapper.at(0).html()).toContain('<div class="w-row"></div>');
  });

  it('Test type attributes', () => {
    wrapper.setProps({ type: 'flex' });
    expect(wrapper.at(0).html()).toContain('<div class="w-row-flex"></div>');
  });

  it('Test justify attributes', () => {
    wrapper.setProps({ type: 'flex', justify: 'center' });
    expect(wrapper.at(0).html()).toContain('<div class="w-row-flex w-row-justify-center"></div>');
    wrapper.setProps({ type: 'flex', justify: 'start' });
    expect(wrapper.at(0).html()).toContain('<div class="w-row-flex w-row-justify-start"></div>');
  });

  it('Test align attributes', () => {
    wrapper.setProps({ type: 'flex', align: 'middle', justify: null });
    expect(wrapper.at(0).html()).toContain('<div class="w-row-flex w-row-align-middle"></div>');
    wrapper.setProps({ type: 'flex', align: 'baseline' });
    expect(wrapper.at(0).html()).toContain('<div class="w-row-flex w-row-align-baseline"></div>');
  });
});
describe('<Col>', () => {
  const wrapper = mount(<Col />);

  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Col');
    // 默认值测试
    expect(wrapper.find('.w-col')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Col);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-col');
  });

  it('Test tag attributes', () => {
    wrapper.setProps({ tag: 'div' });
    expect(wrapper.at(0).html()).toContain('<div class="w-col w-col-24"></div>');
  });

  it('Test span attributes', () => {
    wrapper.setProps({ span: '20' });
    expect(wrapper.at(0).html()).toContain('<div class="w-col w-col-20"></div>');
  });

  it('Test xs attributes', () => {
    wrapper.setProps({ span: 24, xs: '6' });
    expect(wrapper.at(0).html()).toContain('<div class="w-col w-col-24 w-col-xs-6"></div>');
  });

  it('Test sm attributes', () => {
    wrapper.setProps({ xs: '', sm: '8' });
    expect(wrapper.at(0).html()).toContain('<div class="w-col w-col-24 w-col-sm-8"></div>');
  });
  it('Test sm attributes', () => {
    wrapper.setProps({ sm: '', md: '10' });
    expect(wrapper.at(0).html()).toContain('<div class="w-col w-col-24 w-col-md-10"></div>');
  });
  it('Test lg attributes', () => {
    wrapper.setProps({ md: '', lg: '2' });
    expect(wrapper.at(0).html()).toContain('<div class="w-col w-col-24 w-col-lg-2"></div>');
  });
});
