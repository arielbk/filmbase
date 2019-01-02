import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';
import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';
import Navbar from './Navbar';
import Register from './Register';
import Login from './Login';

// Check for token
if (localStorage.jwtToken) {
	// Set auth token to header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Log user out
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = '/login';
	} else {
		// Set user and isAuthenticated
		store.dispatch(setCurrentUser(decoded));
	}
}

const App = () => (
	<Provider store={store}>
		<Router>
			<StyledApp>
				<GlobalStyle />
				<Navbar />
				<Switch>
					<Route exact path="/" component={MoviesList} />
					<Route exact path="/p=:page" component={MoviesList} />
					<Route exact path="/search=:query" component={MoviesList} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route path="/search=:query/p=:page" component={MoviesList} />
					<Route path="/:id" component={MovieDetail} />
				</Switch>
			</StyledApp>
		</Router>
	</Provider>
);

export default App;

const StyledApp = styled.div`
	text-align: center;
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
