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

  componentDidMount = () => this.getData();

  setQuery = (newTerm: string) => {
    this.setState({ query: newTerm });
  };

  handleSearch = () => {
    localStorage.setItem('sw-search-query', this.state.query);
    this.getData();
  };

  getData = async () => {
    console.trace();
    this.setState({ isFetching: true });
    let url = 'https://swapi.dev/api/people';
    const { query } = this.state;
    if (query.length) url += `/?search=${query}`;
    const response = await fetch(url);
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
