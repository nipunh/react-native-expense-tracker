import * as actionTypes from './actionTypes';
import {updateObject} from '../utility';

const initState = {
  uid: '',
  email: '',
  displayName: '',
  error: false,
  loading: false,
  success : false,
  successMessage : '',
  errorMessage : ''
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOADING:
      return updateObject(state, {loading: true});
      
    case actionTypes.ERROR:
        return updateObject(state, {error: true, loading : false, errorMessage : action.errorMessage});
    
    case actionTypes.RESET:
        return updateObject(state, {
            error: false,
            loading: false,
            success : false,
            successMessage : '',
            errorMessage : ''
        })

    case actionTypes.LOGIN:
      return updateObject(state, {
        uid: action.userDetails.id,
        email: action.userDetails.email,
        displayName: action.userDetails.name,
        loading: false,
      });

    case actionTypes.SIGNUP:
        return updateObject(state, {
            loading : false,
            success : true,
            successMessage : 'New user created successfully...'
        })
    case actionTypes.LOGOUT:
        return initState

    default:
      return state;
  }
}
