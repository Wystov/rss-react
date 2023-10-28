import { Component } from 'react';
import './errorComponent.css';

class ErrorComponent extends Component {
  state = {
    throw: false,
  };

  throw = () => {
    this.setState({ throw: true });
  };

  render = () => {
    if (this.state.throw) throw new Error('Manual error was thrown');
    return (
      <button className="error-btn" onClick={this.throw}>
        Throw error
      </button>
    );
  };
}

export default ErrorComponent;
