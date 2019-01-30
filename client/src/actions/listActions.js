import axios from 'axios';
import {
	SET_FILM_LIST,
	SET_LIST_PAGE,
	SET_LIST_SEARCH,
	SET_LIST_SORT,
	LIST_LOADING,
	MORE_LOADING,
	SET_ERRORS,
	ADD_TO_LIST,
} from './types';

// Set the film list to loading
export const setListLoading = () => ({
	type: LIST_LOADING,
});

// Set more loading
export const setMoreLoading = () => ({
	type: MORE_LOADING,
});

// Update the current film list
export const updateFilmList = (
	page = 1,
	searchQuery = '',
	sortBy = 'popularity.desc'
) => dispatch => {
	dispatch(setListLoading());
	let apiURL;
	// would hide this api key in production
	searchQuery
		? (apiURL = `https://api.themoviedb.org/3/search/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`)
		: (apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}`);
	axios
		.get(apiURL)
		.then(res =>
			dispatch({
				type: SET_FILM_LIST,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Set the current list page
export const setListPage = page => dispatch =>
	dispatch({
		type: SET_LIST_PAGE,
		payload: page,
	});

// Set the current search query
export const setSearchQuery = query => dispatch =>
	dispatch({
		type: SET_LIST_SEARCH,
		payload: query,
	});

// Set the list sorting order
export const setSortBy = sortBy => dispatch => {
	dispatch({
		type: SET_LIST_SORT,
		payload: sortBy,
	});
};

// Reset the movie list to all default values
export const resetMoviesList = async () => async dispatch => {
	await setListPage(1);
	await setSearchQuery('');
	await setSortBy('popularity.desc');
	updateFilmList();
};

// Load more films
export const loadMore = (newPage, searchQuery = '', sortBy) => dispatch => {
	dispatch(setMoreLoading());
	let apiURL;
	// would hide this api key in production
	searchQuery
		? (apiURL = `https://api.themoviedb.org/3/search/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&query=${searchQuery}&page=${newPage}&include_adult=false`)
		: (apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=5f65a05aa95f0f49a243118f362a4d69&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${newPage}`);
	axios
		.get(apiURL)
		.then(res =>
			dispatch({
				type: ADD_TO_LIST,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			})
		);
};
