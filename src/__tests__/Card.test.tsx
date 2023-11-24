import { describe, expect, it, vi } from 'vitest';

import Card from '@/components/Card';
import { render, screen } from '@testing-library/react';

import { data } from './mocks/data';

import '@testing-library/jest-dom';

describe('Card component tests', () => {
  it('Card component renders the relevant card data', () => {
    vi.mock('next/router', () => vi.importActual('next-router-mock'));

    render(<Card item={data.results[0]} />);

    const name = screen.getByText('Luke Skywalker');
    expect(name).toBeInTheDocument();
  });
});
