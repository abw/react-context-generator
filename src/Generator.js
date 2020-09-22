import React from 'react'

function Generator(Model, defaultState={}) {
    // Create a context with the default state
    const Context = React.createContext({
        ...defaultState
    });

    // Provider invokes the Model component and passes it a render prop
    // which renders the child components inside a context provider
    const Provider = props => <Model {...props}
        render={
            value => <Context.Provider value={value}>
                {props.children}
            </Context.Provider>
        }
    />

    // Consumer renders the component passed to it
    function Consumer(Component) {
        return class extends React.Component {
            static contextType = Context;
            render() {
                let props = {
                    ...this.context,
                    ...this.props, // allow context to override context values
                }
                return <Component {...props} />;
            }
        }
    }

//    const Provider = Container( props => props.children );

    const Container = Provider;

    return { Model, Context, Provider, Consumer, Container }
}

export default Generator

/*
    // Higher order function to make a Component a context provider
    function Container(Component) {
        return cProps => <Model
            // Any props passed to the Provider are forwarded to the Model component
            {...cProps}
            // Pass a render prop to the Model component that renders the child
            // components inside a context provider
            render={
                props => <Context.Provider value={props}>
                    <Component children={cProps.children}/>
                </Context.Provider>
            }
        />
    }
*/