import styled from 'styled-components';
import React, { Component } from 'react';

export default class PageControls extends Component {
  render() {
    const { page } = this.props;
    return (
      <StyledPageControls>
        {page > 1
          ? (
            <a href={`page${page - 1}`}>
              <div>
                &lt;
              </div>
            </a>
          )
          : <div>&nbsp;</div>}
        <span>
          page
          {' '}
          { page }
        </span>
        <a href={`page${page + 1}`}>
          <div>
            &gt;
          </div>
        </a>
      </StyledPageControls>
    );
  }
}

const StyledPageControls = styled.div`
  margin: 2rem auto;
  width: 400px;
  border-radius: 22px;
  background: #111;

  display: flex;
  justify-content: space-between;
  align-items: space-between;

  a {
    color: #ccc;
    text-decoration: none;
    font-size: 2rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33.3%;
    display: inline-block;
    transition: 0.3s;

    :hover {
      color: #4E9A46;
    }
  }

  span {
    font-size: 1.2rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
`;
