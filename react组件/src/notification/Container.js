import React from 'react';
import ReactDOM from 'react-dom';
import Warpper from './Warpper';
import { randomid } from '../utils/strings';

const NotifyIndex = {};
export default function NotificationCreate(props = {}, type) {
  if (typeof props === 'string') {
    props = { message: props };
  }
  props._key = randomid();
  if (type) {
    props.type = type;
  }
  if (!props.placement) {
    props.placement = 'topRight';
  }

  if (props.placement && !NotifyIndex[props.placement]) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    NotifyIndex[props.placement] = ReactDOM.render(<Warpper />, div);
  }

  if (NotifyIndex[props.placement]) {
    NotifyIndex[props.placement].addNotify({
      ...props,
      willUnmount(nprops) {
        if (!nprops) return;
        nprops.onClose && nprops.onClose();
      },
    });
  }
}

['success', 'warning', 'info', 'error'].forEach((type) => {
  NotificationCreate[type] = (options = {}) => {
    return NotificationCreate(options, type);
  };
});
