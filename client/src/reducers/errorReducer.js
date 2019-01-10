import { SET_ERRORS } from '../actions/types';

const initialState = {};

// This basically just passes the payload into global state under 'errors'
export default function(state = initialState, action) {
	switch (action.type) {
		case SET_ERRORS:
			return action.payload;
		default:
			return state;
	}
}
