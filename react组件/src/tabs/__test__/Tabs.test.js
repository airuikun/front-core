import React from 'react';
import { mount } from 'enzyme';
import { Tabs } from '../../../src';

describe('<Tabs>', () => {
  const wrapperState = {
    value: 0,
  };
  const wrapper = mount(
    <Tabs
      activeKey="2"
      onTabClick={(tab, key) => {
        wrapperState.value = key;
      }}
    >
      <Tabs.Pane label="用户管理" key="1">用户管理</Tabs.Pane>
      <Tabs.Pane label="配置管理" disabled key="2">配置管理</Tabs.Pane>
      <Tabs.Pane sequence="fadeIn up" label="角色管理" key="3">角色管理</Tabs.Pane>
      <Tabs.Pane label="大爷欢乐多" key="4"><div>大爷欢乐多</div><div>大爷欢乐多</div></Tabs.Pane>
    </Tabs>);
  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Tabs');
    // 默认值测试
    expect(wrapper.find('.w-tabs')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Tabs);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-tabs');
    expect(wrapper.at(0).prop('sequence')).toBe('fadeIn');
    expect(wrapper.at(0).prop('type')).toBe('line');
    expect(wrapper.at(0).prop('disabled')).toBe(false);
    expect(wrapper.at(0).prop('closable')).toBe(false);
    expect(wrapper.at(0).prop('position')).toBe('top');
    expect(wrapper.find('.w-active').at(0).html()).toContain('<div class="w-animate is-mounting w-tabs-tab w-disabled w-active">配置管理</div>');
  });

  it('Test onTabClick event.', () => {
    const T = wrapper.find('.w-tabs-tab').at(2);
    T.simulate('click');
    expect(wrapperState.value).toBe('3');
    expect(wrapper.find('.w-active').at(0).html()).toContain('<div class="w-animate is-mounting w-tabs-tab w-active">角色管理</div>');
  });
});
