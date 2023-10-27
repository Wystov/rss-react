import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorComponent from './components/ErrorComponent';
import type { AppState, Data } from './types';

class App extends Component {
  state: AppState = {
    isFetching: false,
    query: localStorage.getItem('sw-search-query') ?? '',
    data: null,
  };

  componentDidMount = () => this.handleSearch();

  setQuery = (newTerm: string) => {
    this.setState({ query: newTerm });
  };

  handleSearch = async () => {
    if (this.state.isFetching) return;
    localStorage.setItem('sw-search-query', this.state.query);
    this.setState({ data: null, isFetching: true });
    const data = await this.getData();
    this.setState({ data: data ?? null, isFetching: false });
  };

  getData = async () => {
    let url = 'https://swapi.dev/api/people';
    const { query } = this.state;
    if (query.length) url += `/?search=${query}`;
    try {
      const response = await fetch(url);
      const data: Data = await response.json();
      return data;
    } catch {
      console.warn('Error occured on data fetching');
    }
  };

  content = () => {
    const { isFetching, data } = this.state;
    switch (true) {
      case isFetching:
        return <div className="preloader">preloader</div>;
      case data !== null:
        return <Results results={data!.results} />;
      default:
        return <div>Error occured on getting data, please try later</div>;
    }
  };

  render() {
    return (
      <>
        <Search
          query={this.state.query}
          setQuery={this.setQuery}
          handleSearch={this.handleSearch}
          isFetching={this.state.isFetching}
        />
        {this.content()}
        <ErrorComponent />
      </>
    );
  }
}

export default App;
