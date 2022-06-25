// import axios from 'axios';


// // const url = "https://echo-social-app.herokuapp.com/posts";
// const url = 'http://localhost:5000/posts';

// export const getPosts = () => axios.get(url);
// export const createPost = (newPost) => axios.post(url, newPost);
// export const updatePost = (id, updated_post) => axios.patch(`${url}/${id}`, updated_post);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)









import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000'})
// const url = "https://echo-social-app.herokuapp.com/posts";

const API = axios.create({ baseURL: 'https://echo-social-app.herokuapp.com'})


// A function that happens on each request and allows the interceptors to work
API.interceptors.request.use((req) => {
  if( localStorage.getItem('profile') ) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req;
})



export const getPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updated_post) => API.patch(`/posts/${id}`, updated_post);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


export const signIn = ( formData ) => API.post(`/users/signIn`, formData);

export const register = ( formData ) => API.post(`/users/register`, formData);