import React from 'react';
import { mount } from 'enzyme';
import { Loading } from '../../../src';


describe('<Loading>', () => {
  const wrapper = mount(<Loading />);

  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Loading');
    // 默认值测试
    expect(wrapper.find('.w-loading')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Loading);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-loading');
    expect(wrapper.at(0).prop('loading')).toBe(true);
    expect(wrapper.at(0).prop('size')).toBe('default');
  });

  it('Test size attributes.', () => {
    wrapper.setProps({ size: 'large' });
    expect(wrapper.find('.w-loading').at(0).prop('className')).toBe('w-loading w-loading-large');
  });

  it('Test tip attributes.', () => {
    wrapper.setProps({ tip: '正在哈哈哈' });
    const loading = wrapper.find('.w-loading').at(0);
    expect(loading.html()).toContain('<div class="w-loading w-loading-large"><div class="w-loading-tips"><div class="w-loading-tips-nested"><div class="w-loading-icon"></div>正在哈哈哈</div></div></div>');
  });
});
