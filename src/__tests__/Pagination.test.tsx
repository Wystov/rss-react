import Pagination from '../components/Pagination';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { setupStore } from '../store';
import { server } from './mocks/api';
import { Provider } from 'react-redux';

describe('Pagination component test', () => {
  const store = setupStore();
  server.listen();

  it('Component updates URL query parameter when page changes', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination itemsCount={20} />
        </Provider>
      </BrowserRouter>
    );

    const initialPageQueryParam = window.location.search;

    expect(initialPageQueryParam).not.toContain('page');

    const lastPage = await screen.findByText('>>');
    await userEvent.click(lastPage);

    const pageQueryParam = window.location.search;

    expect(pageQueryParam).toContain('page=2');
  });
});
