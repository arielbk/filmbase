import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER, SET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';

// Register user
export const registerUser = (userData, history) => dispatch =>
	axios
		.post('api/auth/register', userData)
		.then(() => history.push('/login'))
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		);

// Login - get user token
export const loginUser = (userData, history) => dispatch =>
	axios
		.post('api/auth/login', userData)
		.then(res => {
			// Save to localStorage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			// Set token to auth header
			setAuthToken(token);
			// Decode token for user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.then(() =>
			// Redirect to hearted movies list
			history.push('/hearted')
		)
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		);

// Set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// Log the user out
export const logoutUser = history => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {}; sets isAuthenticated to false
	dispatch(setCurrentUser({}));
	// Redirect to the main page
	history.push('/');
};
