import { Component } from 'react';
import { SearchProps } from '../types';

class Search extends Component<SearchProps> {
  updateTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setQuery(e.target.value);
  };

  submit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.getData();
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
