

import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';


export function getPosts () {
  return async ( dispatch ) => {
    try {
      const { data } = await api.getPosts();
      dispatch ({ type: FETCH_ALL, payload: data })
    }
    catch (error) {
      console.log(error.message)
    }
  }
}


export function createPost ( newPost ) {
  return async ( dispatch ) => {
    try {
      const {data} = await api.createPost(newPost);
      dispatch ({ type: CREATE, payload: data })
    }
    catch (error) {
      console.log(error.message)
    }
  }
}


export function updatePost ( id, updated_post ) {
  return async ( dispatch ) => {
    try {
      const {data} = await api.updatePost(id, updated_post);
      dispatch ({ type: UPDATE, payload: data })
    }
    catch (error) {
      console.log(error.message)
    }
  }
}



export function deletePost (id) {
  return async ( dispatch ) => {
    try {
      await api.deletePost(id);
      dispatch({ type: DELETE, payload: id })
    }
    catch (error) {
      console.log(error)
    }
  }
}




export function likePost (id) {
  return async ( dispatch ) => {
    try {
      const {data} = await api.likePost(id);

      dispatch({ type: LIKE, payload: data }) 
    }
    catch (error) {
      console.log(error)
    }
  }
}







