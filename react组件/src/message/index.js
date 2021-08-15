import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import { randomid } from '../utils/strings';
import './style/index.less';

const div = document.createElement('div');

export default function Message(content, props = {}) {
  if (div) document.body.appendChild(div);
  if (typeof content === 'string' || React.isValidElement(content)) {
    props.content = content;
  }
  if (!props.type) props.type = 'info';

  const component = React.createElement(Container, Object.assign(props, {
    id: randomid(),
    duration: props.duration || 3,
    willUnmount: () => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);

      if (props.onClose instanceof Function) {
        props.onClose();
      }
    },
  }));

  const container = ReactDOM.render(component, div);
  container.addMessage(props);
}

['success', 'warning', 'info', 'error'].forEach((type) => {
  Message[type] = (content, options = {}) => {
    options.type = type;
    return Message(content, options);
  };
});
