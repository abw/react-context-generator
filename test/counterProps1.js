import React    from 'react';
import ReactDOM from "react-dom/client";
import App      from './lib/Counter1/App.js'
import { act }  from '@testing-library/react';

// Variation of counter.js that passed an initialCount property
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
    ReactDOM.createRoot(container).render(<App initialCount={100}/>);
  });
  const inc   = container.querySelector('#inc');
  const dec   = container.querySelector('#dec');
  const count = container.querySelector('#count');
  expect(count.textContent).toBe('The current count is 100');

  // increment the counter
  act(() => {
    inc.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(count.textContent).toBe('The current count is 101');

  // now go down
  act(() => {
    dec.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(count.textContent).toBe('The current count is 100');
});

