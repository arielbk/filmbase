/* eslint-disable no-console */
import React from 'react';
import {
  render, cleanup, waitForElement,
} from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import MoviesList from '../MoviesList';

global.fetch = require('jest-fetch-mock');

afterEach(() => cleanup());

const movies = {
  results: [
    {
      id: 1,
      title: 'first movie',
      poster_path: 'poster1.jpg',
      release_date: '1991-07-28',
      overview: 'This is the first film',
      backdrop_path: 'backdrop1.jpg',
      genre_ids: [28, 12],
    },
    {
      id: 2,
      title: 'second movie',
      poster_path: 'poster2.jpg',
      release_date: '1990-04-23',
      overview: 'This is the second film in the api mock',
      backdrop_path: 'backdrop2.jpg',
      genre_ids: [28, 12],
    },
    {
      id: 3,
      title: 'third movie',
      poster_path: 'poster3.jpg',
      release_date: '1980-05-24',
      overview: 'This is the third film in the api mock',
      backdrop_path: 'backdrop3.jpg',
      genre_ids: [12, 35],
    },
  ],
};

const genres = {
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 35, name: 'Comedy' },
  ],
};

test('<MoviesList /> without search query', async () => {
  fetch
    .mockResponseOnce(JSON.stringify(genres))
    .mockResponseOnce(JSON.stringify(movies));

  const { getByTestId, queryByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>,
  );

  // single movie to check firsts
  const movie = movies.results[0];

  expect(getByTestId('loading')).toBeTruthy();
  await waitForElement(() => getByTestId('movie-results'));
  expect(queryByTestId('loading')).toBeFalsy();
  // this is unit tested in Movie.test.js, but just to be sure
  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);

  // testing the values inside of the image thumb
  expect(getByTestId('movieposter-title').innerHTML).toBe(movie.title);
  expect(getByTestId('movieposter-year').innerHTML).toBe(movie.release_date.split('-')[0]);
  // check the first genre value...
  let genreName;
  genres.genres.forEach((genre) => {
    if (genre.id === movie.genre_ids[0]) {
      genreName = genre.name;
    }
  });
  expect(getByTestId('movieposter-genre').innerHTML).toBe(genreName);
});
