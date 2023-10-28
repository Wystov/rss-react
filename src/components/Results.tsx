import { Component } from 'react';
import Card from './Card';
import type { ResultsProps } from '../types';
import './results.css';

class Results extends Component<ResultsProps> {
  content = () => {
    const { results } = this.props;
    return results.length ? (
      results.map((item, i) => <Card item={item} key={i} />)
    ) : (
      <div className="error">No results</div>
    );
  };

  render() {
    return <section className="results">{this.content()}</section>;
  }
}

export default Results;
