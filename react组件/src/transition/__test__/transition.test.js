import React from 'react';
import { mount } from 'enzyme';
import { Transition } from '../../../src';

describe('<Transition>', () => {
  const wrapperState = {
    show: true,
    value: 'fadeIn down',
  };
  const wrapper = mount(
    <Transition
      in={wrapperState.show}
      sequence={wrapperState.value}
    >
      <div>向下淡进向上淡出</div>
    </Transition>
  );
  it('Test default porps and node.', () => {
    expect(wrapper.find('.w-animate')).toHaveLength(2);
    expect(wrapper.type()).toEqual(Transition);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-animate');
    expect(wrapper.at(0).prop('unmountOnExit')).toBe(true);
    expect(wrapper.at(0).prop('animateOnMount')).toBe(true);
    expect(wrapper.at(0).prop('duration')).toBe(200);
    expect(wrapper.at(0).prop('wait')).toBe(200);
    expect(wrapper.find('.w-animate').at(0).html()).toContain('<div class="w-animate is-fadeIn is-down is-mounting">向下淡进向上淡出</div>');
  });
});
