import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import { AppState } from './types';

class App extends Component {
  state: AppState = {
    isFetching: false,
    query: '',
    data: {},
  };

  setQuery = (newTerm: string) => {
    this.setState({ query: newTerm });
  };

  getData = async () => {
    this.setState({ isFetching: true });
    const response = await fetch('https://swapi.dev/api/people');
    const data = await response.json();
    console.log(data);
    this.setState({ isFetching: false });
  };

  render() {
    return (
      <>
        <Search
          query={this.state.query}
          setQuery={this.setQuery}
          getData={this.getData}
        />
        <Results data={this.state.data} />
      </>
    );
  }
}

export default App;
