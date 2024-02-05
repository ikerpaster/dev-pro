import React, { useState } from 'react';
import { TextField } from '@mui/material';

const CustomerDescrInputEdit = ({iconUrl, setIconUrl}) => {
  // const [description, setDescription] = useState('');
 
  const handleInputChangeEd = (event) => {
    setIconUrl(event.target.value);
  };

  return (
    <div className='w-full'>
      <TextField
        className='w-full'
        fullWidth
        label='iconUrl'
        name='iconUrl'
        value={iconUrl}
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

