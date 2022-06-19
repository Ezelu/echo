import React from 'react';
import Post from './Post/Post';
import { CircularProgress, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import styles from './Posts.module.css';


export default function Posts ({ set_current_id }) {
  const posts = useSelector((state) => state.posts);

  return (
    !posts.length ? <LinearProgress /> :
    (
      <div className={styles.container}>
        {
          posts.map(each => {
            return <div className={styles.box}> 
              <Post post={each} set_current_id={set_current_id} /> 
              </div>
          })
        }
      </div>
    )
  )
}