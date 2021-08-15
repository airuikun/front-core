import { Component, PropTypes } from '../utils/';

export default class MixinComponent extends Component {
  parent() {
    return this.context.component;
  }
  menu() {
    let parent = this.parent();
    while (parent.instanceType !== 'Menu') {
      parent = parent.parent();
    }
    return parent;
  }
}

MixinComponent.contextTypes = {
  component: PropTypes.any,
};
