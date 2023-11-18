import Card from '../components/Card';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { data } from './mocks/data';
import '@testing-library/jest-dom';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { setupStore } from '../store';
import { server } from './mocks/api';
import { Provider } from 'react-redux';
import MainPage from '../pages/main';
import router from '../router';

describe('Card component tests', () => {
  window.scrollTo = () => {};
  server.listen();

  it('Card component renders the relevant card data', () => {
    const initialState = {
      details: {
        id: 1,
      },
    };
    const store = setupStore(initialState);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Card item={data.results[0]} />
        </Provider>
      </BrowserRouter>
    );

    const name = screen.getByText('Luke Skywalker');
    expect(name).toBeInTheDocument();
  });

  it('Clicking on a card opens a detailed card component', async () => {
    const store = setupStore();
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </BrowserRouter>
    );
    const name = await screen.findByText('Luke Skywalker');
    await userEvent.click(name);
    await waitFor(() => {
      const details = screen.queryByText('Details');
      if (details) expect(details).toBeInTheDocument();
    });
  });

  it('Clicking card triggers an additional API call to fetch detailed information', async () => {
    render(<RouterProvider router={router} />);
    const name = await screen.findByText('Luke Skywalker');

    let detailsWasFetched = false;
    server.events.on('request:start', ({ request }) => {
      if (request.url === 'https://swapi.dev/api/people/1') {
        detailsWasFetched = true;
      }
    });

    await userEvent.click(name);

    expect(detailsWasFetched).toBeTruthy();
  });
});
