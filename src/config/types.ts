import type { ReactNode } from 'react';
import store from '../store';

export interface SearchProps {
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

export interface CardProps {
  item: ResultItem;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: JSX.Element;
}

export interface DetailsProps {
  data: ResultItem | null;
}

export type DetailsUrlParams = {
  id: string;
};

export type SearchUrlParams = {
  query: string;
  page: number;
  itemsPerPage: number;
};

export interface CloseBtnProps {
  onClick: () => void;
}

export type RootState = ReturnType<typeof store.getState>;
