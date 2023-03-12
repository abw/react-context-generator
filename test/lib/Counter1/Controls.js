import React   from 'react';
import Context from './Context.js'

const Controls = ({inc, dec}) => <div>
  <button id="inc" onClick={inc}>Increment</button>
  <button id="dec" onClick={dec}>Decrement</button>
</div>

export default Context.Consumer(Controls)
