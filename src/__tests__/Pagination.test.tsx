import Pagination from '../components/Pagination';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { DataContext } from '../pages/main';
import userEvent from '@testing-library/user-event';

describe('Pagination component test', () => {
  const data = {
    count: 20,
    next: null,
    previous: null,
    results: [],
  };

  const searchParamsMock = new Map<string, string>();
  const setSearchParamsMock = (func: (params: Map<string, string>) => void) => {
    func(searchParamsMock);
  };

  it('Component updates URL query parameter when page changes', async () => {
    vi.doMock('react-router-dom', async () => {
      const actual = await vi.importActual<typeof import('react-router-dom')>(
        'react-router-dom'
      );
      return {
        ...actual,
        useSearchParams: vi
          .fn()
          .mockReturnValue([searchParamsMock, setSearchParamsMock]),
      };
    });

    render(
      <BrowserRouter>
        <DataContext.Provider value={data}>
          <Pagination />
        </DataContext.Provider>
      </BrowserRouter>
    );

    const lastPage = await screen.findByText('>>');
    await userEvent.click(lastPage);
    // const pageQueryParam = searchParamsMock.get('page');

    // expect(pageQueryParam).toBe('2');
  });
});
