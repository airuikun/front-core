import React from 'react';
import { mount } from 'enzyme';
import Button from '../';

describe('<Button>', () => {
  const Component = mount(<Button icon="arrow-down"> Normal</Button >);

  it('The name of module must be "Button"', () => {
    expect(Component.name()).toBe('Button');
  });

  it('The props size should be one of ["large","default","small","mini"]', () => {
    expect(['large', 'default', 'small', 'mini']).toContain(Component.prop('size'));
  });

  it('The props type should be one of ["default", "primary", "success", "info", "warn", "error", "danger", "link"]', () => {
    expect(['default', 'primary', 'success', 'info', 'warn', 'error', 'danger', 'link']).toContain(Component.prop('type'));
  });

  it('The props htmlType should be one of ["submit","reset","button"]', () => {
    expect(['submit', 'reset', 'button']).toContain(Component.prop('htmlType'));
  });

  it('Should an `icon` can be found in button', () => {
    expect(Component.find('.w-icon-arrow-down')).toHaveLength(1);
  });

  it('Should class `block` can be found in button', () => {
    Component.setProps({ block: true });
    expect(Component.find('button.w-btn').hasClass('block')).toBe(true);
    Component.setProps({ block: false });
  });

  it('Button can\'t be Click when props disabled or loading is true', () => {
    let shouldBeFalse = false;
    Component.setProps({
      disabled: true,
      onClick: () => {
        shouldBeFalse = true;
      },
    });
    expect(Component.prop('disabled')).toBe(true);
    Component.find('button').simulate('click');
    expect(shouldBeFalse).toBe(false);

    Component.setProps({
      disabled: false,
      loading: true,
    });
    Component.find('button').simulate('click');
    expect(shouldBeFalse).toBe(false);
  });
});
