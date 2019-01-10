import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import starReducer from './starReducer';
import listReducer from './listReducer';

export default combineReducers({
	auth: authReducer,
	starred: starReducer,
	errors: errorReducer,
	list: listReducer,
});
