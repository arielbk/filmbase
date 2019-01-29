import axios from 'axios';
import { SET_HEARTED, ADD_HEARTED, DELETE_HEARTED, SET_ERRORS } from './types';

// Fetch films from user
export const setHearted = () => dispatch =>
	axios
		.get('/api/hearts')
		.then(res => {
			dispatch({
				type: SET_HEARTED,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		);

// Add a film to the user's hearted list
export const heartFilm = film => dispatch =>
	axios
		.patch(`/api/hearts/add`, film)
		.then(res =>
			dispatch({
				type: ADD_HEARTED,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		);

// Remove a film from the user's hearted list
export const unheartFilm = filmID => dispatch =>
	axios
		.delete(`/api/hearts/${filmID}`)
		.then(res =>
			dispatch({
				type: DELETE_HEARTED,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		);
