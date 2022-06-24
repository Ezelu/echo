

import { Link, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import styles from './NavBar.module.css';
import { Avatar, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';
import Logout from '../modal/LogoutModal';
import decode from 'jwt-decode';





export default function NavBar () {

  const [user, set_user] = React.useState(JSON.parse(localStorage.getItem('profile')));

  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const logout = () => {
    localStorage.clear();
    navigate('/auth')

  }


  React.useEffect(() => {
    const token = user?.token

    // JWT...
    if(token) {
      const decodedToken = decode(token);

      // Log user out if the token has expired
      if((decodedToken.exp * 1000) < new Date().getTime()) {
        logout()
      }
    }



    set_user(JSON.parse(localStorage.getItem('profile')))
  }, [location])










  return (
    <nav className={styles.nav}>
      <div>
        <Link to='/' style={{textDecoration: 'none'}}> <h1> Echo </h1> </Link>
      </div>

      <div>
        {
          user ?
          (
            <div className={styles.profile}>
              <Avatar alt={user.result.name} src={user.result.imageUrl} sx={{background: 'purple'}} >
                {(user.result.name.charAt(0)).toUpperCase()}
              </Avatar>
              <p> {user.result.name} </p>

              <Logout set_user={set_user} />
            </div>
          ) : 
          (
            <Button component={Link} to="/auth" sx={{
              background: 'purple',
              '&:hover': {
                background: 'rgb(160, 0, 160)'
              }
            }} variant='contained'> 
              Login 
            </Button> 
          )
        }
      </div>
    </nav>
  )
}














// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import React from 'react';
// import styles from './NavBar.module.css';
// import { Avatar, Button } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux';
// import { gapi } from 'gapi-script';




// export default function NavBar () {

//   // const user = useSelector(state => state.auth.authData);
//   const [user, set_user] = React.useState(JSON.parse(localStorage.getItem('profile')))
//   console.log(user);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   React.useEffect(() => {
//     const token = user?.token

//     // JWT...

//     set_user(JSON.parse(localStorage.getItem('profile')))
//   }, [location])


//   // const logout = () => {
//   //   dispatch({type: 'LOGOUT'});
//   //   navigate('/');
//   //   set_user(null);

//   //   // Disable auto login of accounts
//   //   let auth2 = gapi.auth2.getAuthInstance();
//   //   auth2.disconnect();
//   // }











//   return (
//     <nav className={styles.nav}>
//       <div>
//         <Link to='/' style={{textDecoration: 'none'}}> <h1> Echo </h1> </Link>
//       </div>

//       <div>
//         {
//           user ?
//           (
//             <div className={styles.profile}>
//               <Avatar alt={user.result.name} src={user.result.imageUrl}>
//                 {user.result.name.charAt(0)}
//               </Avatar>
//               <p> {user.result.name} </p>
//               <Button variant='contained' sx={{
//               background: 'rgb(100, 0, 0)',
//               '&:hover': {
//                 background: 'darkred'
//               }
//             }} onClick={logout}> Logout </Button>
//             </div>
//           ) : 
//           (
//             <Button component={Link} to="/auth" sx={{
//               background: 'purple',
//               '&:hover': {
//                 background: 'rgb(160, 0, 160)'
//               }
//             }} variant='contained'> 
//               Login 
//             </Button> 
//           )
//         }
//       </div>
//     </nav>
//   )
// }

