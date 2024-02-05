
  'use client'
import React from 'react';
import { TextField } from '@mui/material';

const CustomerDescrInput = ({ depData, setDepData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepData({ ...depData, [name]: value });
  };

  return (
    <div className='w-full'>
      <TextField
        className='w-full'
        fullWidth
        label='Description'
        name='description'
        value={depData.description}
        onChange={handleInputChange}
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

export default CustomerDescrInput;
