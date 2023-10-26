import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import { AppState } from './types';

class App extends Component {
  state: AppState = {
    isFetching: false,
    query: localStorage.getItem('sw-search-query') ?? '',
    data: {},
  };

  setQuery = (newTerm: string) => {
    this.setState({ query: newTerm });
  };

  handleSearch = () => {
    localStorage.setItem('sw-search-query', this.state.query);
    this.getData();
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
          handleSearch={this.handleSearch}
        />
        <Results data={this.state.data} />
      </>
    );
  }
}

export default App;
