import {
	LIST_LOADING,
	SET_FILM_LIST,
	SET_LIST_PAGE,
	SET_LIST_SEARCH,
	SET_LIST_SORT,
} from '../actions/types';

const initialState = {
	films: [],
	page: 1,
	searchQuery: '',
	loading: false,
	sortBy: 'popularity.desc',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LIST_LOADING:
			return {
				...state,
				loading: true,
			};
		case SET_FILM_LIST:
			return {
				...state,
				films: action.payload.results,
				totalPages: action.payload.total_pages,
				loading: false,
			};
		case SET_LIST_PAGE:
			return {
				...state,
				page: action.payload,
			};
		case SET_LIST_SEARCH:
			return {
				...state,
				searchQuery: action.payload,
			};
		case SET_LIST_SORT:
			return {
				...state,
				sortBy: action.payload,
			};
		default:
			return state;
	}
};
