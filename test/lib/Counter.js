import React from 'react';
import Generator from '../../src/Generator'

// This is our basic "model" component which stores the state (count)
// and has methods to manipulate it (increment() and decrement())

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.initialCount || 0,
        };
        // decide which methods we want to expose to consumers and
        // bind them to this so they can be called as functions
        this.actions = {
            inc: this.increment.bind(this),
            dec: this.decrement.bind(this),
        }
    }
    increment() {
        this.setState({ count: this.state.count + 1 });
    }
    decrement() {
        this.setState({ count: this.state.count - 1 });
    }
    render() {
        let context = {
            ...this.props,
            ...this.state,
            ...this.actions
        };
        // whatever we pass to this.props.render() will be forwarded
        // as props to any component that are consumers of this context
        return this.props.render(context);
    }
}

// final step is to turn our model class into a context generator
export default Generator(Counter)