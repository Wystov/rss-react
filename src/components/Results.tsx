import Card from './Card';
import type { ResultsProps } from '../types';
import './results.css';

const Results = ({ results }: ResultsProps) => {
  const content = () => {
    return results.length ? (
      results.map((item, i) => <Card item={item} key={i} />)
    ) : (
      <div className="error">No results</div>
    );
  };

  return <section className="results">{content()}</section>;
};

export default Results;
