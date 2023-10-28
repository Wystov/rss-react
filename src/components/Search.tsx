import { Component } from 'react';
import type { SearchProps } from '../types';
import './search.css';

class Search extends Component<SearchProps> {
  updateTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setQuery(e.target.value.trim());
  };

  submit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.handleSearch();
  };

  render() {
    return (
      <section>
        <form className="search" onSubmit={this.submit}>
          <input
            className="search__input"
            type="text"
            value={this.props.query}
            onChange={this.updateTerm}
          />
          <button
            className="search__btn"
            type="submit"
            disabled={this.props.isFetching}
          >
            Search
          </button>
        </form>
      </section>
    );
  }
}

export default Search;
