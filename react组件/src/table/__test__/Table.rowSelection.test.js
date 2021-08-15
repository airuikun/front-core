import React from 'react';
import { mount } from 'enzyme';
import { Table } from '../../../src';

describe('Table.rowSelection', () => {
  const wrapperState = {
    value: 0,
  };

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }];

  const data = [
    { key: 0, name: 'Jack' },
    { key: 1, name: 'Lucy' },
    { key: 2, name: 'Tom' },
    { key: 3, name: 'Jerry' },
  ];

  function createTable(props = {}) {
    return (
      <Table
        columns={columns}
        data={data}
        rowSelection={{
          onSelect: (row, index) => {
            wrapperState.value = index;
          },
        }}
        {...props}
      />
    );
  }

  it('select by checkbox', () => {
    const wrapper = mount(createTable());
    const checkboxes = wrapper.find('input');
    const checkboxAll = checkboxes.last();
    checkboxAll.simulate('change', { target: { checked: true } });
    expect(wrapperState.value).toEqual(3);
  });
});

