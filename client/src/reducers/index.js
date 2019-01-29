import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import heartReducer from './heartReducer';
import listReducer from './listReducer';

export default combineReducers({
	auth: authReducer,
	hearted: heartReducer,
	errors: errorReducer,
	list: listReducer,
});
