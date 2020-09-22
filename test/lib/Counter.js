import React from "react";
import Generator from "../../src/Generator";

// This is our basic "model" component which stores the state (count)
// and has methods to manipulate it (increment() and decrement())
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count:   this.props.initialCount || 0
    };
    // decide which methods we want to expose to consumers and
    // bind them to 'this' so they can be called as functions
    this.actions = {
      inc: this.increment.bind(this),
      dec: this.decrement.bind(this),
    };
  }
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
  render() {
    // whatever we pass to this.props.render() will be forwarded
    // as props to any component that are consumers of this context
    return this.props.render({
      ...this.state,
      ...this.actions,
    });
  }
}

// Upgrade the Counter class to a context provider/consumer
export default Generator(Counter);
