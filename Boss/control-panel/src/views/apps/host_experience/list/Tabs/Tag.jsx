import React, { useState } from 'react';
import { Box, Typography, TextField, Chip } from '@mui/material';

const Tag = ({setActivities,activities}) => {
  const [personName, setPersonName] = useState([]);
  const [typedName, setTypedName] = useState('');

  const handleAddName = () => {
    if (typedName.trim() !== '') {
      setPersonName((prevNames) => [...prevNames, typedName]);
      setTypedName('');
    }
  };

  const handleDelete = (deletedName) => {
    const updatedNames = personName.filter((name) => name !== deletedName);
    setPersonName(updatedNames);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', '& > *': { mt: 4, maxWidth: 500 } }}>
      <div>
        <Typography sx={{ mb: 2, fontWeight: 500 }}>What Should Your Guest Bring</Typography>
        <TextField
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse', // Start from right to left
                  flexWrap: 'wrap',
                  gap: '8px',
                  alignItems: 'flex-start',
                  width: '70%', // Set a static width for the Box
                  overflowY: 'auto', // Enable vertical scrolling
                  maxHeight: '100px', // Set a maximum height for the box
                }}
              >
                 {[...personName].reverse().map((name) => (
                  <Chip
                    key={name}
                    label={name}
                    onDelete={() => handleDelete(name)}
                    sx={{ m: 0.75 }}
                  />
                ))}
              </Box>
            ),
          }}
          sx={{ '& input': { flex: '1' } }}
          fullWidth
        />
        {/* <button onClick={handleAddName}>Add</button> */}
      </div>
    </Box>
  );
};

export default Tag;
