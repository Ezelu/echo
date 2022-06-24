
// import React from 'react'
// import { Avatar, Button } from '@mui/material';
// import styles from './Auth.module.css';
// import { FaLock } from 'react-icons/fa'
// import Input from './Input';
// import { GoogleLogin } from 'react-google-login';
// import { gapi } from 'gapi-script'
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom'





// export default function Auth () {

//   // Initialize the google oauth2
//   React.useEffect(() => {
//     function start() {
//       gapi.client.init({
//         clientId:'33587543650-j9r3nca5nr42q6708pas34nhipkaigfd.apps.googleusercontent.com',
//         scope: ""
//       })
//     }

//     gapi.load('client: auth2', start)
//   }, [])

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = React.useState(false)
//   const [isSignup, setIsSignup] = React.useState(false);


//   const handleShowPassword = () => setShowPassword( prev => !prev )
//   const switchMode = () => {
//     setIsSignup(prev => !prev);
//     setShowPassword(false)
//   }

//   const handleChange = () => {

//   }
  
//   const handleSubmit = () => {

//   }

//   const googleSuccess = async (res) => {
//     const result = res?.profileObj;
//     const token = res?.tokenId;

//     try {
//       dispatch({type: 'AUTH', data: { result, token}});
//       navigate('/')
//     }
//     catch (error) {
//       console.log(error)
//     }
//   }

//   const googleFailure = (error) => {
//     console.log(error)
//     console.log("GOOGLE SIGN IN WAS UNSUCCESSFUL, TRY AGAIN")
//   }




//   return (
//     <div className={styles.container}>
//         <Avatar className={styles.avatar} sx={{background: '#800080'}}>
//           <FaLock className={styles.lock} />
//         </Avatar>
//         <h2> {isSignup ? "Register" : "Login"}  </h2>

//         <form onSubmit={handleSubmit}>
//          {
//           isSignup && (
//             <>
//               <Input type='text' name="firstName" label="First Name" autoFocus handleChange={handleChange} />
//               <Input type='text' name="lastName" label="Last Name" handleChange={handleChange} />
//             </>
             
//         )}
//             <Input type='email' name="email" label="Email" handleChange={handleChange} />
//             <Input type={showPassword ? 'text' : 'password'} name="password" label="password" handleChange={handleChange} handleShowPassword={handleShowPassword} />
//         {
//           isSignup && 
//             <Input type='password' name="confirmPassword" label="Confirm Password" handleChange={handleChange} handleShowPassword={handleShowPassword} />
//         }


//           <button type='submit' className={styles.button}> {isSignup ? "Register" : "Login"} </button>

//           <GoogleLogin 
//             clientId = '33587543650-j9r3nca5nr42q6708pas34nhipkaigfd.apps.googleusercontent.com'
//             buttonText = "Continue with Google"
//             onSuccess = {googleSuccess}
//             onFailure = {googleFailure}
//             cookiePolicy="single_host_origin"
//             isSignedIn = { true }
//           /> 

//           <i onClick={switchMode}> 
//             {isSignup ? "Already have an account?, Login" : "Don't have an account?, Register"} 
//           </i> 
//         </form> 
//      </div>
//   )
// }








































import React from 'react';
import { Avatar, Button } from '@mui/material';
import styles from './Auth.module.css';
import { FaLock } from 'react-icons/fa';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, signIn } from '../../actions/authAction';





export default function Auth () {

  // Initialize the google oauth2
  React.useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:'33587543650-j9r3nca5nr42q6708pas34nhipkaigfd.apps.googleusercontent.com',
        scope: ""
      })
    }

    gapi.load('client: auth2', start)
  }, [])



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSignup, setIsSignup] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })


  const handleShowPassword = () => setShowPassword( prev => !prev )
  const switchMode = () => {
    setIsSignup(prev => !prev);
    setShowPassword(false)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }
  


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if ( isSignup ) {
      dispatch( register(formData, navigate) )
    }
    else {
      dispatch( signIn(formData, navigate) )
    }
  }



  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({type: 'AUTH', data: { result, token}});
      navigate('/')
    }
    catch (error) {
      console.log(error)
    }
  }
  
  
  const googleFailure = (error) => {
    console.log(error)
    console.log("GOOGLE SIGN IN WAS UNSUCCESSFUL, TRY AGAIN")
  }




  return (
    <div className={styles.container}>
        <Avatar className={styles.avatar} sx={{background: '#800080'}}>
          <FaLock className={styles.lock} />
        </Avatar>
        <h2> {isSignup ? "Register" : "Login"}  </h2>

        <form onSubmit={handleSubmit}>
         {
          isSignup && (
            <>
              <Input type='text' name="firstName" label="First Name" autoFocus handleChange={handleChange} value={formData.firstName} />
              <Input type='text' name="lastName" label="Last Name" handleChange={handleChange} value={formData.lastName} />
            </>
             
        )}
            <Input type='email' name="email" label="Email" handleChange={handleChange} value={formData.email}/>
            <Input type={showPassword ? 'text' : 'password'} name="password" label="password" handleChange={handleChange} handleShowPassword={handleShowPassword} value={formData.password}/>
        {
          isSignup && 
            <Input type='password' name="confirmPassword" label="Confirm Password" handleChange={handleChange} handleShowPassword={handleShowPassword} value={formData.confirmPassword}/>
        }


          <button type='submit' className={styles.button}> {isSignup ? "Register" : "Login"} </button>

            <GoogleLogin 
              clientId = '33587543650-j9r3nca5nr42q6708pas34nhipkaigfd.apps.googleusercontent.com'
              buttonText = "Continue with Google"
              onSuccess = {googleSuccess}
              onFailure = {googleFailure}
              cookiePolicy="single_host_origin"
              isSignedIn = { true }
              /> 


          <i onClick={switchMode}> 
            {isSignup ? "Already have an account?, Login" : "Don't have an account?, Register"} 
          </i> 
        </form> 
     </div>
  )
}





