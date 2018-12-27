/* eslint-disable no-console */
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Movie, { POSTER_PATH } from '../Movie';

afterEach(() => {
  cleanup();
  // clear history of mocked function
  console.error.mockClear();
});

console.error = jest.fn();

test('<Movie /> with no movie prop', () => {
  render(<Movie />);
  expect(console.error).toHaveBeenCalled();
});

const movie = {
  id: 1,
  title: 'Fake Movie Title',
  poster_path: '/filmposter.jpg',
};

// if movie prop is passed, then it will also have the required children prop...
test('<Movie /> with movie prop', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Movie movie={movie} />
    </MemoryRouter>,
  );
  expect(console.error).not.toHaveBeenCalled();

  expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);

  const moviePoster = getByTestId('movie-poster');
  expect(moviePoster.alt).toBe(movie.title);
  expect(moviePoster.getAttribute('src')).toBe(`${POSTER_PATH}${movie.poster_path}`);
});
