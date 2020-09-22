import React from 'react';
import Counter from './Counter'
import Controls from './Controls'

const Count = ({count, inc, dec, message}) => <div>
  <p id="message">{message||'No message'}</p>
  <p id="count">The current count is {count}</p>
  <Controls/>
</div>

export default Counter.Consumer(Count)