import React from 'react';
import { mount } from 'enzyme';
import Checkbox from '../';

// eslint-disable-next-line
const onChange = jest.fn((e, checked) => { });

describe('<Checkbox>', () => {
  const C = mount(
    <Checkbox onChange={onChange}>未选中</Checkbox>
  );

  it('The name of module must be "Checkbox"', () => {
    expect(C.name()).toBe('Checkbox');
  });

  it('Should value to be true when checked', () => {
    C.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).toHaveBeenCalled();
  });
});
