import React from 'react';
import { mount } from 'enzyme';
import { Paging } from '../../../src';

describe('<Paging>', () => {
  const wrapperState = {
    value: 0,
  };
  const wrapper = mount(
    <Paging
      activePage={5}
      total={25}
      onChange={(value) => {
        wrapperState.value = value;
      }}
    />
  );
  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Paging');
    // 默认值测试
    expect(wrapper.find('.w-paging')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Paging);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-paging');
    expect(wrapper.at(0).prop('alignment')).toBe('left');
    expect(wrapper.at(0).prop('size')).toBe('');
    expect(wrapper.at(0).prop('total')).toBe(25);
    expect(wrapper.at(0).prop('pageSize')).toBe(10);
    expect(wrapper.at(0).prop('activePage')).toBe(5);
  });

  it('Test onChange event.', () => {
    const paging = wrapper.find('.w-paging a').at(2);
    paging.simulate('click');
    expect(wrapperState.value).toBe(3);
    expect(paging.html()).toContain('<a>3</a>');
  });
});
