import axios from 'axios';


const url = "https://echo-social-app.herokuapp.com/posts";

export const getPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updated_post) => axios.patch(`${url}/${id}`, updated_post);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)
