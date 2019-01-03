import { UPDATE_LIST } from '../actions/types';

const initialState = {
	favFilms: [],
};

export default function(state = initialState, action) {
	switch (action.type) {
		case UPDATE_LIST:
			return {
				...state,
				favFilms: action.payload,
			};
		default:
			return state;
	}
}
