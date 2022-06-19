

// import React from 'react';
// import { AiFillDelete  } from 'react-icons/ai'
// import { FaThumbsUp } from 'react-icons/fa'
// import { Card, CardMedia, Button } from '@mui/material';
// import styles from './Post.module.css';
// import moment from 'moment';
// import EditPostModal from "../../modal/EditPostModal";
// import { useDispatch } from 'react-redux';
// import { deletePost } from '../../../actions/postsAction';


// export default function Post ({ post, set_current_id }) {

//   const dispatch = useDispatch();

//   return (
//     <Card elevation={3}>
//       <div className={styles.card}>
//       <div className={styles.overlay}>
//         <div>
//           <h4> 
//             { post.author } 
//             <i> <small> { moment(post.createdAt).fromNow() } </small> </i>
//             </h4>
//           </div>

//         <div className={styles.overlay2}>
//           <EditPostModal set_current_id={set_current_id} id={post._id} />
//         </div>
//       </div>
//       { post.selectedFile &&
//         <CardMedia component="img" image={post.selectedFile} title={post.title} height="150" />
//       }


//       <div className={styles.details}>
//         {
//           post.tags[0].trim().length > 0 &&
//           <p> <small> {post.tags[0].split(', ').map(tag => `#${tag} `)} </small> </p>
//         }
//       </div>

//       <div className={styles.content}>
//         <h4> {post.title} </h4>
//         <p className={styles.message}> {(post.message).slice(0, 120)}... </p>
//       </div>
      
//       <div className={styles.cardActions}>
//         <Button size="small" sx={{color: 'purple'}} onClick={() => {}}> 
//           <p> <FaThumbsUp /> {post.likeCount} </p>
//         </Button>
//         <Button size="small" sx={{color: 'darkred'}} onClick={() => { dispatch(deletePost(post._id)) }}> 
//           <AiFillDelete fontSize="large" /> 
//         </Button>
//       </div>
//     </div>


//     </Card>
//   )
// }



























import React from 'react';
import { FaThumbsUp, FaHeart } from 'react-icons/fa'
import { Card, CardMedia, Button } from '@mui/material';
import styles from './Post.module.css';
import moment from 'moment';
import EditPostModal from "../../modal/EditPostModal";
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/postsAction';
import DeleteModal from '../../modal/DeletePostModal';


export default function Post ({ post, set_current_id }) {

  const dispatch = useDispatch();

  return (
    <Card elevation={3}>
      <div className={styles.card}>
      <div className={styles.overlay}>
        <div>
          <h4> 
            { post.author } 
            <i> <small> { moment(post.createdAt).fromNow() } </small> </i>
          </h4>
          </div>

        <div className={styles.overlay2}>
          <EditPostModal set_current_id={set_current_id} id={post._id} />
        </div>
      </div>
      { post.selectedFile &&
        <CardMedia component="img" image={post.selectedFile} title={post.title} height="150" />
      }


      <div className={styles.details}>
        {
          post.tags[0].trim().length > 0 &&
          <p> <small> {post.tags[0].split(', ').map(tag => `#${tag} `)} </small> </p>
        }
      </div>

      <div className={styles.content}>
        <h4> {post.title} </h4>
        <p className={styles.message}> {(post.message).slice(0, 120)}... </p>
      </div>
      
      <div className={styles.cardActions}>
        <Button sx={{color: 'purple'}} onClick={() => { dispatch(likePost(post._id)) }}> 
          <p> <FaHeart fontSize="1.4em"/> {post.likeCount} </p>
        </Button>

        <DeleteModal id={post._id} />
        
      </div>
    </div>


    </Card>
  )
}