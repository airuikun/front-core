import React from 'react';
import { mount } from 'enzyme';
import Breadcrumb from '../';


describe('<Breadcrumb>', () => {
  const Component = mount(
    <Breadcrumb>
      <Breadcrumb.Item href="https://uiw-react.github.io">首页</Breadcrumb.Item>
      <Breadcrumb.Item separator="#">活动管理</Breadcrumb.Item>
      <Breadcrumb.Item>活动列表</Breadcrumb.Item>
      <Breadcrumb.Item>活动详情</Breadcrumb.Item>
    </Breadcrumb>
  );

  it('The name of module must be "Breadcrumb"', () => {
    expect(Component.name()).toBe('Breadcrumb');
  });

  it('The length of breadcrumb item should be 4', () => {
    expect(Component.find('.w-breadcrumb-item')).toHaveLength(4);
  });

  it('The separator should be charactor "@"', () => {
    Component.setProps({ separator: '@' });
    expect(Component.find('.w-breadcrumb-item-separator').at(0).text()).toBe('@');
  });

  it('The item separator should be charactor "#"', () => {
    expect(Component.find('.w-breadcrumb-item-separator').at(1).text()).toBe('#');
  });

  it('The href of item first should be "https://uiw-react.github.io"', () => {
    expect(Component.find('.w-breadcrumb-item a').prop('href')).toEqual('https://uiw-react.github.io');
  });
});
