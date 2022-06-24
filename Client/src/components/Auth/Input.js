import React from 'react';
import { InputAdornment, IconButton, TextField } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';



const Input = ({ name, label, type, handleChange, autoFocus, handleShowPassword }) => {
  return (
    <TextField
      name = { name }
      label = { label }
      variant= "outlined"
      onChange = { handleChange }
      required
      fullWidth
      sx = {{
        marginBottom: '5%',
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #800080",
          borderRadius: "5px 5px 0 0",
        },
      }}
      type={type}
      size = "small"
      autoFocus = {autoFocus}
      InputLabelProps={{style : {color : 'black', fontSize: '0.9em'} }}
      InputProps = { name === 'password' ? {
        endAdornment : (
          <InputAdornment position='end'>
            <IconButton onClick={handleShowPassword}>
              { type === 'password' ? <MdVisibility /> : <MdVisibilityOff /> }
            </IconButton>
          </InputAdornment>
        )
      } : null }
      
    />
  )
}

export default Input