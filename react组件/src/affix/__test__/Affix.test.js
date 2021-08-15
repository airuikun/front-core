import React from 'react';
import { mount } from 'enzyme';
import Affix from '../';


describe('<Affix>', () => {
  const Component = mount(<Affix />);

  it('The name of module must be "Affix"', () => {
    expect(Component.name()).toBe('Affix');
  });

  it('The default performance should be fixed at top 0', () => {
    Component.setState({ position: 'fixed', top: 0 });
    expect(Component.state().position).toBe('fixed');
    expect(Component.state().top).toEqual(0);
    Component.setState({ position: null, top: null });
  });
});
