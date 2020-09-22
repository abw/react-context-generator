import React from 'react';
import Counter from './Counter'

const Controls = ({inc, dec}) => <div>
  <button id="inc" onClick={inc}>Increment</button>
  <button id="dec" onClick={dec}>Decrement</button>
</div>

export default Counter.Consumer(Controls)
