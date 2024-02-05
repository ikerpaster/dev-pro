'use client'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const Pricing = ({pricingInfo, setPricingInfo}) => {

 
const BookingTerms = [
  {
    name:"flexible",
    value:"flexible"
  },
  {
    name:"Moderate",
    value:"Moderate"
  },

  {
    name:"strict",
    value:"strict"
  },
 
      
];

 

  return (
    <div className="w-full bg-white rounded-lg ">
   
  
  <div className='w-full grid grid-cols-2 gap-2'>
  {/* <FormControl className='flex flex-1 w-full'>
        <InputLabel style={{  marginTop: '-10px' }}>Booking Type</InputLabel>
        <Select  label='Booking Type' defaultValue=''
 

       value={pricingInfo.bookingType}
       onChange={(e) => setPricingInfo({ ...pricingInfo, bookingType: e.target.value })}

       style={{ height: '32px' }}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       
       {BOOKINGTYPE.map((e,i)=>(
 <MenuItem key={i} value={e.value}>{e.name}</MenuItem>
       ))}
         
           
        </Select>
      </FormControl> */}

      {/* <FormControl className='flex flex-1 w-full'>
        <InputLabel style={{  marginTop: '-10px' }}>Select Terms</InputLabel>
        <Select  label='Select Terms' defaultValue=''
 
      value={pricingInfo.terms}
      onChange={(e) => setPricingInfo({ ...pricingInfo, terms: e.target.value })}

       style={{ height: '32px' }}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       
       {BookingTerms.map((e,i)=>(
 <MenuItem key={i} value={e.value}>{e.name}</MenuItem>
       ))}
         
        </Select>
      </FormControl> */}
  </div>
        


    <div className="text-lg font-bold mb-4 mt-3">Pricing</div>
 
 
<div className='w-full grid grid-cols-2 gap-2 py-3'>

{/* <Box>
<TextField 
size='small'
type='number'
 label='Cleaning Fee' 
 value={pricingInfo.cleaningFee}
 onChange={(e) => setPricingInfo({ ...pricingInfo, cleaningFee: e.target.value })}
 />
  </Box> */}

      {/* <Box>
<TextField 
size='small'
type='number'
 label='Additional Guest Fee' 
 value={pricingInfo.additionalGuestFee}
 onChange={(e) => setPricingInfo({ ...pricingInfo, additionalGuestFee: e.target.value })}
 />
  </Box> */}

 
{/* 
      <Box>
<TextField 
size='small'
type='number'
 label='Guests' 
 value={pricingInfo.guests}
          onChange={(e) => setPricingInfo({ ...pricingInfo, guests: e.target.value })}
 />

  </Box> */}

  {/* <Box>
<TextField 
size='small'
type='number'
 label='Security Deposit' 
 value={pricingInfo.securityDeposit}
 onChange={(e) => setPricingInfo({ ...pricingInfo, securityDeposit: e.target.value })}
 />

  </Box> */}
 

      {/* <Box>
<TextField 
size='small'
type='number'
 label='Weekend Price' 
 value={pricingInfo.weekendPrice}
 onChange={(e) => setPricingInfo({ ...pricingInfo, weekendPrice: e.target.value })}
 />

  </Box> */}

  </div>
 
    </div>
  );
};

export default Pricing;
