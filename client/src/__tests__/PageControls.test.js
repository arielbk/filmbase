import React from 'react';
import { render, cleanup } from 'react-testing-library';
import PageControls from '../PageControls';

afterEach(cleanup);

test('<PageControls /> page 1 with search query', () => {
  const {
    container, queryByTestId, getByTestId,
  } = render(<PageControls page={1} search="lord" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(queryByTestId('pagecontrols-back')).toBeFalsy();
  expect(getByTestId('pagecontrols-forward').getAttribute('href')).toBe('/search=lord/p=2');
  expect(getByTestId('pagecontrols-current').innerHTML).toBe('page 1');
});

test('<PageControls /> page 3 with no search query', () => {
  const {
    container, getByTestId,
  } = render(<PageControls page={3} search="" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('pagecontrols-back').getAttribute('href')).toBe('/p=2');
  expect(getByTestId('pagecontrols-forward').getAttribute('href')).toBe('/p=4');
  expect(getByTestId('pagecontrols-current').innerHTML).toBe('page 3');
});
