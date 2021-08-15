import React from 'react';
import { mount } from 'enzyme';
import { Menu } from '../../../src';


describe('<Menu>', () => {
  const wrapperState = {
    index: 0,
  };
  const wrapper = mount(
    <Menu
      onSelect={(index) => {
        wrapperState.index = index;
      }}
    >
      <Menu.Item index="1">聚划算</Menu.Item>
      <Menu.Item index="2">天猫超市</Menu.Item>
      <Menu.Item disabled index="3">淘抢购</Menu.Item>
    </Menu>
  );

  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Menu');
    // 默认值测试
    expect(wrapper.find('.w-menu')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Menu);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-menu');
    expect(wrapper.at(0).prop('mode')).toBe('vertical');
  });

  it('Test mode attributes.', () => {
    wrapper.setProps({ mode: 'vertical' });
    expect(wrapper.find('.w-menu').at(0).prop('className')).toBe('w-menu w-menu-vertical w-menu-light');
  });

  it('Test onSelect event.', () => {
    const menu = wrapper.find('.w-menu li').at(1);
    menu.simulate('click');
    expect(wrapperState.index).toBe('2');
    expect(menu.html()).toContain('<li class="w-menu-item active">天猫超市</li>');
  });
});
