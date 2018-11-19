/* eslint-disable no-console */
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import MovieDetail from '../MovieDetail';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  // clear history of mocked function
  console.error.mockClear();
  fetch.resetMocks();
});

console.error = jest.fn();

// EXPECTED RESPONSES FOR AN INVALID MOVIE ID

// mocks the prop passed to the component via react router
const match = {
  params: {
    id: 42,
  },
};
const movie = {
  status_code: 34,
  status_message: 'The resource you requested could not be found.' // eslint-disable-line
};
const credits = {
  status_code: 34,
  status_message: 'The resource you requested could not be found.' // eslint-disable-line
};

test('<MovieDetail /> receives failed api response', () => {
  fetch
    .mockResponseOnce(JSON.stringify(movie))
    .mockResponseOnce(JSON.stringify(credits));

  const { debug } = render(
    <MemoryRouter>
      <MovieDetail match={match} />
    </MemoryRouter>,
  );

  debug();
});

// const cast = {
//   id: match.params.id,
//   cast: [
//     {
//       name: 'Cast Person',
//       character: 'Character Name',
//     },
//   ],
//   crew: [
//     {
//       name: 'Crew Person',
//       job: 'screenplay',
//     },
//   ],
// };
