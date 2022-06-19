import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Form from '../Form/Form';
import { CgMoreO } from 'react-icons/cg'






const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});






export default function AlertDialogSlide({set_current_id, id}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CgMoreO 
      style={{color: "purple", cursor: 'pointer'}}
      onClick={() => { 
        handleClickOpen();
        set_current_id(id)
      }} />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Form current_id={id} set_current_id={set_current_id} handleClose={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}