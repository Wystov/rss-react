import type { ReactNode } from 'react';

export interface SearchProps {
  initialValue: string;
  onSearch: (query: string) => void;
  isFetching: boolean;
}

export type ResultItem = Record<string, string>;

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
  onClick: (id: string | null) => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: JSX.Element;
}

export interface PaginationProps {
  itemsCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export interface DetailsProps {
  data: ResultItem | null;
}
