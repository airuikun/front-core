import React from 'react';
import { mount } from 'enzyme';
import { InputNumber } from '../../../src';

describe('<InputNumber>', () => {
  const wrapperState = {
    value: 0,
  };
  const wrapper = mount(<InputNumber
    onChange={(e, value) => {
      wrapperState.value = value;
    }}
  />);

  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('InputNumber');
    // 默认值测试
    expect(wrapper.find('.w-input-number')).toHaveLength(1);
    expect(wrapper.type()).toEqual(InputNumber);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-input-number');
    expect(wrapper.at(0).prop('step')).toBe(1);
    expect(wrapper.find('.w-input').type()).toBe('div');
  });

  it('Test onChange attributes.', () => {
    wrapper.setProps({ step: 2 });
    const push = wrapper.find('.w-input-number-push').at(0);
    push.simulate('click');
    expect(wrapperState.value).toBe(2);
    expect(push.html()).toContain('<div class="w-input-number-push"><i class="w-icon-arrow-up"></i></div>');
  });
});
