import React from 'react';
import { mount } from 'enzyme';
import { TimePicker } from '../../../src';

describe('<TimePicker>', () => {
  const wrapper = mount(
    <TimePicker
      onChange={() => {

      }}
      disabledHours={['00', '01']}
      disabledMinutes={['01', '02']}
      disabled
      format="HH:mm:ss"
      placeholder="选择时间de拉！"
      value={new Date(2017, 6, 28, 15, 51)}
    />
  );

  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('TimePicker');
    // 默认值测试
    expect(wrapper.type()).toEqual(TimePicker);
  });
});
