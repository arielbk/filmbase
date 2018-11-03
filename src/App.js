import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import React from 'react';

import './App.css';
import logo from './logo.svg';
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';
import SearchButton from './SearchButton';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <SearchButton />
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/page:page" component={MoviesList} />
        <Route path="/search/:query" component={MoviesList} />
        <Route path="/:id" component={MovieDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;