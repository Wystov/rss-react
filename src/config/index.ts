const searchParams = new URLSearchParams(window.location.search);

export const initialSearchValue =
  searchParams.get('search') ?? localStorage.getItem('sw-search-query');

export const initialItemsPerPage = searchParams.get('itemsPerPage');

export const initialCurrentPage = searchParams.get('page');

export const initialDetailsId = searchParams.get('details');
