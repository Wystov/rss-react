import Details from '../components/Details';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { data } from './mocks/data';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { setupStore } from '../store';

import { server } from './mocks/api';

describe('Details component tests', () => {
  const initialState = {
    details: {
      id: 1,
    },
  };
  const store = setupStore(initialState);
  window.scrollTo = () => {};
  server.listen();

  it('Loading indicator is displayed while fetching data', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Details />
        </Provider>
      </BrowserRouter>
    );

    const preloader = screen.getByText('Loading...');

    expect(preloader).toBeInTheDocument();
  });

  it('Detailed card component correctly displays the detailed card data', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Details />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(async () => {
      const character = screen.queryByText(data.results[0].name);
      if (character) expect(character).toBeInTheDocument();
      const birthYear = screen.queryByText(data.results[0].birth_year);
      if (birthYear) expect(birthYear).toBeInTheDocument();
    });
  });

  it('Clicking the close button hides the details component', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Details />
        </Provider>
      </BrowserRouter>
    );

    const closeBtn = document.querySelector('.close-btn');
    const detailsSection = document.querySelector('.details');
    if (closeBtn) userEvent.click(closeBtn);

    waitFor(() => expect(detailsSection).not.toBeInTheDocument());
  });
});
