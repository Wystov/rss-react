import { Data } from '../../config/types';

export const data: Data = {
  count: 20,
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

export const emptyData: Data = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};
