import { Generator, Context } from "../../../src/index.js";

// This version subclasses the base Context class which provides various
// methods of convenience
class Counter extends Context {
  static initialState = {
    count: 10,
  }
  static actions     = "inc dec";
  static debug       = false;
  static debugPrefix = 'Counter > ';
  static debugColor  = 'orangered'

  inc() {
    this.setState({ count: this.state.count + 1 });
  }
  dec() {
    this.setState({ count: this.state.count - 1 });
  }
}

export default Generator(Counter);
