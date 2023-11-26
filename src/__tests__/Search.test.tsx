import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from '../components/Search';

describe('Search component tests', () => {
  it('clicking the Search button saves the entered value to the local storage', async () => {
    vi.mock('next/router', () => vi.importActual('next-router-mock'));

    render(<Search />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    expect((input as HTMLInputElement).value).toBe('');

    const newValue = 'value';

    await userEvent.type(input, newValue);
    await userEvent.click(submitButton);

    expect(localStorage.getItem('sw-search-query')).toBe(newValue);
  });
});
