export interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
}

type ResultItem = Record<string, string>;

interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultItem[];
}

export interface ResultsProps {
  results: ResultItem[];
}

export interface AppState {
  isFetching: boolean;
  query: string;
  data: Data | null;
}

export interface CardProps {
  item: ResultItem;
}
