import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Form from '../Form/Form';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({set_current_id}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button variant="outlined" onClick={handleClickOpen} style={{
        background: '#FF9D00',
        color: 'white',
        height: '40px',
        width: '80%',
        display: 'block',
        margin: '0 auto',
        outline: 0,
        border: 0,
        fontSize: '1em',
        cursor: 'pointer',
        '&:hover': {
          background: 'rgb(194, 0, 194)'
        },
      }}
      >
        Make an Echo
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Form handleClose={handleClose} set_current_id={set_current_id} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}