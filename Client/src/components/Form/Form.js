

import React from 'react';
import styles from './Form.module.css';
import { TextField, Button, CircularProgress } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/postsAction';
import { useSelector } from 'react-redux';




export default function Form ({ current_id, set_current_id, handleClose }) {

  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch();

  // Get single post if current_id exists or return null
  const post = useSelector( state => current_id ? state.posts.find(p => p._id == current_id) : null )
  const [loading, set_loading] = React.useState(false)
  const [form_data, set_form_data] = React.useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });


  React.useEffect(() => {
    if(post) set_form_data(post);
  }, [post])


  function handle_change (e) {
    set_form_data ( prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  function clear () {
    set_form_data({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  }

  function handle_submit (e) {
    e.preventDefault();
    const { title, message } = form_data;
    
    if( title.trim().length < 1 || message.trim().length < 1 ) {
      alert('Fill all required fields');
      return;
    }

    if(current_id) {
      // Dispatch updatePost if id exists
      dispatch(updatePost(current_id, { ...form_data, name: user?.result?.name }));
      alert('Post Updated successfully');
      set_current_id(null)
      clear();
      
    }
    else {
      // dispatch createPost
      dispatch(createPost({ ...form_data, name: user?.result?.name }));
      alert('Post created successfully');
      handleClose()
      set_current_id(null)
      clear();
    }

    handleClose()

  }






  return (
    <div className={styles.container}>
      <h2> { current_id ? "Edit" : "Create"} Your Echo </h2>
      <form autoComplete='off' noValidate onSubmit={handle_submit}>
        <TextField 
          variant='outlined' 
          label='Title *'
          fullWidth
          size='small'
          name='title'
          value={ form_data.title }
          onChange = { handle_change } 
          sx = {{ marginBottom: '3%'}} />

        <TextField 
          variant='outlined' 
          label='Message *'
          fullWidth
          size='small'
          name='message'
          value={ form_data.message }
          onChange = { handle_change } 
          sx = {{ marginBottom: '0%'}}
          inputProps= {{maxLength: 450}}
          multiline
          rows={4} />

        <i className={styles.indicator}> <small> 
          {form_data.message.length} characters, {450 - form_data.message.length} remaining
        </small> </i>

        <TextField 
          variant='outlined' 
          label='Tags'
          fullWidth
          size='small'
          name='tags'
          value={ form_data.tags }
          onChange = { handle_change } 
          sx = {{ marginBottom: '3%', marginTop: '2%'}} />

          {/* <div className={styles.file_input}>
            <FileBase 
              type = 'file'
              multiple = {false}
              onDone = {({base64}) => set_form_data(prev => ({...prev, "selectedFile": base64}))}
            />
          </div> */}
          <br />

          <Button variant='contained' type='submit' sx={{
            background: 'purple',
            '&:hover': {
              background: 'rgb(194, 0, 194)'
            }
            }}> 
            { loading ? <CircularProgress sx={{color: 'white'}} /> : (current_id ? "Edit" : "Echo") } 
          </Button>
          <Button size='small' sx={{color: 'purple'}} onClick={clear}> Clear </Button>

      </form>
    </div>
  )
}