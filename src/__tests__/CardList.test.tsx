import CardList from '../components/CardList';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { data, emptyData } from './mock-data';
import { DataContext } from '../App';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('CardList component tests', () => {
  it('Component renders the specified number of cards', () => {
    render(
      <BrowserRouter>
        <DataContext.Provider value={data}>
          <CardList />
        </DataContext.Provider>
      </BrowserRouter>
    );
    const cards = document.getElementsByClassName('card');
    expect(cards.length).toBe(2);
  });

  it('Shows a message when there are no search results', async () => {
    render(
      <BrowserRouter>
        <DataContext.Provider value={emptyData}>
          <CardList />
        </DataContext.Provider>
      </BrowserRouter>
    );

    const errorMessage = await screen.findByText('Nothing matches your search');
    expect(errorMessage).toBeVisible();
  });
});
