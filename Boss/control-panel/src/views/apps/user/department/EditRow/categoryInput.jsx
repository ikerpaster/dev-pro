'use client'
import React, { useState } from 'react';
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


const CustomerCategoryInputEdit = ({cateName, setCateName}) => {
  // const [depName, setDepatNAme] = useState('');
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
  const handleInputChangeEd = (event) => {
    setCateName(event.target.value);
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
                  name={cateName}
                  labelId='country-select'
                  defaultValue='Select Category'
                  value={cateName}
                  onChange={handleInputChangeEd}
                  sx={{ height: '30px' }}
                >
                  <MenuItem value='Select Country'>Select Category</MenuItem>
                  {data?.map((e,i)=>(
  <MenuItem key={i} value={e._id}>{e.name}</MenuItem>
                  ))}
                
               
                </Select>
              </FormControl>
            </Grid>

 
    </div>
  );
};

export default CustomerCategoryInputEdit;

