import Card from '../Card';
import type { ResultsProps } from '../../types';
import './style.css';

const Results = ({ results, showDetails, handleShowDetails }: ResultsProps) => {
  const searchResults = () =>
    results.map((item, i) => (
      <Card item={item} key={i} onClick={handleShowDetails} />
    ));

  return (
    <section className={`results ${showDetails ? 'results--small' : ''}`}>
      {searchResults()}
    </section>
  );
};

export default Results;
