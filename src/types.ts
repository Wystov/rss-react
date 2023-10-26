export interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
}

interface Data {
  someData?: string;
}

export interface ResultsProps {
  data: Data;
}

export interface AppState {
  isFetching: boolean;
  query: string;
  data: Data;
}
