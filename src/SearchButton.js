import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

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
    history.push(`/search/${input}`);

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

export default withRouter(SearchButton);

const StyledSearchButton = styled.input`
  padding: 1rem;
  border-radius: 22px;
  font-size: 1rem;
  transition: 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  position: absolute;
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
    max-width: 30%;
    background: #ccc;

    ::placeholder {
      color: #777;
    }
  }
  
  :hover {
    background: #ccc;
  }
`;
