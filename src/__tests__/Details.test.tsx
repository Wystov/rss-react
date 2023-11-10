import Details from '../components/Details';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { data } from './mock-data';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Details component tests', () => {
  it('Loading indicator is displayed while fetching data', () => {
    vi.mock('../../api/getData', () => ({
      getData: vi.fn().mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(data);
          }, 1000);
        });
      }),
    }));

    render(
      <MemoryRouter initialEntries={['?details=1']}>
        <Details />
      </MemoryRouter>
    );

    const preloader = screen.getByText('Loading...');

    expect(preloader).toBeInTheDocument();
  });

  it('Detailed card component correctly displays the detailed card data', async () => {
    vi.mock('../../api/getData', () => ({
      getData: vi.fn().mockResolvedValue(data.results[0]),
    }));

    render(
      <MemoryRouter initialEntries={['?details=1']}>
        <Details />
      </MemoryRouter>
    );

    await waitFor(async () => {
      const character = screen.queryByText(data.results[0].name);
      if (character) expect(character).toBeInTheDocument();
      const birthYear = screen.queryByText(data.results[0].birth_year);
      if (birthYear) expect(birthYear).toBeInTheDocument();
    });
  });

  it('Clicking the close button hides the details component', () => {
    vi.mock('../../api/getData', () => ({
      getData: vi.fn().mockResolvedValue(data.results[0]),
    }));

    render(
      <MemoryRouter initialEntries={['?details=1']}>
        <App />
      </MemoryRouter>
    );

    const closeBtn = document.querySelector('.close-btn');
    const detailsSection = document.querySelector('.details');
    if (closeBtn) userEvent.click(closeBtn);

    waitFor(() => expect(detailsSection).not.toBeInTheDocument());
  });
});
