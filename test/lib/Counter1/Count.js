import React    from 'react';
import Context  from './Context.js'

const Count = ({count}) => <div>
  <p id="count">The current count is {count}</p>
</div>

export default Context.Consumer(Count)
