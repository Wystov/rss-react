import Card from '../components/Card';
import { describe, it, expect, vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import { data } from './mock-data';
import '@testing-library/jest-dom';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import router from '../router';
import { getData } from '../api/getData';

describe('Card component tests', () => {
  vitest.mock('../api/getData', () => ({
    getData: vitest.fn().mockResolvedValue(data),
  }));

  it('Card component renders the relevant card data', async () => {
    render(
      <BrowserRouter>
        <Card item={data.results[0]} />
      </BrowserRouter>
    );

    const name = await screen.findByText('Luke Skywalker');
    expect(name).toBeVisible();
  });

  it('Clicking on a card opens a detailed card component', async () => {
    render(<RouterProvider router={router} />);
    const name = await screen.findByText('Luke Skywalker');
    await userEvent.click(name);
    const details = await screen.findByText('Details');

    expect(details).toBeVisible();
  });

  it('Clicking card triggers an additional API call to fetch detailed information', async () => {
    render(<RouterProvider router={router} />);
    const name = await screen.findByText('Luke Skywalker');
    userEvent.click(name);

    expect(getData).toBeCalledWith({ id: '1' });
  });
});
