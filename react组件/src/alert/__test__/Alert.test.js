import React from 'react';
import { mount } from 'enzyme';
import Alert from '../';

describe('<Alert>', () => {
  const Component = mount(<Alert
    onClose={() => {
      // console.log('trigger event onClose');
    }}
    message="Error Text"
    description="Error Description"
    type="warning"
  />);
  it('The name of module must be "Alert"', () => {
    expect(Component.name()).toBe('Alert');
  });
  it('The props of type should only be one of ["success", "info", "warning", "error", "default"]', () => {
    expect(['success', 'info', 'warning', 'error', 'default']).toContain(Component.prop('type'));
    // useless
    // Component.setProps({ type: 'urgent' });
    // expect(['success', 'info', 'warning', 'error', 'default']).not.toContain(Component.prop('type'));
  });
  it('Invalid type of props "type",expected string', () => {
    expect(typeof (Component.prop('type'))).toBe('string');
  });
  // TODO how to trigger click event
});
