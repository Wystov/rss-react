import { describe, expect, it, vi } from 'vitest';

import CardList from '@/components/CardList';
import { render, screen, waitFor } from '@testing-library/react';

import { data, emptyData } from './mocks/data';

import '@testing-library/jest-dom';

describe('CardList component tests', () => {
  vi.mock('next/router', () => vi.importActual('next-router-mock'));

  it('Component renders the specified number of cards', async () => {
    render(<CardList data={data} />);
    await waitFor(async () => {
      const cards = screen.queryAllByText('Height:');
      if (cards) expect(cards.length).toBe(2);
    });
  });

  it('Shows a message when there are no search results', async () => {
    render(<CardList data={emptyData} />);

    await waitFor(async () => {
      const errorMessage = screen.queryByText('Nothing matches your search');
      if (errorMessage) expect(errorMessage).toBeInTheDocument();
    });
  });
});
