import React from 'react'

export class Context extends React.Component {
  static initialState  = { }
  static initialProps  = { }
  static actions = [ ];

  constructor(props) {
    super(props);
    const statics = this.constructor;

    // define initial state
    this.state = this.prepareState(
      statics.initialState,
      statics.initialProps,
      props
    );

    // add debug() method if static debug flag or debug prop is set
    this.debug = (statics.debug || props.debug)
      ? statics.debugPrefix
        ? (format, ...args) => console.log(
            '%c' + statics.debugPrefix + '%c' + format,
            `color: ${statics.debugColor}`,
            'color:black', ...args
          )
        : console.log.bind(console)
      : () => (undefined);

    // expose any methods as callable functions in this.handlers
    this.actionMethods(statics.actions)
  }

  prepareState(initialState, initialProps, props) {
    return Object.entries(initialProps).reduce(
      (state, [key, propName]) => {
        const value = props[propName];
        if (value !== null && typeof value !== 'undefined') {
          state[key] = value;
        }
        return state;
      },
      { ...initialState }
    )
  }

  actionMethods(names=[]) {
    let actions = this.actions ||= { };
    const methods = typeof names === 'string'
      ? names.split(/,\s*|\s+/)
      : names;
    methods.forEach(
      name => {
        let method = this[name];
        if (method) {
          this.debug(`exposing method ${name}()`)
          actions[name] = method.bind(this);
        }
        else {
          throw new Error(`Cannot expose non-existant action method: ${name}`);
        }
      }
    );
  }

  getContext() {
    return {
      ...this.props,    // properties passed to the context
      ...this.state,    // internal state
      ...this.actions,  // callable action functions mapped to methods
    };
  }

  getRenderProps() {
    return this.getContext();
  }

  render() {
    return this.props.render(
      this.getRenderProps()
    );
  }
}

export default Context;
