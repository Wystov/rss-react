import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { data } from './data';

const handlers = [
  http.get('https://swapi.dev/api/people/', () => {
    return HttpResponse.json(data);
  }),
  http.get('https://swapi.dev/api/people/:id', () => {
    return HttpResponse.json(data.results[0]);
  }),
];

export const server = setupServer(...handlers);
