import React from 'react';
import { mount } from 'enzyme';
import { Tree } from '../../../src';

describe('<Tree>', () => {
  const treeData = [
    {
      label: '湖北省',
      key: '0-0-0',
      children: [
        {
          label: '武汉市',
          key: '0-1-0',
          children: [
            { label: '新洲区', key: '0-1-1' },
            { label: '武昌区', key: '0-1-2' },
            { label: '汉南区', key: '0-1-3' },
          ],
        },
        { label: '黄冈市', key: '0-2-0' },
      ],
    },
  ];
  const wrapper = mount(<Tree
    data={treeData}
  // onExpand={(key, expanded, data, node) => {
  //   console.log('item:', key, expanded, data, node);
  // }}
  />);

  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Tree');
    // default props test
    expect(wrapper.find('.w-tree')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Tree);
    expect(wrapper.at(0).prop('prefixCls')).toBe('w-tree');
    expect(wrapper.at(0).prop('selectedKeys')).toEqual([]);
    expect(wrapper.at(0).prop('showLine')).toBe(false);
    expect(wrapper.at(0).prop('defaultExpandAll')).toBe(false);
    expect(wrapper.at(0).prop('data')).toBe(treeData);
    expect(wrapper.at(0).prop('option')).toEqual({
      children: 'children',
      label: 'label',
    });
    expect(wrapper.find('.w-tree').type()).toBe('div');
  });

  it('Test the showLine props.', () => {
    wrapper.setProps({ showLine: true });
    expect(wrapper.find('.w-tree ul').at(0).hasClass('w-tree-show-line')).toBe(true);
  });

  it('Test the selectedKeys props.', () => {
    wrapper.setProps({ selectedKeys: ['0-0-0'] });
    expect(wrapper.prop('selectedKeys')).toEqual(['0-0-0']);
    expect(wrapper.find('.w-tree .w-tree-selected')).toHaveLength(1);
  });

  it('Test the data and option props.', () => {
    wrapper.setProps({
      data: [{
        name: '上海市',
        key: '0-1-0',
        child: [
          { label: '青浦区', key: '0-1-1' },
          { label: '静安区', key: '0-1-2' },
        ],
      }],
      option: { label: 'name', children: 'child' },
    });
    expect(wrapper.find('.w-tree .w-tree-inner').at(0).text()).toBe('上海市');
    expect(wrapper.find('.w-tree li ul').at(0).children()).toHaveLength(2);
  });
});
