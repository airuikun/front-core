import React from 'react';
import { mount } from 'enzyme';
import { Rate } from '../../../src';

describe('<Rate>', () => {
  const warpperState = {
    value: 0,
    hoverValue: 0,
  };
  const wrapper = mount(<Rate
    onHoverChange={(e, value) => {
      warpperState.hoverValue = value;
    }}
    onChange={(e, value) => {
      warpperState.value = value;
    }}
  />);
  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Rate');
    // 默认值测试
    expect(wrapper.find('.w-rate')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Rate);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-rate');
    expect(wrapper.at(0).prop('disabled')).toBe(false);
    expect(wrapper.at(0).prop('count')).toBe(5);
    expect(wrapper.at(0).prop('value')).toBe(0);
    expect(wrapper.at(0).prop('allowHalf')).toBe(false);
    expect(wrapper.find('.w-rate li').at(0).prop('className')).toBe('');
    expect(wrapper.find('.w-rate').type()).toBe('ul');
  });
  it('Test value attributes.', () => {
    wrapper.setProps({ value: 2 });
    expect(wrapper.find('.w-rate li').at(0).prop('className')).toBe('');
    expect(wrapper.find('.w-rate li').at(1).prop('className')).toBe('');
    expect(wrapper.find('.w-rate li').at(2).prop('className')).toBe('');
  });
  it('Test disabled attributes', () => {
    wrapper.setProps({ disabled: true });
    expect(wrapper.find('.w-rate li').at(0).prop('className')).toBe('w-disabled');
    expect(wrapper.find('.w-rate li').at(1).prop('className')).toBe('w-disabled');
    expect(wrapper.find('.w-rate li').at(2).prop('className')).toBe('w-disabled');
  });

  it('Test onChange event.', () => {
    wrapper.setProps({ disabled: false });
    const rate2 = wrapper.find('.w-rate li').at(3);
    rate2.simulate('click');
    expect(warpperState.value).toBe(4);
    expect(rate2.html()).toContain('<li class=""><div class="w-rate-hight star-on"><i class="w-icon-star-on"></i></div><div class="w-rate-bg"><i class="w-icon-star-on"></i></div></li>');
  });
  it('Test count attributes.', () => {
    wrapper.setProps({ count: 2 });
    expect(wrapper.find('.w-rate li').at(0).prop('className')).toBe('');
    expect(wrapper.find('.w-rate li').at(1).prop('className')).toBe('');
    wrapper.setProps({ count: 5 });
    expect(wrapper.find('.w-rate li').at(4).prop('className')).toBe('');
    expect(wrapper.find('.w-rate li').at(5).length).toBe(0);
  });
  it('Test color attributes.', () => {
    wrapper.setProps({ value: 5, color: 'rgb(216, 0, 0)' });
    expect(wrapper.find('.w-rate li').at(0).find('i').at(1)
      .html()).toContain('<i class="w-icon-star-on"></i>');
  });

  it('Test onHoverChange event.', () => {
    const rate2 = wrapper.find('.w-rate li').at(3);
    rate2.simulate('mousemove');
    expect(warpperState.hoverValue).toBe(4);
    expect(rate2.at(0).find('i').at(1).html()).toContain('<i class="w-icon-star-on"></i>');
  });
});
