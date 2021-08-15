import React from 'react';
import { mount } from 'enzyme';
import { Radio } from '../../../src';

describe('<Radio>', () => {
  const warpperState = {
    value: 0,
  };
  const wrapper = mount(
    <Radio
      onChange={(e, value) => {
        warpperState.value = value;
      }}
    >label
    </Radio>);
  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Radio');
    expect(wrapper.type()).toEqual(Radio);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-radio');
    expect(wrapper.at(0).prop('disabled')).toBe(false);
    expect(wrapper.at(0).prop('checked')).toBe(false);
    expect(wrapper.at(0).prop('value')).toBe('');
  });

  it('Test value and checked and disabled attributes.', () => {
    wrapper.setProps({ value: '1212', checked: true, disabled: true });
    expect(wrapper.find('input').at(0).getDOMNode().checked).toBe(true);
    expect(wrapper.find('input').at(0).getDOMNode().disabled).toEqual(true);
    expect(wrapper.find('input').at(0).getDOMNode().value).toBe('1212');
  });
});
