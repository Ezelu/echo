
import React from 'react';
import styles from './Form.module.css';
import { TextField, Button, CircularProgress } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/postsAction';
import { useSelector } from 'react-redux';




export default function Form ({ current_id, set_current_id, handleClose }) {

  const dispatch = useDispatch();
  // Get single post if current_id exists or return null
  const post = useSelector( state => current_id ? state.posts.find(p => p._id == current_id) : null )
  const [loading, set_loading] = React.useState(false)
  const [form_data, set_form_data] = React.useState({
    author: '',
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
      author: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    })
  }

  function handle_submit (e) {
    e.preventDefault();
    const { author, title, message } = form_data;
    
    if(author.trim().length < 1 || title.trim().length < 1 || message.trim().length < 1) {
      alert('Fill all required fields');
      return;
    }

    if(current_id) {
      // Dispatch updatePost if id exists
      dispatch(updatePost(current_id, {...form_data}));
      alert('Post Updated successfully');
      set_current_id(null)
      clear();
      
    }
    else {
      // dispatch createPost
      dispatch(createPost({...form_data}));
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
          variant='standard' 
          label='author *'
          fullWidth
          size='small'
          name='author'
          value={ form_data.author }
          onChange = { handle_change } 
          sx = {{ marginBottom: '3%'}} />

        <TextField 
          variant='standard' 
          label='Title *'
          fullWidth
          size='small'
          name='title'
          value={ form_data.title }
          onChange = { handle_change } 
          sx = {{ marginBottom: '3%'}} />

        <TextField 
          variant='standard' 
          label='Message *'
          fullWidth
          size='small'
          name='message'
          value={ form_data.message }
          onChange = { handle_change } 
          sx = {{ marginBottom: '3%'}} />

        <TextField 
          variant='standard' 
          label='Tags'
          fullWidth
          size='small'
          name='tags'
          value={ form_data.tags }
          onChange = { handle_change } 
          sx = {{ marginBottom: '3%'}} />

          <div className={styles.file_input}>
            <FileBase 
              type = 'file'
              multiple = {false}
              onDone = {({base64}) => set_form_data(prev => ({...prev, "selectedFile": base64}))}
            />
          </div>
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