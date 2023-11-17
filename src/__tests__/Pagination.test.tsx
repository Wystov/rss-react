// import Pagination from '../components/Pagination';
// import { describe, it } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { DataContext } from '../pages/main';
// import userEvent from '@testing-library/user-event';

// describe('Pagination component test', () => {
//   const data = {
//     count: 20,
//     next: null,
//     previous: null,
//     results: [],
//   };

//   it('Component updates URL query parameter when page changes', async () => {
//     render(
//       <BrowserRouter>
//         <DataContext.Provider value={data}>
//           <Pagination />
//         </DataContext.Provider>
//       </BrowserRouter>
//     );

//     const initialPageQueryParam = window.location.search;

//     expect(initialPageQueryParam).not.toContain('page');

//     const lastPage = await screen.findByText('>>');
//     await userEvent.click(lastPage);

//     const pageQueryParam = window.location.search;

//     expect(pageQueryParam).toContain('page=2');
//   });
// });
