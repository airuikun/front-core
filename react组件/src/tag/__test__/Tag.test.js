import React from 'react';
import { mount } from 'enzyme';
import { Tag } from '../../../src';

const TagGroup = Tag.Group;

describe('<Tag>', () => {
  const wrapper = mount(<Tag color="pink" />);
  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Tag');
    // 默认值测试
    expect(wrapper.find('.w-tag')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Tag);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-tag');
    expect(wrapper.at(0).prop('color')).toBe('pink');
  });

  it('Test value attributes.', () => {
    wrapper.setProps({ color: 'red' });
    expect(wrapper.find('.w-tag').at(0).prop('className')).toBe('w-tag w-tag-red');
    wrapper.setProps({ color: 'default' });
    expect(wrapper.find('.w-tag').at(0).prop('className')).toBe('w-tag w-tag-white');
  });
});

describe('<Tag.Group>', () => {
  const plainOptions = [
    { color: 'purple', value: '苹果', label: '苹果1' },
    { color: 'orange', value: '橘子', label: '橘子2' },
    { color: 'green', value: '香蕉', label: '香蕉3' },
  ];
  const wrapperState = {
    value: ['香蕉'],
  };
  const checked = true;
  const isRadio = true;
  const wrapper1 = mount(
    <TagGroup
      options={plainOptions}
      checked={checked}
      isRadio={isRadio}
      checkedValues={wrapperState.value}
      onChange={(e, value) => {
        wrapperState.value = value;
      }}
    />);
  it('Test onChange func', () => {
    expect(wrapper1.name()).toBe('TagGroup');
    // 默认值测试
    expect(wrapper1.find('.w-tag-group')).toHaveLength(1);
    expect(wrapper1.type()).toEqual(TagGroup);
    expect(wrapper1.at(0).prop('prefixCls')).toBe('w-tag-group');
    expect(wrapper1.at(0).prop('checkedValues')[0]).toBe('香蕉');
  });

  it('Test onChange event.', () => {
    const T = wrapper1.find('.w-tag').at(1);
    T.simulate('click');
    expect(wrapperState.value[0]).toBe('橘子');
    expect(T.html()).toContain('<span class="w-tag w-tag-orange checkable">橘子2</span>');
  });
});
