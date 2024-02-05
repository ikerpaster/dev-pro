 


import { Apps } from '@mui/icons-material';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import AddProType from 'src/views/apps/property/type/addProTypeModel';


const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]


const CheckinProcedure = ({checkInProcedure,setCheckInProcedure}) => {

  const LANGUAGE = [
    {
      _id:1,
      name:'ENglish'
    },
    {
      _id:2,
      name:'Arabic'
    },
    {
      _id:3,
      name:'French'
    }
  ];

  const [personName, setPersonName] = useState([])
  const [personNameNative, setPersonNameNative] = useState([])

  const handleChange = event => {
    setPersonName(event.target.value)
  }

  const [checkinTime,setCheckinTime] = useState();
const [checkOutTime,setCheckOutTime] = useState();

const CHECKIN_TIME =['FLexible'];
for(let i=12;i< 24; i++){
  let checkout = `${i}:AM`; 
CHECKIN_TIME.push(checkout);
}

const CHECKIN_OUT =['Flexible'];
for (let i = 2; i < 24; i++) {
  let checkin = `${i}:PM`; // Using correct template literal syntax
  CHECKIN_OUT.push(checkin);
}


  console.log("checkin Time:: ",CHECKIN_TIME);
  // start from 12 pm checkin 
  // check out srating from 2pm 
  return (
    <div className='w-full flex flex-col bg-white p-3'> 
      <h2 className="text-lg font-bold mb-2 mx-3">  Checkin</h2>
      {/* <hr /> */}

    <div className="w-full grid grid-cols-2 gap-4 px-4 items-center">
    
 
 
   
      {/* <div className='w-1/2'>
        <Typography sx={{ mb: 2, fontWeight: 500 }}>CheckIn</Typography>
        <FormControl fullWidth>
          <Select 
          size='small'
            // displayEmpty
            value={checkInProcedure.checkin}
        onChange={(e) => setCheckInProcedure({ ...checkInProcedure, checkin: e.target.value })}
    
          >
           
            {CHECKIN_TIME?.map((e, i) => (
            <MenuItem key={i} value={e}>{e} {i!==0 ? ':AM':''}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div> */}
 


<FormControl fullWidth sx={{mt:4}}>
          <InputLabel id='demo-multiple-name-label' sx={{ mt:-2}}>CheckIn*</InputLabel>
          <Select
            size='small'
            label='CheckIn*'
           className='relative'
            MenuProps={MenuProps}
            id='demo-multiple-name'
            labelId='demo-multiple-name-label'
            value={checkInProcedure.checkin}
            onChange={(e) => setCheckInProcedure({ ...checkInProcedure, checkin: e.target.value })}
          >
         
             {CHECKIN_TIME?.map((e, i) => (
            <MenuItem key={i} value={e}>{e} </MenuItem>
            ))}
 
          </Select>
        
        </FormControl>


        <FormControl fullWidth sx={{mt:4}}>
          <InputLabel id='demo-multiple-name-label' sx={{ mt:-2}}>CheckIn*</InputLabel>
          <Select
            // multiple
            size='small'
            label='CheckIn*'
           className='relative'
            MenuProps={MenuProps}
            id='demo-multiple-name'
            labelId='demo-multiple-name-label'
            value={checkInProcedure.checkout}
        onChange={(e) => setCheckInProcedure({ ...checkInProcedure, checkout: e.target.value })}
          >
         
         {CHECKIN_OUT?.map((e, i) => (
            <MenuItem key={i} value={e}>{e}</MenuItem>
            ))}
 
          </Select>
        
        </FormControl>
 
      {/* <div className='w-1/2'>
        <Typography sx={{ mb: 2, fontWeight: 500 }}>Checkin Out</Typography>
        <FormControl fullWidth>
          <Select
          size='small'
            // multiple
            displayEmpty
            value={checkInProcedure.checkout}
        onChange={(e) => setCheckInProcedure({ ...checkInProcedure, checkout: e.target.value })}
      
          >
           
           {CHECKIN_OUT?.map((e, i) => (
            <MenuItem key={i} value={e}>{e}:PM</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div> */}
    

  
      

      <Box className="">
<TextField
  size='small'
   id='outlined-basic'
 label='Space' 
 value={checkInProcedure.space}
          onChange={(e) => setCheckInProcedure({ ...checkInProcedure, space: e.target.value })}
 />

  </Box>

 

      <Box>
<TextField 
  size='small'
   id='outlined-basic'
 label='Guest Access' 
 value={checkInProcedure.guestAccess}
 onChange={(e) => setCheckInProcedure({ ...checkInProcedure, guestAccess: e.target.value })}
 />

  </Box>


      <Box>
<TextField 
  size='small'
  id='outlined-basic'
 label='Interaction with Guests' 
 value={checkInProcedure.interactionWithGuests}
          onChange={(e) => setCheckInProcedure({ ...checkInProcedure, interactionWithGuests: e.target.value })}
 />

  </Box>


      <Box>
<TextField 
  size='small'
  id='outlined-basic'
 label='Other Things to Note' 
 value={checkInProcedure.notes}
 onChange={(e) => setCheckInProcedure({ ...checkInProcedure, notes: e.target.value })}
 />

  </Box>



      <Box>
<TextField 
  size='small'
  id='outlined-basic'
 label='House Rules' 
 value={checkInProcedure.houseRules}
 onChange={(e) => setCheckInProcedure({ ...checkInProcedure, houseRules: e.target.value })}
 />

  </Box>


      <Box className="my-4">
<TextField 
  size='small'
  id='outlined-basic'
 label='Overview' 
 value={checkInProcedure.overview}
 onChange={(e) => setCheckInProcedure({ ...checkInProcedure, overview: e.target.value })}
 />

  </Box>

  <Box>
<TextField 
  size='small'
  id='outlined-basic'
 label=' Getting Around' 
 value={checkInProcedure.gettingArround}
 onChange={(e) => setCheckInProcedure({ ...checkInProcedure, gettingArround: e.target.value })}
 />

  </Box>
    </div>

<div className='w-full px-4'>



    <Box fullWidth className='demo-space-x' sx={{ mb: 4 }}>
        <TextField
          size='small'

        fullWidth
          multiline
          maxRows={5}
          rows={4}
         
          label='Summary'
          value={checkInProcedure.summary}
          onChange={(e) => setCheckInProcedure({ ...checkInProcedure, summary: e.target.value })}
        />
 
      </Box>
</div>



    </div>
  );
};

export default CheckinProcedure;
