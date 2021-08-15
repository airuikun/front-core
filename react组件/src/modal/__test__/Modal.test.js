import React from 'react';
import { mount } from 'enzyme';
import { Modal } from '../../../src';

describe('<Modal>', () => {
  const warpperState = {
    value: 0,
  };
  const wrapper = mount(
    <Modal onCancel={(e, value) => { warpperState.value = value; }} />
  );
  it('Test the default props and node.', () => {
    expect(wrapper.name()).toBe('Modal');
    // 默认值测试
    expect(wrapper.find('.w-modal')).toHaveLength(1);
    expect(wrapper.type()).toEqual(Modal);
    expect(wrapper.at(0).prop('width')).toBe(520);
    expect(wrapper.at(0).prop('maskClosable')).toBe(true);
    expect(wrapper.at(0).prop('visible')).toBe(false);
    expect(wrapper.at(0).prop('confirmLoading')).toBe(false);
  });

  it('Test visible attributes.', () => {
    wrapper.setProps({ visible: true });
    expect(wrapper.find('.w-modal').at(0).prop('className')).toBe('w-modal w-modal-wrap');
  });

  it('Test width attributes.', () => {
    wrapper.setProps({ width: 1000 });
    expect(wrapper.at(0).prop('width')).toBe(1000);
  });
});

class ModalTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  componentDidMount() {
    this.setState({ visible: true }); // eslint-disable-line react/no-did-mount-set-state
  }
  saveContainer = (container) => {
    this.container = container;
  }
  getContainer = () => {
    return this.container;
  }
  render() {
    return (
      <div>
        <div ref={this.saveContainer} />
        <Modal
          {...this.props}
          visible={this.state.visible}
          getContainer={this.getContainer}
        >
          Here is content of Modal
        </Modal>
      </div>
    );
  }
}

describe('Modal', () => {
  it('render correctly', () => {
    const warpper = mount(<ModalTester />);
    expect(warpper.render()).toMatchSnapshot();
  });
  // toMatchSnapshot api 判断两个条件一致与否
  it('render without footer', () => {
    const warpper = mount(<ModalTester footer={null} />);
    expect(warpper.render()).toMatchSnapshot();
  });
});
