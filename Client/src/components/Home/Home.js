import React from 'react';
import { Grow } from '@mui/material';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/postsAction';
import styles from './Home.module.css';
import Modal from '../modal/Modal';




export default function Home () {

  const [current_id, set_current_id] = React.useState(null)
  // const user = JSON.parse(localStorage.getItem('profile'));
  const [user, set_user] = React.useState(null);

  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(getPosts())
  }, [current_id, dispatch]);

  React.useEffect(() => {
    set_user(JSON.parse(localStorage.getItem('profile')));
  }, [])
  
  return (
    <>
    {
      (!user?.result?.name) ? 
      (
        <p align='center' style={{color: 'white', marginBottom: '3%'}}> 
        Sign In to make an Echo
        </p>
      ) :
      (
        <> <Modal set_current_id={set_current_id} /> <br /> </>
      )
    }
      <Grow in>
        <div className={styles.posts}>
          <Posts set_current_id={set_current_id} />
        </div>
      </Grow>
    </>
  )
}