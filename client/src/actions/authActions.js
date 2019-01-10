import axios from 'axios';
import { SET_CURRENT_USER, GET_ERRORS } from './types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

// Register user
export const registerUser = (userData, history) => dispatch =>
	axios
		.post('api/auth/register', userData)
		.then(() => history.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
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
			// Redirect to starred movies list
			history.push('/starred');
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
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
export const logoutUser = () => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {}; sets isAuthenticated to false
	dispatch(setCurrentUser({}));
};
