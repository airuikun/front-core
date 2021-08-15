import React from 'react';
import { mount } from 'enzyme';
import { Timestamp } from '../../../src';

describe('<Timestamp>', () => {
  const wrapper = mount(<Timestamp
    value="Sat Jun 23 2018 17:13:01 GMT+0800"
    tzc={8}
  />);
  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Timestamp');
    // 默认值测试
    expect(wrapper.find('.w-timestamp')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Timestamp);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-timestamp');
    expect(wrapper.at(0).prop('format')).toBe('Y-m-d h:i:s');
    expect(wrapper.at(0).prop('tzc')).toBe(8);
    expect(wrapper.html()).toContain('<span class="w-timestamp" interval="1000">2018-06-23 05:13:01</span>');
  });
});
