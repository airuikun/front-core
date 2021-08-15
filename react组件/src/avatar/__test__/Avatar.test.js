import React from 'react';
import { mount } from 'enzyme';
import Avatar from '../';

describe('<Avatar>', () => {
  const Component = mount(<Avatar />);

  it('The name of module must be Avatar', () => {
    expect(Component.name()).toBe('Avatar');
  });

  it('The type of props "type" should be string', () => {
    Component.setProps({ icon: 'user' });
    expect(typeof Component.prop('icon')).toEqual('string');
  });

  it('The type of props "type" should be "Element"', () => {
    Component.setProps({ icon: <div>This is a Dom Element</div> });
    expect(Component.prop('icon').type).toEqual('div');
  });

  it('The value of props "size" must be one of ["large", "default", "small"]', () => {
    expect(['large', 'default', 'small']).toContain(Component.prop('size'));
  });

  it('The value of props "shape" must be one of ["square","circle"]', () => {
    expect(['square', 'circle']).toContain(Component.prop('shape'));
  });
});
