import React from 'react';
import { mount } from 'enzyme';
import { Select } from '../../../src';

describe('<Select>', () => {
  const wrapperState = {
    value: 0,
  };
  const options = [
    { value: '选项1', label: '红葡萄酒' },
    { value: '选项2', label: '绍兴黄酒', disabled: true },
  ];
  const value1 = '选项1';
  const wrapper = mount(
    <Select
      onChange={() => {
        wrapperState.value = 7;
      }}
      value={value1}
    >
      {
        options.map((elm) => {
          return <Select.Option key={elm.value} label={elm.label} value={elm.value} disabled={elm.disabled} />;
        })
      }
    </Select>);

  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Select');
    // 默认值测试
    expect(wrapper.find('.w-select')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Select);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-select');
    expect(wrapper.at(0).prop('disabled')).toBe(false);
  });

  it('Test name prop', () => {
    wrapper.setProps({ name: 'selecthaha' });
    expect(wrapper.at(0).prop('name')).toBe('selecthaha');
  });

  it('Test placeholder prop', () => {
    wrapper.setProps({ placeholder: '默认值' });
    expect(wrapper.at(0).prop('placeholder')).toBe('默认值');
  });

  it('Test onChange func', () => {
    const select = wrapper.find('.w-select').at(0).find('input').at(0);
    select.simulate('change');
    expect(wrapperState.value).toBe(7);
  });
});
