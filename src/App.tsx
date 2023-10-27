import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import { AppState } from './types';

class App extends Component {
  state: AppState = {
    isFetching: false,
    query: localStorage.getItem('sw-search-query') ?? '',
    data: null,
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
    this.setState({ isFetching: true });
    this.setState({ data: null });
    let url = 'https://swapi.dev/api/people';
    const { query } = this.state;
    if (query.length) url += `/?search=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ data });
    this.setState({ isFetching: false });
  };

  render() {
    const content =
      !this.state.isFetching && this.state.data ? (
        <Results results={this.state.data.results} />
      ) : (
        <div className="preloader">preloader</div>
      );

    return (
      <>
        <Search
          query={this.state.query}
          setQuery={this.setQuery}
          handleSearch={this.handleSearch}
        />
        {content}
      </>
    );
  }
}

export default App;
