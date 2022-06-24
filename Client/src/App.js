

import React from 'react';
import styles from './App.module.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home'
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';

// "proxy": "http://localhost:5000",

export default function App() {

  return (
      <main className={styles.container_all}>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </main>
  );
}




