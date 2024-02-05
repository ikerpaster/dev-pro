import React, { useState } from 'react';
import { TextField, IconButton, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { Add, Close, DeleteForeverOutlined, Remove } from '@mui/icons-material';
import { TrashIcon } from '@heroicons/react/24/solid';
 

const Inclusion = ({inclussion, setInclussion}) => {
  const [items, setItems] = useState([{ id: 1 }]); // State to manage items

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <div className='pr-2'>
      <Box sx={{ mb: 2 }}>
        Inclusion (What You will provide)
      </Box>
      {items.map((item, i) => (
        <div key={item.id} className="grid grid-cols-2 gap-2 w-full">
          <TextField size='small' fullWidth sx={{ mb: 4 }} label="Provide Item" placeholder="Provide Item" />
          <TextField size='small' fullWidth sx={{ mb: 4 }} label="Language" placeholder="Language" />
          <TextField size='small' fullWidth sx={{ mb: 4 }} label="Name Item" placeholder="Name Item" />
          <TextField size='small' fullWidth sx={{ mb: 4 }} label="Additional details" placeholder="Additional details" />
          <span>&nbsp;</span>
          {i > 0 && (
            <div className='flex justify-end w-full bg-green-300x -mt-5 my-3'>
            <div onClick={() => removeItem(item.id)} className="w-fit cursor-pointer float-right bg-red-600 text-center p-1 rounded-xl text-white hover:bg-red-800 transition transform ease-in-out duration-500">
              <DeleteForeverOutlined /> 
            </div>
            </div>
          )}
        </div>
      ))}
      
      <button className="w-fit cursor-pointer float-right bg-violet-400 text-center p-1 rounded-xl text-white hover:bg-violet-700 transition transform ease-in-out duration-500" onClick={addItem}>
        <Add />
      </button>
     
      
    
      <TextField size='small' fullWidth sx={{ mb: 4,my:5 }} label='Additional Notes' placeholder='Additional Notes' />
      
    </div>
  );
};

export default Inclusion;
