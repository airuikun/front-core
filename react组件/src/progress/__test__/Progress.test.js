import React from 'react';
import { mount } from 'enzyme';
import { Progress } from '../../../src';

describe('<Progress>', () => {
  const wrapper = mount(<Progress />);
  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Progress');
    // 默认值测试
    expect(wrapper.find('.w-progress')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Progress);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-progress');
    expect(wrapper.at(0).prop('showText')).toBe(true);
    expect(wrapper.at(0).prop('percent')).toBe(0);
    expect(wrapper.at(0).prop('width')).toBe(126);
    expect(wrapper.at(0).prop('strokeWidth')).toBe(6);
    expect(wrapper.at(0).prop('type')).toBe('line');
    expect(wrapper.find('.w-progress').at(0).prop('className')).toBe('w-progress w-progress-line w-progress-show-text');
  });

  it('Test type attributes.', () => {
    wrapper.setProps({ type: 'circle' });
    expect(wrapper.find('.w-progress').at(0).prop('className')).toBe('w-progress w-progress-circle w-progress-show-text');
  });

  it('Test status attributes.', () => {
    wrapper.setProps({ status: 'active' });
    expect(wrapper.find('.w-progress').at(0).prop('className')).toBe('w-progress w-progress-circle w-progress-show-text w-progress-status-active');
    wrapper.setProps({ status: 'exception' });
    expect(wrapper.find('.w-progress').at(0).prop('className')).toBe('w-progress w-progress-circle w-progress-show-text w-progress-status-exception');
    wrapper.setProps({ status: 'success' });
    expect(wrapper.find('.w-progress').at(0).prop('className')).toBe('w-progress w-progress-circle w-progress-show-text');
  });
});
