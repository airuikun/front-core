import React from 'react';
import { Message } from '../../../src';

describe('Message', () => {
  it('Test placement attributes', () => {
    Message.info('whatever', { placement: 'bottom' });
    expect(document.querySelectorAll('.w-message')[0].className).toBe('w-message w-message-bottom');
    expect(document.querySelectorAll('.w-message').length).toBe(1);
  });
  it('Test Message.success', () => {
    Message.success('success', { placement: 'topLeft' });
    expect(document.querySelectorAll('.w-message').length).toBe(1);
    expect(document.querySelectorAll('.w-message')[0].className).toBe('w-message w-message-top-left');
  });

  it('Test html input', () => {
    Message.info(
      <div className="test">
        <h2>标题</h2>
        <p className="test">这里是内容</p>
      </div>
    );
    expect(document.querySelectorAll('.test')[0].className).toBe('test');
    expect(document.querySelectorAll('.test').length).toBe(2);
  });
});
