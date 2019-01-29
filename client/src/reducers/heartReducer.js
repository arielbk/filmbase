import { SET_HEARTED, ADD_HEARTED, DELETE_HEARTED } from '../actions/types';

const initialState = {
	hearted: [],
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_HEARTED:
			return {
				...state,
				hearted: action.payload,
			};
		case ADD_HEARTED:
			return {
				...state,
				hearted: [action.payload, ...state.hearted],
			};
		case DELETE_HEARTED:
			return {
				...state,
				hearted: [...state.hearted.filter(film => film.id !== action.payload)],
			};
		default:
			return state;
	}
}
