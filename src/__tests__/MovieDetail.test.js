/* eslint-disable no-console */
import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import commaNumber from 'comma-number';

import MovieDetail, { POSTER_PATH, CAST_PATH } from '../MovieDetail';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
  cleanup();
  // clear history of mocked function
  console.error.mockClear();
  fetch.resetMocks();
});

console.error = jest.fn();

// mocks the prop passed to the component via react router
const match = {
  params: {
    id: 42,
  },
};

test('<MovieDetail /> receives failed api response', async () => {
  const movie = {
    status_code: 34,
    status_message: 'The resource you requested could not be found.' // eslint-disable-line
  };
  const credits = {
    status_code: 34,
    status_message: 'The resource you requested could not be found.' // eslint-disable-line
  };

  fetch
    .mockResponseOnce(JSON.stringify(movie))
    .mockResponseOnce(JSON.stringify(credits));

  const {
    debug, getByTestId, queryByTestId,
  } = render(
    <MemoryRouter>
      <MovieDetail match={match} />
    </MemoryRouter>,
  );

  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-title'));
  expect(queryByTestId('loading')).toBeFalsy();

  expect(getByTestId('movie-title').innerHTML).toBe('Film not found!');

  debug();
});

test('<MovieDetail /> receives valid api response', async () => {
  const movie = {
    title: 'Film Title',
    id: 42,
    tagline: 'Film\'s tagline.',
    overview: 'An overview of the film',
    poster_path: '/42.jpg',
    vote_average: 7.2,
    vote_count: 112,
    genres: [
      {
        id: 3,
        name: 'Action',
      },
      {
        id: 4,
        name: 'Thriller',
      },
    ],
    release_date: '01-01-2018',
    runtime: 112,
    budget: 90000000,
    revenue: 120000000,
    belongs_to_collection: {
      id: 43,
      name: 'Numbers Collection',
    },
  };

  const credits = {
    id: match.params.id,
    cast: [
      {
        name: 'Cast Person',
        character: 'Character Name',
        profile_path: 'photo.jpg',
      },
      {
        name: 'Another cast Person',
        character: 'Characterz Name',
        profile_path: 'photo.jpg',
      },
    ],
  };

  fetch
    .mockResponseOnce(JSON.stringify(movie))
    .mockResponseOnce(JSON.stringify(credits));

  const {
    getByTestId, queryByTestId, queryAllByTestId,
  } = render(
    <MemoryRouter>
      <MovieDetail match={match} />
    </MemoryRouter>,
  );

  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-title'));
  expect(queryByTestId('loading')).toBeFalsy();

  expect(getByTestId('movie-title').innerHTML).toBe(movie.title);
  expect(getByTestId('movie-tagline').innerHTML).toBe(movie.tagline);
  expect(getByTestId('movie-poster').getAttribute('src')).toBe(`${POSTER_PATH}${movie.poster_path}`);
  expect(getByTestId('vote-count').innerHTML).toBe(String(movie.vote_count));
  expect(getByTestId('vote-average').innerHTML).toBe(String(movie.vote_average));

  const genreTabs = queryAllByTestId('movie-genre');
  // check that first and last genres match api response
  expect(genreTabs[0].innerHTML).toBe(movie.genres[0].name);
  expect(genreTabs[genreTabs.length - 1].innerHTML)
    .toBe(movie.genres[movie.genres.length - 1].name);

  expect(getByTestId('movie-release-date').innerHTML).toBe(movie.release_date);
  expect(getByTestId('movie-runtime').innerHTML).toBe(`${movie.runtime}min`);
  expect(getByTestId('movie-budget').innerHTML).toBe(`$${commaNumber(movie.budget)}`);
  expect(getByTestId('movie-revenue').innerHTML).toBe(`$${commaNumber(movie.revenue)}`);

  expect(getByTestId('movie-tagline').innerHTML).toBe(movie.tagline);
  expect(getByTestId('movie-overview').innerHTML).toBe(movie.overview);

  // check that first cast credit matches api response
  // cannot call getByTestId on another DOM node
  // expect(cast[0].queryByTestId('credit-name').innerHTML).toBe(movie.credits.cast[0].name);
  expect(queryAllByTestId('credit-name')[0].innerHTML).toBe(credits.cast[0].name);
  expect(queryAllByTestId('credit-photo')[0].getAttribute('src')).toBe(`${CAST_PATH}${credits.cast[0].profile_path}`);
  expect(queryAllByTestId('credit-character')[0].innerHTML).toBe(credits.cast[0].character);
});
