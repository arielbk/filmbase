import { GET_ERRORS } from '../actions/types';

const initialState = {};

// This basically just passes the payload into global state under 'errors'
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
}
