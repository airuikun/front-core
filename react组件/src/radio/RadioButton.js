import Radio from './Radio';

export default class RadioButton extends Radio {
  componentDidMount() {
    this.setState({
      isButton: true,
    });
  }
}
