import {
	LIST_LOADING,
	SET_FILM_LIST,
	ADD_TO_LIST,
	SET_LIST_PAGE,
	SET_LIST_SEARCH,
	SET_LIST_SORT,
	MORE_LOADING,
} from '../actions/types';

const initialState = {
	films: [],
	page: 1,
	searchQuery: '',
	loading: false,
	moreLoading: false,
	sortBy: 'popularity.desc',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LIST_LOADING:
			return {
				...state,
				loading: true,
			};
		case MORE_LOADING:
			return {
				...state,
				moreLoading: true,
			};
		case SET_FILM_LIST:
			return {
				...state,
				films: action.payload.results,
				totalPages: action.payload.total_pages,
				loading: false,
			};
		case ADD_TO_LIST:
			return {
				...state,
				films: [...state.films, ...action.payload.results],
				moreLoading: false,
				page: state.page + 1,
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
