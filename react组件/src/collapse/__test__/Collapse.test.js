import React from 'react';
import { mount } from 'enzyme';
import { Collapse } from '../../../src';

const Panel = Collapse.Panel;

describe('<Collapse>', () => {
  const wrapperState = {
    value: 0,
  };
  const wrapper = mount(
    <Collapse
      activeKey={['2']}
      onChange={(key) => {
        wrapperState.value = key.join(',');
      }}
    >
      <Panel header="大话西游" key="1">
        <div>曾经有一份真诚的爱情放在我面前，我没有珍惜，等我失去的时候我才后悔莫及，人世间最痛苦的事莫过于此。 </div>
        <div>如果上天能够给我一个再来一次的机会，我会对那个女孩子说三个字：我爱你。 </div>
        <div>如果非要在这份爱上加上一个期限，我希望是…… </div>
        <div>一万年</div>
      </Panel>
      <Panel header="西游·降魔篇" key="2">
        <div>曾经痛苦，才知道真正的痛苦；曾经执著，才能放下执著；</div>
        <div>曾经牵挂，才能了无牵挂。</div>
      </Panel>
      <Panel header="国产零零漆" key="3" >
        <div>古有关云长全神贯注下象棋刮骨疗毒，今有我零零漆聚精会神看A片挖骨取弹头。</div>
      </Panel>
    </Collapse>
  );
  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Collapse');
    // 默认值测试
    expect(wrapper.find('.w-collapse')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Collapse);
    expect(wrapper.at(0).prop('accordion')).toBe(false);
    expect(wrapper.at(0).prop('showArrow')).toBe(true);
    expect(wrapper.find('.w-collapse-item').at(0).prop('className')).toBe('w-collapse-item');
    expect(wrapper.find('.w-collapse-item').at(1).prop('className')).toBe('w-collapse-item w-collapse-active');
  });

  it('Test onChange event.', () => {
    const wrapper1 = wrapper.find('.w-collapse-item').at(2).find('.w-collapse-header').at(0);
    wrapper1.simulate('click');
    expect(wrapperState.value).toBe('2,3');
  });
});
