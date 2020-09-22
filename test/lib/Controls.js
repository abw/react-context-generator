import React from 'react';
import Counter from './Counter'

const Controls = ({inc, dec}) => <div>
  <button id="inc" onClick={inc}>Incrememt Counter</button>
  <button id="dec" onClick={dec}>Decrement Counter</button>
</div>

export default Counter.Consumer(Controls)