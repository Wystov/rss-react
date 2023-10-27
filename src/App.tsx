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
    this.setState({ data: null, isFetching: true });
    let url = 'https://swapi.dev/api/people';
    const { query } = this.state;
    if (query.length) url += `/?search=${query}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ data });
    } catch {
      console.error('Error occured on data fetching');
    } finally {
      this.setState({ isFetching: false });
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
        return <div>Unexpected error occured, please try again later</div>;
    }
  };

  render() {
    return (
      <>
        <Search
          query={this.state.query}
          setQuery={this.setQuery}
          handleSearch={this.handleSearch}
        />
        {this.content()}
      </>
    );
  }
}

export default App;
