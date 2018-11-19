/* eslint-disable no-console */
import React from 'react';
import { render } from 'react-testing-library';

import App from '../App';

console.error = jest.fn();

// check app renders without errrors
test('<App />', () => {
  render(<App />);
  expect(console.error).not.toHaveBeenCalled();
});
