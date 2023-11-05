import type { ReactNode } from 'react';

export interface SearchProps {
  initialValue: string;
  onSearch: (query: string) => void;
  isFetching: boolean;
}

export interface ResultItem {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  url: string;
  gender: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
}

export interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultItem[];
}

export interface ResultsProps {
  results: ResultItem[];
  showDetails: boolean;
  handleShowDetails: (id: string | null) => void;
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

export type UrlParams = { id: string } | { query: string; page: number };

export interface CloseBtnProps {
  onClick: () => void;
}
