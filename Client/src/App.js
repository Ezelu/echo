

import React from 'react';
import styles from './App.module.css';
import { Container, Typography, AppBar, Grow, Grid } from '@mui/material';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/postsAction';
import Modal from './components/modal/Modal';

// "proxy": "http://localhost:5000",

export default function App() {

  const [current_id, set_current_id] = React.useState(null)

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPosts())
  }, [current_id, dispatch])


  return (
      <main className={styles.container_all}>
        <nav className={styles.nav}>
          <h1 className={styles.header}> Echo </h1>
        </nav>

        <Modal /> <br />

        <Grow in>
            <div className={styles.posts}>
              <Posts set_current_id={set_current_id} />
            </div>
        </Grow>

      </main>
  );
}




