import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';

import { StyledApp, GlobalStyle } from './App.styled';

import setAuthToken from '../../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../../actions/authActions';
import { setFavouriteFilms } from '../../actions/listActions';

import store from '../../store';
import MoviesList from '../MoviesList';
import MovieDetail from '../MovieDetail';
import Navbar from '../Navbar';
import Register from '../Register';
import Login from '../Login';
import Favourites from '../Favourites';

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
		store.dispatch(setFavouriteFilms());
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
					<Route exact path="/favourites" component={Favourites} />
					<Route path="/search=:query/p=:page" component={MoviesList} />
					<Route path="/:id" component={MovieDetail} />
				</Switch>
			</StyledApp>
		</Router>
	</Provider>
);

export default App;
