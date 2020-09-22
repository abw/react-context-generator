import React from 'react';
import Counter from './Counter'
import Count from './Count'

// The Counter.Container is a wrapper around the child components
// which automatically forwards the shared properties provided by
// the context component

export default (props) => <Counter.Provider {...props}>
   <Count/>
</Counter.Provider>

