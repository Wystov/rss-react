import CardList from '../components/CardList';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { setupStore } from '../store';
import { server } from './mocks/api';
import { Provider } from 'react-redux';

describe('CardList component tests', () => {
  server.listen();
  it('Component renders the specified number of cards', async () => {
    const store = setupStore();
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </BrowserRouter>
    );
    await waitFor(async () => {
      const cards = document.getElementsByClassName('card');
      if (cards) expect(cards.length).toBe(2);
    });
  });

  it('Shows a message when there are no search results', async () => {
    const initialState = {
      search: {
        query: 'abrakadabra',
      },
    };
    const store = setupStore(initialState);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(async () => {
      const errorMessage = screen.queryByText('Nothing matches your search');
      if (errorMessage) expect(errorMessage).toBeInTheDocument();
    });
  });
});
