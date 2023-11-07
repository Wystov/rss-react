import Card from '../Card';
import type { ResultsProps } from '../../types';
import './style.css';
import { useContext } from 'react';
import { DataContext } from '../../App';

const Results = ({ showDetails, handleShowDetails }: ResultsProps) => {
  const results = useContext(DataContext)?.results ?? [];
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
