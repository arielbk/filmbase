import { LIST_LOADING, SET_FILM_LIST, SET_LIST_PAGE, SET_LIST_SEARCH } from '../actions/types';

const initialState = {
	list: [],
	page: 1,
	searchQuery: '',
	loading: false,
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
				list: action.payload,
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
		default:
			return state;
	}
};
