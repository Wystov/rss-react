import { Component } from 'react';
import { SearchProps } from '../types';

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
        <form onSubmit={this.submit}>
          <input
            type="text"
            value={this.props.query}
            onChange={this.updateTerm}
          />
          <button type="submit">Search</button>
        </form>
      </section>
    );
  }
}

export default Search;
