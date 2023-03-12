# react-context-generator

## Introduction
This is a small and simple module that provides some syntactic sugar to
streamline the use of React Context to maintain state in your React
applications.

Seriously, it's *embarassingly* small.  We're talking 20 lines
of code or so for the main function.

If you're not already familiar with React Context then you should start by
reading the React Context documentation: https://reactjs.org/docs/context.html

## Installation

Add `react-context-generator` to your project using your favourite package
manager.

### npm:
    $ npm add @abw/react-context-generator

### yarn:
    $ yarn add @abw/react-context-generator

### pnpm:
    $ pnpm add @abw/react-context-generator

## Wrapping a Component that Maintains State

Here's a simple example of a component that maintains some state
and provides methods for manipulating that state.

```js
// Counter.js
import React from "react";
import Generator from "@abw/react-context-generator";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.initialCount || 0
    };
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
    return this.props.render({
      ...this.state,
      ...this.actions,
    });
  }
}

export default Generator(Counter);
```

It stores a `count` value in the state which is initially set to `0` or a custom value
provided by an `initialCount` property.  It has `increment()` and `decrement()` methods
which respectively add or subtract one from the count.

In the `constructor()` method we also define `this.actions` to store versions of these
methods that are bound to `this`, allowing them to be called as functions from anywhere
in our code.  I've given then shorter names here - `inc` and `dec` but that's entirely
arbitrary.  The original names would serve the purpose just as well.

So far this is all fairly standard Javascript/React code.  Where it gets interesting is in
the `render()` method.  All we do here is call the `render()` function that is passed
in as a property - `this.props.render()` - and pass it an object containing the things
that we want to share with other components.

In this case we're passing everything in the state (which in this simple example only
contains `count`) and the actions that we've defined to manipulate the state (`inc` and `dec`).

The final line of code calls the `Generator()` function imported from
`@abw/react-context-generator` passing the `Counter` component as an argument.
This is then the default value exported by the `Counter.js` module.

```js
export default Generator(Counter);
```

## Using the Context Provider

Now when we import this module we get an object that contains two entries: a `Provider` and a `Consumer`.

The `Provider` is designed to enclose any and all components that might need to access the state.
It's typically added somewhere near the "outside" of your application.

```js
// MyApp.js
import React from "react";
import Counter from "./Counter";

export default props => <div id="myapp">
  <h1>Welcome to My Counting App!</h1>
  <Counter.Provider>
    ...the rest of your app goes here...
  </Counter.Provider>
</div>
```

You can pass custom properties to your `Provider` if you want to.  They will get passed down to
the `Counter` component, e.g.

```js
export default props => <div id="myapp">
  <h1>Welcome to My Counting App that Starts at 100!</h1>
  <Counter.Provider initialCount={100}>
    ...the rest of your app goes here...
  </Counter.Provider>
</div>
```

## Using the Context Consumer

When you need to access the state provided by `Counter` from somewhere deep inside your app you
simply need to wrap it in the `Counter.Consumer` function.  All of the items that the `Counter`
module shares as context will be passed into your component as properties.

```js
// Controls.js
import React from "react";
import Counter from "./Counter";

const Controls = ({count, inc, dec}) => <div>
  <p>The current count is {count}</p>
  <button onClick={inc}>Increment</button>
  <button onClick={dec}>Decrement</button>
</div>

export default Counter.Consumer(Controls)
```

That's all there is to it.  Sweet and simple!

## Base Class Context

There's a base class context module that you can subclass.  It provides
a number of conveniences to help you reduce the amount of code you need
to write.

```js
import { Generator, Context } from "@abw/react-context-generator";

class Counter extends Context {
  static initialState = {
    count: 10,
  }
  static actions     = "inc dec";
  static debug       = false;
  static debugPrefix = 'Counter > ';
  static debugColor  = 'orangered'

  inc() {
    this.debug("Incrementing count")
    this.setState({ count: this.state.count + 1 });
  }
  dec() {
    this.debug("Decrementing count")
    this.setState({ count: this.state.count - 1 });
  }
}

export default Generator(Counter);
```

The `initialState` static property allows you to define the initial state of
the context.

The `actions` list says which methods should be exposed in the context
data as callable action functions.  It can be specified as an array of method
names or as a whitespace delimited string as shown here.

The `debug` option can be set `true` to enable debugging.  The optional
`debugPrefix` and `debugColor` allow you to customise the debugging messages
sent to `console.log()`.  When debugging is enabled the `this.debug()` method
calls will generate debugging messages on the console.  Otherwise they are
ignored.

The default behaviour is to render any consumer components, passing them
props for each item in the state, all action functions, and any props passed
to the context object itself.

You can define a `getRenderProps()` method to change that behaviour if you
like.

The default method looks like this:

```js
getRenderProps() {
  return this.getContext();
}
```

You might prefer to bundle everything up and pass a single prop to consumer
components.

```js
getRenderProps() {
  return { Counter: this.getContext() };
}
```

In this case a consumer component would look like this:

```js
const Controls = ({Counter}) => <div>
  <p>The current count is {Counter.count}</p>
  <button onClick={Counter.inc}>Increment</button>
  <button onClick={Counter.dec}>Decrement</button>
</div>
```

The default `getContext()` method looks like this:

```js
getContext() {
  return {
    ...this.props,    // properties passed to the context
    ...this.state,    // internal state
    ...this.actions,  // callable action functions mapped to methods
  };
}
```

You can also re-defined this method if you like.  Perhaps like this:

```js
getContext() {
  return {
    props:   this.props,    // properties passed to the context
    state:   this.state,    // internal state
    actions: this.actions,  // callable action functions mapped to methods
  };
}
```

In this case the consumer component would look like this:

```js
const Controls = ({Counter}) => <div>
  <p>The current count is {Counter.state.count}</p>
  <button onClick={Counter.actions.inc}>Increment</button>
  <button onClick={Counter.actions.dec}>Decrement</button>
</div>
```

