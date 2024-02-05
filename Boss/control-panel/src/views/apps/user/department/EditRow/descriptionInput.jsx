import React, { useState } from 'react';
import { TextField } from '@mui/material';

const CustomerDescrInputEdit = ({description, setDescription}) => {
 

  const handleInputChangeEd = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className='w-full'>
      <TextField
        className='w-full'
        fullWidth
        label='Description'
        name='description'
        value={description}
        onChange={handleInputChangeEd}
        variant='outlined'
        margin='normal'
        InputLabelProps={{
          shrink: true
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            height: '36px',
            lineHeight: '36px',
            paddingTop: '9px'
          }
        }}
      />
    </div>
  );
};

export default CustomerDescrInputEdit;

