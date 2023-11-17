// import { BrowserRouter, RouterProvider } from 'react-router-dom';
// import Search from '../components/Search';
// import { SearchContext } from '../pages/main';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { vi } from 'vitest';
// import { data } from './mock-data';
// import router from '../router';

// describe('Search component tests', () => {
//   it('clicking the Search button saves the entered value to the local storage', async () => {
//     const initialValue = '';

//     render(
//       <BrowserRouter>
//         <SearchContext.Provider value={initialValue}>
//           <Search isFetching={false} />
//         </SearchContext.Provider>
//       </BrowserRouter>
//     );

//     const input = screen.getByRole('textbox');
//     const submitButton = screen.getByRole('button');

//     expect((input as HTMLInputElement).value).toBe(initialValue);

//     await userEvent.type(input, 'value');
//     await userEvent.click(submitButton);

//     expect(localStorage.getItem('sw-search-query')).toBe('value');
//   });

//   it('Component retrieves the value from the local storage upon mounting', () => {
//     vi.doMock('../api/getData', () => ({
//       getData: vi.fn().mockResolvedValue(data),
//     }));

//     const valueFromLs = 'value from ls';
//     localStorage.setItem('sw-search-query', valueFromLs);

//     render(<RouterProvider router={router} />);

//     const input = screen.getByRole('textbox');

//     expect((input as HTMLInputElement).value).toBe(valueFromLs);
//   });
// });
