import React from 'react';
import { mount } from 'enzyme';
import Badge from '../';

describe('<Badge>', () => {
  const Component = mount(<Badge />);

  it('The name of module must be "Badge"', () => {
    expect(Component.name()).toBe('Badge');
  });
});
