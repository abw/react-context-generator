import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import CountApp from './lib/CountApp'

// Written using information gleaned from https://reactjs.org/docs/test-utils.html

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Test first render with initial state
  act(() => {
    ReactDOM.render(<CountApp />, container);
  });
  const inc   = container.querySelector('#inc');
  const dec   = container.querySelector('#dec');
  const count = container.querySelector('#count');
  expect(count.textContent).toBe('The current count is 0');

  // increment the counter
  act(() => {
    inc.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(count.textContent).toBe('The current count is 1');

  // and again
  act(() => {
    inc.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(count.textContent).toBe('The current count is 2');

  // now go down
  act(() => {
    dec.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(count.textContent).toBe('The current count is 1');
});

