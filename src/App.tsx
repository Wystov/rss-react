import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';

class App extends Component {
  render() {
    return (
      <>
        <Search />
        <Results />
      </>
    );
  }
}

export default App;
