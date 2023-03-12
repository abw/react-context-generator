import React from 'react'

export const Generator = (Model, defaultState={}) => {
  const Context = React.createContext(defaultState);

  // Provider renders the Model component forwarding all props passed to it
  // along with a render prop to render the children inside a context provider
  const Provider = props =>
    <Model {...props} render={context =>
      <Context.Provider value={context}>
        {props.children}
      </Context.Provider>
    }/>

  // Consumer renders a component inside a context consumer
  const Consumer = Component => props =>
    <Context.Consumer>
      {context => <Component {...context} {...props}/>}
    </Context.Consumer>

  return { Context, Provider, Consumer }
}

export default Generator
