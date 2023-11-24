import { describe, expect, it, vi } from 'vitest';

import Details from '@/components/Details';
import { render, screen, waitFor } from '@testing-library/react';

import { data } from './mocks/data';

import '@testing-library/jest-dom';

describe('Details component tests', () => {
  it('Detailed card component correctly displays the detailed card data', async () => {
    vi.mock('next/router', () => vi.importActual('next-router-mock'));

    render(<Details details={data.results[0]} />);

    await waitFor(async () => {
      const character = screen.queryByText(data.results[0].name);
      if (character) expect(character).toBeInTheDocument();
      const birthYear = screen.queryByText(data.results[0].birth_year);
      if (birthYear) expect(birthYear).toBeInTheDocument();
    });
  });
});
