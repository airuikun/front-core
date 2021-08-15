import React from 'react';
import { mount } from 'enzyme';
import { Slider } from '../../../src';

describe('<Slider>', () => {
  const wrapperState = {
    value: 20,
  };
  const wrapper = mount(<Slider
    value={wrapperState.value}
    onChange={() => {
      wrapperState.value = 90;
    }}
  />);
  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Slider');
    // 默认值测试
    expect(wrapper.find('.w-slider')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Slider);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-slider');
    expect(wrapper.at(0).prop('value')).toBe(20);
    expect(wrapper.at(0).prop('max')).toBe(100);
    expect(wrapper.at(0).prop('min')).toBe(0);
    expect(wrapper.at(0).prop('step')).toBe(1);
    expect(wrapper.at(0).prop('dots')).toBe(false);
    expect(wrapper.at(0).prop('tooltip')).toBe(true);
    expect(wrapper.at(0).prop('disabled')).toBe(false);
    expect(wrapper.at(0).prop('vertical')).toBe(false);
  });

  it('Test onChange attributes.', () => {
    const slider = wrapper.find('.w-slider').at(0);
    slider.simulate('click');
    expect(wrapperState.value).toBe(90);
  });
});
