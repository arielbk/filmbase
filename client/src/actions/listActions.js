import axios from 'axios';
import { UPDATE_LIST, GET_ERRORS } from './types';

// Fetch films from user
export const setFavouriteFilms = () => dispatch =>
	axios
		.get('/api/list')
		.then(res => {
			console.log(res);
			dispatch({
				type: UPDATE_LIST,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);

// Add a film to the user's favourite list
export const addFavouriteFilm = filmID => dispatch =>
	axios
		.patch(`/api/list/${filmID}`)
		.then(res =>
			dispatch({
				type: UPDATE_LIST,
				payload: res.data.favFilms,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);

// Remove a film from the user's favourite list
export const removeFavouriteFilm = filmID => dispatch =>
	axios
		.delete(`/api/list/${filmID}`)
		.then(res =>
			dispatch({
				type: UPDATE_LIST,
				payload: res.user.list,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
