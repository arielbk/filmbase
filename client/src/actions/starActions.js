import axios from 'axios';
import { SET_STARRED, ADD_STARRED, DELETE_STARRED, SET_ERRORS } from './types';

// Fetch films from user
export const setStarred = () => dispatch =>
	axios
		.get('/api/stars')
		.then(res => {
			dispatch({
				type: SET_STARRED,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		);

// Add a film to the user's starred list
export const starFilm = filmID => dispatch =>
	axios
		.patch(`/api/stars/add/${filmID}`)
		.then(res =>
			dispatch({
				type: ADD_STARRED,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		);

// Remove a film from the user's starred list
export const unstarFilm = filmID => dispatch =>
	axios
		.delete(`/api/stars/${filmID}`)
		.then(res =>
			dispatch({
				type: DELETE_STARRED,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		);
