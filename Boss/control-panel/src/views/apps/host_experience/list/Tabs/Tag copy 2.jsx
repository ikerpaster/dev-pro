import React, { useState } from 'react';
import { Box, Typography, TextField, Chip } from '@mui/material';

const Tag = () => {
  const [personName, setPersonName] = useState([]);
  const [typedName, setTypedName] = useState('');

  const handleAddName = () => {
    if (typedName.trim() !== '') {
      setPersonName((prevNames) => [...prevNames, typedName]);
      setTypedName('');
    }
  };

  const handleDelete = (nameToDelete) => () => {
    setPersonName((prevNames) => prevNames.filter((name) => name !== nameToDelete));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', '& > *': { mt: 4, maxWidth: 500 } }}>
      <div>
        <Typography sx={{ mb: 2, fontWeight: 500 }}>TextField with Chip-Like Appearance</Typography>
        <TextField
        fullWidth
          label="Add a Name"
          value={typedName}
          onChange={(e) => setTypedName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddName();
            }
          }}
          InputProps={{
            endAdornment: (
              <Box className="flex">
                {personName.map((name) => (
                  <Chip
                    key={name}
                    label={name}
                    onDelete={handleDelete(name)}
                    sx={{ m: 0.75 }}
                  />
                ))}
              </Box>
            ),
          }}
          sx={{ '& input': { display: 'block' } }} // Ensure the input text is visible
        />
        {/* <button onClick={handleAddName}>Add</button> */}
      </div>
    </Box>
  );
};

export default Tag;
