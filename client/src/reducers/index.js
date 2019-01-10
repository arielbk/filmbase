import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import starReducer from './starReducer';

export default combineReducers({
	auth: authReducer,
	starred: starReducer,
	errors: errorReducer,
});
