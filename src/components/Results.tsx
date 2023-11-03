import Card from './Card';
import type { ResultsProps } from '../types';
import './results.css';

const Results = ({ results }: ResultsProps) => {
  const content = () => results.map((item, i) => <Card item={item} key={i} />);

  return <section className="results">{content()}</section>;
};

export default Results;
