import Card from '../Card/Card';
import type { ResultsProps } from '../../types';
import './results.css';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const Results = ({ results }: ResultsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasId = searchParams.get('details') ? true : false;
  const [showDetails, setShowDetails] = useState(hasId);

  const handleShowDetails = async (id: string | null) => {
    if (showDetails) {
      setShowDetails(false);
      setSearchParams((params) => {
        params.delete('details');
        return params;
      });
      return;
    }
    if (!id) return;
    setSearchParams((params) => {
      params.set('details', id);
      return params;
    });
    setShowDetails(true);
  };

  const searchResults = () =>
    results.map((item, i) => (
      <Card item={item} key={i} onClick={handleShowDetails} />
    ));

  return (
    <section className="results">
      <div className="results__search">{searchResults()}</div>
      {showDetails && <Outlet />}
    </section>
  );
};

export default Results;
