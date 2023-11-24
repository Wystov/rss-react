import type { ReactNode } from 'react';

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

export type DetailsProps = {
  details: ResultItem | null;
};

export type DetailsUrlParams = {
  id: string;
};

export type SearchUrlParams = {
  search: string;
  page: number;
};

export interface CloseBtnProps {
  onClick: () => void;
}

export interface PaginationProps {
  itemsCount: number;
}

export type CardListProps = {
  data: Data | null;
};

export interface getDataParams {
  search: string;
  page: number;
  itemsPerPage: number;
  details: string | null;
}

export type complexData = CardListProps & DetailsProps;
