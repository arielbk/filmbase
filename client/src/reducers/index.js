import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import listReducer from './listReducer';

export default combineReducers({
	auth: authReducer,
	list: listReducer,
	errors: errorReducer,
});
