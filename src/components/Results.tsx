import { Component } from 'react';
import Card from './Card';
import { ResultsProps } from '../types';

class Results extends Component<ResultsProps> {
  content = () => {
    const { results } = this.props;
    return results.length ? (
      results.map((item, i) => <Card item={item} key={i} />)
    ) : (
      <span>No results</span>
    );
  };

  render() {
    return (
      <section>
        <h1>Results</h1>
        {this.content()}
      </section>
    );
  }
}

export default Results;
