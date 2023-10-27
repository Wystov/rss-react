import { Component } from 'react';

class ErrorComponent extends Component {
  state = {
    throw: false,
  };

  throw = () => {
    this.setState({ throw: true });
  };

  render = () => {
    if (this.state.throw) throw new Error('Manual error was thrown');
    return <button onClick={this.throw}>Throw error</button>;
  };
}

export default ErrorComponent;
