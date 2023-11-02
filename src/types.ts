import type { ReactNode } from 'react';

export interface SearchProps {
  onSearch: (query: string) => void;
  isFetching: boolean;
}

type ResultItem = Record<string, string>;

export interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultItem[];
}

export interface ResultsProps {
  results: ResultItem[];
}

export interface CardProps {
  item: ResultItem;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: JSX.Element;
}
