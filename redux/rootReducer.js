import { combineReducers } from 'redux';
import Auth from './auth/reducer'
import Expenses from './expense/reducer'

export default combineReducers({
    Auth,
    Expenses
});