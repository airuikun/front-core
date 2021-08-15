import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { Table, Button } from '../../../src';

describe('<Table>', () => {
  const wrapper = mount(<Table />);
  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Table');
    // 默认值测试
    expect(wrapper.find('.w-table')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Table);
    expect(wrapper.at(0).prop('size')).toBe('default');
    expect(wrapper.at(0).prop('data').length).toEqual(0);
    expect(wrapper.at(0).prop('columns').length).toEqual(0);
  });

  it('renders JSX correctly', () => {
    const data = [{
      key: '1',
      firstName: '小',
      lastName: '张',
      age: 32,
    }, {
      key: '2',
      firstName: '大',
      lastName: '张',
      age: 42,
    }];
    const wrapper1 = render(
      <Table data={data}>
        <Button>测试按钮</Button>
      </Table>
    );
    expect(wrapper1).toMatchSnapshot();
  });

  it('updates columns when receiving props', () => {
    const columns = [{
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    }];
    const wrapper2 = shallow(<Table columns={columns} />);
    const newColumns = [{
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    }];
    wrapper2.setProps({ columns: newColumns });
    expect(wrapper2.instance().props.columns).toBe(newColumns);
  });
});
