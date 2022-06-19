
import { FETCH_ALL, UPDATE, CREATE, DELETE, LIKE } from '../constants/actionTypes';



export default function postsReducer ( posts = [], action ) {
  switch(action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [ ...posts, action.payload ];

    case UPDATE:
      // Return updated post if both ids match
      return posts.map(each => (each._id === action.payload._id) ? action.payload : each);

      case DELETE:
        return posts.filter(each => each._id !== action.payload);

      case LIKE:
        // Return updated post if both ids match
        return posts.map(each => (each._id === action.payload._id) ? action.payload : each);
        
    default:
      return posts;
  };
}
