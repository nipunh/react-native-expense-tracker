import * as actionTypes from './actionTypes';
import {updateObject} from '../utility';
import { COLORS, icons } from '../../constants';

const initState = {
  expenses: [],
  error: false,
  loading: false,
  success: false,
  successMessage: '',
  errorMessage: '',
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOADING:
      return updateObject(state, {loading: true});

    case actionTypes.ERROR:
      return updateObject(state, {
        error: true,
        loading: false,
        errorMessage: action.errorMessage,
      });

    case actionTypes.RESET:
      return updateObject(state, {
        error: false,
        loading: false,
        success: false,
        successMessage: '',
        errorMessage: '',
      });

    case actionTypes.SUCCESS:
      return updateObject(state, {
        loading : false,
        success : true,
        successMessage : action.successMessage
      })

    case actionTypes.GET_EXPENSES:
      return updateObject(state, {
        loading: false,
        expenses : [...action.expenseData]
      });

    case actionTypes.ADD_EXPENSES :
      return updateObject(state, {
        loading : false,
        expenses : [...state.expenses, action.newExpense]
      })

    default:
      return state;
  }
}
