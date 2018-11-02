import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <SearchButton placeholder="Search" type="text" />
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/page:page" component={MoviesList} />
        <Route path="/:id" component={MovieDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;

const SearchButton = styled.input`
  padding: 1rem;
  border-radius: 22px;
  font-size: 1rem;
  transition: 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  position: fixed;
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
    max-width: 16rem;
    background: #ccc;

    ::placeholder {
      color: #777;
    }
  }
  
  :hover {
    cursor: pointer;
    background: #ccc;
  }
`;
