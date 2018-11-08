import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class SearchButton extends Component {
  state = {
    input: '',
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { input } = this.state;
    if (input === '') return;
    history.push(`/search=${input}`);

    // this is not the greatest solution but it works
    // reload the page so that the movielist component will refetch api data
    window.location.reload(true);
  }

  render() {
    const { input } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <StyledSearchButton
            placeholder="search"
            type="text"
            value={input}
            onChange={this.handleChange}
          />
        </form>
      </Fragment>
    );
  }
}

SearchButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(SearchButton);

const StyledSearchButton = styled.input`
  position: absolute;
  z-index: 10;
  padding: 1rem;
  border-radius: 22px;
  font-size: 1rem;
  transition: 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  top: 2rem; 
  right: 1rem;
  background: #464646;
  padding: 1rem 2rem;
  max-width: 8rem;
  border: none;
  transition: 0.3s;
  
  ::placeholder {
    color: #111;
  }

  :focus {
    max-width: 300px;
    background: #ccc;

    ::placeholder {
      color: #777;
    }
  }
  
  :hover {
    background: #ccc;
  }

  @media (max-width: 760px) {
    position: relative;
    top: 1.5rem;
    left: 0;
  }
`;
