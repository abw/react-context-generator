import React from 'react';
import Counter from './Counter'
import Controls from './Controls'

const Count = ({count, inc, dec}) => <div>
  <p id="count">The current count is {count}</p>
  <Controls/>
</div>

export default Counter.Consumer(Count)
