import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const PageControls = (props) => {
  const { page, search } = props;
  return (
    <StyledPageControls>
      {page > 1
        ? (
          <a
            data-testid="pagecontrols-back"
            href={search
              ? `/search=${search}/p=${page - 1}`
              : `/p=${page - 1}`}
          >
            <div>
              &lt;
            </div>
          </a>
        )
        : <div>&nbsp;</div>}
      <span data-testid="pagecontrols-current">
        page
        {' '}
        { page }
      </span>
      <a
        data-testid="pagecontrols-forward"
        href={search
          ? `/search=${search}/p=${page + 1}`
          : `/p=${page + 1}`}
      >
        <div>
          &gt;
        </div>
      </a>
    </StyledPageControls>
  );
};

export default PageControls;

PageControls.propTypes = {
  page: PropTypes.number.isRequired,
  search: PropTypes.string,
};
PageControls.defaultProps = {
  search: null,
};

const StyledPageControls = styled.div`
  margin: 2rem auto;
  width: 300px;
  border-radius: 12px;
  background: #111;

  display: flex;
  justify-content: space-between;
  align-items: space-between;
  
  div {
    padding: 0.5rem;
    width: 100px;
  }

  a {
    color: #ccc;
    text-decoration: none;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    display: inline-block;
    transition: 0.3s;

    :hover {
      color: #4E9A46;
    }
  }

  span {
    font-size: 1rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;
