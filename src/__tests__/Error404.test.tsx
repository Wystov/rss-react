import { render, waitFor } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import router from '../router';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('routing test', () => {
  it('404 page is displayed when navigating to an invalid route', () => {
    render(<RouterProvider router={router} />);

    router.navigate('/invalid-route');

    waitFor(async () => {
      const errorPage = await screen.findByText('404 :(');
      expect(errorPage).toBeInTheDocument();
    });
  });
});
