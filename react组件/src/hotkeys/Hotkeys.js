import Hotkeys from 'hotkeys-js';
import { Component, PropTypes } from '../utils/';

Hotkeys.filter = function (event) {
  const tagName = (event.target || event.srcElement).tagName;
  Hotkeys.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
  return true;
};
export default class ReactHotkeys extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleKeyUpEvent = this.handleKeyUpEvent.bind(this);
    this.isKeyDown = false;
    this.handle = {};
  }
  componentDidMount() {
    Hotkeys.unbind(this.props.keyName);
    Hotkeys(this.props.keyName, this.onKeyDown);
    document.addEventListener('keyup', this.handleKeyUpEvent);
  }
  componentWillUnmount() {
    Hotkeys.unbind(this.props.keyName);
    this.isKeyDown = true;
    this.handle = {};
    document.removeEventListener('keyup', this.handleKeyUpEvent);
  }
  onKeyUp(e, handle) {
    const { onKeyUp } = this.props;
    onKeyUp(handle.shortcut, e, handle);
  }
  onKeyDown(e, handle) {
    const { onKeyDown } = this.props;
    if (this.isKeyDown) return;
    this.isKeyDown = true;
    this.handle = handle;
    onKeyDown(handle.shortcut, e, handle);
  }
  handleKeyUpEvent(e) {
    if (!this.isKeyDown) return;
    this.isKeyDown = false;
    if (this.props.keyName.indexOf(this.handle.shortcut) < 0) return;
    this.onKeyUp(e, this.handle);
    this.handle = {};
  }
  render() {
    return this.props.children || null;
  }
}

ReactHotkeys.propTypes = {
  keyName: PropTypes.string,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
};

ReactHotkeys.defaultProps = {
  onKeyUp() { },
  onKeyDown() { },
};
