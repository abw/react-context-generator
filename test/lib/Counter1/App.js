import React    from 'react';
import Context  from './Context'
import Count    from './Count'
import Controls from './Controls.js';

// The Counter.Provider is a wrapper around the child components
// which automatically forwards the shared properties provided by
// the context component
export default (props) =>
  <Context.Provider {...props}>
    <Count/>
    <Controls/>
  </Context.Provider>

