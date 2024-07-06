import { BrowserRouter } from 'react-router-dom';
import Search from '../components/Search';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupStore } from '../store';
import { Provider } from 'react-redux';

describe('Search component tests', () => {
  const store = setupStore();

  it('clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    expect((input as HTMLInputElement).value).toBe('');

    const newValue = 'value';

    await userEvent.type(input, newValue);
    await userEvent.click(submitButton);

    expect(localStorage.getItem('sw-search-query')).toBe(newValue);
  });

  it('Component retrieves the value from the local storage upon mounting', () => {
    const valueFromLs = localStorage.getItem('sw-search-query');

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');

    expect((input as HTMLInputElement).value).toBe(valueFromLs);
  });
});
