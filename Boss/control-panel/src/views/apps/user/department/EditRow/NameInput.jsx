import React, { useState } from 'react';
import { TextField } from '@mui/material';

const CustomerDescrInputEdit = ({depName, setDepatNAme}) => {
  // const [depName, setDepatNAme] = useState('');

  const handleInputChangeEd = (event) => {
    setDepatNAme(event.target.value);
  };

  return (
    <div className='w-full'>
      <TextField
        className='w-full'
        fullWidth
        label='New Department Name'
        name='depName'
        value={depName}
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

