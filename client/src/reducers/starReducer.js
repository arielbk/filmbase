import { SET_STARRED, ADD_STARRED, DELETE_STARRED } from '../actions/types';

const initialState = {
	starred: [],
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_STARRED:
			return {
				...state,
				starred: action.payload,
			};
		case ADD_STARRED:
			return {
				...state,
				starred: [action.payload, ...state.starred],
			};
		case DELETE_STARRED:
			return {
				...state,
				starred: [
					...state.starred.map(filmID => {
						if (!filmID === action.payload) return filmID;
						return null;
					}),
				],
			};
		default:
			return state;
	}
}
