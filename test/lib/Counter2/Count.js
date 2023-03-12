import React    from 'react';
import Counter  from './Context.js'

const Count = ({count}) => <div>
  <p id="count">The current count is {count}</p>
</div>

export default Counter.Consumer(Count)
