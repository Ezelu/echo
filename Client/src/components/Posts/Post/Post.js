
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Card, CardMedia, Button, Avatar } from '@mui/material';
import styles from './Post.module.css';
import moment from 'moment';
import EditPostModal from "../../modal/EditPostModal";
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/postsAction';
import DeleteModal from '../../modal/DeletePostModal';
import Linkify from 'react-linkify';







export default function Post ({ post, set_current_id }) {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const likes = post.likes.length

  const Likes = () => {
    return post.likes.find( like => like === (user?.result?.googleId || user?.result._id)) ?
    (
      <>  <FaHeart fontSize="1.4em" style={{color: 'purple', cursor: 'pointer'}} /> &nbsp;
          {likes > 1 ? `You and ${likes - 1} other${likes > 2 ? "s" : ""}` :
          `${likes} like${likes > 1 ? 's' : ''}`} 
      </> )
      :
    ( <>  <FaRegHeart fontSize="1.4em" style={{color: 'purple', cursor: 'pointer'}} /> &nbsp;
          { `${likes > 1 ? `${likes} likes` : `${likes} like`}`} 
      </>
    )
  }










  return (
    <Card elevation={3}>
      <div className={styles.card}>
      <div className={styles.overlay}>
        <div>
          <h4> 
            <Avatar sx={{background: 'purple'}}>
              {(post?.name.split(' ')[0].charAt(0)).toUpperCase()}
              {(post?.name.split(' ')[1].charAt(0)).toUpperCase()}
            </Avatar> &nbsp;
            { post.name } &nbsp;
            <i> <small> { moment(post.createdAt).fromNow() } </small> </i>
          </h4>
          </div>

        <div className={styles.overlay2}>
          {
            (user?.result?.googleId == post?.author || user?.result?._id === post?.author) &&
            <EditPostModal set_current_id={set_current_id} id={post._id} />
          }
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

      {/* <div className={styles.content}>
        <h4> {post.title} </h4>
        <p className={styles.message}> {(post.message).slice(0, 120)}... </p>
      </div> */}
      <div className={styles.content}>
        <h4> {post.title} </h4>
        <Linkify properties={{
          target: "_blank",
          style: {color: 'purple', textDecoration: 'none'}
        }}>
          <p className={styles.message}> { post.message }... </p> 
        </Linkify>
      </div>
      
      <div className={styles.cardActions}>
        
        {
          user?.result ?
          <button onClick={() => { dispatch(likePost(post._id)) }} className={styles.button}> 
            {
              user?.result ?
              <Likes /> :
              <> &nbsp;{post.likes.length} like{post.likes.length > 1 ? 's' : ""} </>
            }
          </button>
          :
          <button className={styles.button}> 
            {
              user?.result ?
              <Likes /> :
              <> &nbsp;{post.likes.length} like{post.likes.length > 1 ? 's' : ""} </>
            }
          </button>
        }


        {
          (user?.result?.googleId == post?.author || user?.result?._id === post?.author) &&
            <DeleteModal id={post._id} />
        }
        
      </div>
    </div>


    </Card>
  )
}



















