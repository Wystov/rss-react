import Details from '../components/Details';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// const mockSearchParams = new URLSearchParams();

describe('Details component tests', () => {
  it('Loading indicator is displayed while fetching data', () => {
    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    const preloader = screen.getByText('Loading...');

    expect(preloader).toBeInTheDocument();
  });

  //   it('Detailed card component correctly displays the detailed card data', async () => {
  //     vi.mock('../../api/getData', () => ({
  //       getData: vi.fn().mockResolvedValue(data.results[0]),
  //     }));

  //     mockSearchParams.set('details', '1');

  //     vi.mock('react-router-dom', async () => {
  //       const actual = await vi.importActual('react-router-dom');
  //       return {
  //         ...actual,
  //         useSearchParams: vi.fn().mockReturnValue(mockSearchParams),
  //       };
  //     });

  //     render(
  //       <MemoryRouter initialEntries={['?details=1']}>
  //         <Details />
  //       </MemoryRouter>
  //     );

  //     await waitFor(async () => {
  //       const mass = await screen.findByText('77');
  //       expect(mass).toBeInTheDocument();
  //     });
  //   });
});
