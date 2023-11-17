// import Card from '../components/Card';
// import { describe, it, expect, vi } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import { data } from './mock-data';
// import '@testing-library/jest-dom';
// import { BrowserRouter, RouterProvider } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
// import router from '../router';
// import { getData } from '../api/getData';

// describe('Card component tests', () => {
//   vi.mock('../api/getData', () => ({
//     getData: vi.fn().mockResolvedValue(data),
//   }));

//   it('Card component renders the relevant card data', () => {
//     render(
//       <BrowserRouter>
//         <Card item={data.results[0]} />
//       </BrowserRouter>
//     );

//     const name = screen.getByText('Luke Skywalker');
//     expect(name).toBeInTheDocument();
//   });

//   it('Clicking on a card opens a detailed card component', async () => {
//     render(<RouterProvider router={router} />);
//     const name = await screen.findByText('Luke Skywalker');
//     await userEvent.click(name);
//     const details = screen.getByText('Details');

//     expect(details).toBeInTheDocument();
//   });

//   it('Clicking card triggers an additional API call to fetch detailed information', async () => {
//     render(<RouterProvider router={router} />);
//     const name = await screen.findByText('Luke Skywalker');
//     userEvent.click(name);

//     expect(getData).toBeCalledWith({ id: '1' });
//   });
// });
