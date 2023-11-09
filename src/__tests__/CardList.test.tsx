import CardList from '../components/CardList';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Data } from '../types';
import { DataContext } from '../App';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('CardList component tests', () => {
  const data: Data = {
    count: 2,
    next: null,
    previous: null,
    results: [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        url: 'https://swapi.dev/api/people/1/',
      },
      {
        name: 'C-3PO',
        height: '167',
        mass: '75',
        hair_color: 'n/a',
        skin_color: 'gold',
        eye_color: 'yellow',
        birth_year: '112BBY',
        gender: 'n/a',
        url: 'https://swapi.dev/api/people/2/',
      },
    ],
  };

  const emptyData: Data = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

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
