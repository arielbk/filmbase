import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import SearchButton from '../SearchButton';

afterEach(cleanup);

const handleSubmit = jest.fn();

test('<SearchButton />', () => {
  const { debug, getByTestId } = render(
    <MemoryRouter>
      <SearchButton onSubmit={handleSubmit} />
    </MemoryRouter>,
  );
  fireEvent.change(getByTestId('searchbutton-field'), { target: { value: 'lord' } });
  fireEvent.submit(getByTestId('searchbutton-form'));
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  debug();
});
