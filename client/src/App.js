import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import logo from './logo.svg';
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';
import SearchButton from './SearchButton';

const App = () => (
  <Router>
    <StyledApp>
      <GlobalStyle />
      <Header>
        {/* force the movieslist component to refetch data... */}
        <Link to="/" onClick={() => setTimeout(window.location.reload(true))}>
          <Logo src={logo} alt="logo" />
        </Link>
        <SearchButton />
      </Header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route exact path="/p=:page" component={MoviesList} />
        <Route exact path="/search=:query" component={MoviesList} />
        <Route path="/search=:query/p=:page" component={MoviesList} />
        <Route path="/:id" component={MovieDetail} />
      </Switch>
    </StyledApp>
  </Router>
);

export default App;

const Header = styled.div`
  background-color: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #111;
`;

const StyledApp = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  margin: 2rem;
`;

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    outline-color: #4E9A46;
  }

  body {
    background: #222;
    color: #ccc;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;
