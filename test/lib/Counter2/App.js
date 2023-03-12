import React    from 'react';
import Context  from './Context.js'
import Count    from './Count.js'
import Controls from './Controls.js'

export default (props) =>
  <Context.Provider {...props}>
    <Count/>
    <Controls/>
  </Context.Provider>

