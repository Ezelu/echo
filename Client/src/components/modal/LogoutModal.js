import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { FaPowerOff } from 'react-icons/fa';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';





export default function Logout ({ set_user }) {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    set_user(null);
    navigate('/auth');

    // Disable auto login of accounts
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect();

  }







  return (
    <div>
      <FaPowerOff 
        onClick={handleClickOpen} 
        size="1.2em"
        title="logout"
        style={{
          cursor: 'pointer', 
          color: 'darkred',
        }}/>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          LOGOUT?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel </Button>
          <Button onClick={() => {
            logout();
            handleClose()
          }}
          sx={{color: 'red'}}
          autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
