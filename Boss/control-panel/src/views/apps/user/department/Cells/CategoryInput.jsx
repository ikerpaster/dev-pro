'use client'
import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};


const CustomCategoryCell = ({ depData, setDepData }) => {
  let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/amenities-category/all`;
 
  const { data, isLoading, error:Error } = useSWR(
        url,
        fetcher,
        {
          revalidateOnFocus: true, // Enable real-time revalidation
          fallback: <div>Loading...</div>,
        }
      );
    
      console.log("RESULTOSS USER:: ", data);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepData({ ...depData, [name]: value });
  };

  return (
    <div className='w-full'>
      <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='country-select'>Category</InputLabel>
                <Select
                  fullWidth
                  placeholder='UK'
                  label='Category'
                  name='catName'
                  labelId='country-select'
                  defaultValue='Select Category'
                  value={depData.catName}
                  onChange={handleInputChange}
                >
                  <MenuItem value='Select Country'>Select Category</MenuItem>
                  {data?.map((e,i)=>(
  <MenuItem key={i} value={e._id}>{e.name}</MenuItem>
                  ))}
                
               
                </Select>
              </FormControl>
            </Grid>

      {/* <TextField
        className='w-full'
        fullWidth
        label='New Department Name'
        name='catName'
        value={depData.name}
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
      /> */}
    </div>
  );
};

export default CustomCategoryCell;
