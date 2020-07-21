// this is the main page for all reducers
import { combineReducers } from 'redux';
import UserListReducer from './UserListReducer';
const reducers = combineReducers({
    UserListReducer
});
export default reducers;