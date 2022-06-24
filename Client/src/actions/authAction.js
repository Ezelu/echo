import * as api from '../api';
import { AUTH } from '../constants/actionTypes';



export function signIn ( formData, navigate ) {
  return async ( dispatch ) => {
    try {
      const { data } = await api.signIn(formData);
      
      dispatch({type: AUTH, data})
      navigate('/')
    }
    catch ( error ) {
      console.log(error);
    }
  }
}








export function register ( formData, navigate ) {
  return async ( dispatch ) => {
    try {
      const { data } = await api.register(formData);
      
      dispatch({type: 'AUTH', data})
      // Register the user

      navigate('/')
    }
    catch ( error ) {
      console.log(error);
    }
  }
}