 


import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Descriptions = ({ descriptionInfo, setDescriptionInfo }) => {

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
  return (
    <div className='w-full flex flex-col bg-white p-3'> 
      <h2 className="text-lg font-bold mb-2">Step 2: Description Info</h2>

    <div className="w-full grid grid-cols-2 gap-4 px-4">
    
      <FormControl className='flex flex-1'>
        <InputLabel >Language</InputLabel>
        <Select  label='Language' defaultValue=''
        value={descriptionInfo.language}
        onChange={(e) => setDescriptionInfo({ ...descriptionInfo, language: e.target.value })}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {LANGUAGE?.map((e, i) => (
            <MenuItem key={e._id} value={e.name}>{e.name}</MenuItem>
            ))}

        </Select>
      </FormControl>

 

<Box>
<TextField
  size='small'
   id='outlined-basic'
 label='Listing Name' 
 value={descriptionInfo.listingName}
 onChange={(e) => setDescriptionInfo({ ...descriptionInfo, listingName: e.target.value })}/>

  </Box>
      

      <Box>
<TextField
  size='small'
   id='outlined-basic'
 label='Space' 
 value={descriptionInfo.space}
          onChange={(e) => setDescriptionInfo({ ...descriptionInfo, space: e.target.value })}
 />

  </Box>


      <Box>
<TextField 
  size='small'
   id='outlined-basic'
 label='Guest Access' 
 value={descriptionInfo.guestAccess}
 onChange={(e) => setDescriptionInfo({ ...descriptionInfo, guestAccess: e.target.value })}
 />

  </Box>


      <Box>
<TextField 
  size='small'
  id='outlined-basic'
 label='Interaction with Guests' 
 value={descriptionInfo.interactionWithGuests}
          onChange={(e) => setDescriptionInfo({ ...descriptionInfo, interactionWithGuests: e.target.value })}
 />

  </Box>


      <Box>
<TextField 
  size='small'
  id='outlined-basic'
 label='Other Things to Note' 
 value={descriptionInfo.otherThingsToNote}
 onChange={(e) => setDescriptionInfo({ ...descriptionInfo, otherThingsToNote: e.target.value })}
 />

  </Box>



      <Box>
<TextField 
  size='small'
  id='outlined-basic'
 label='House Rules' 
 value={descriptionInfo.houseRules}
 onChange={(e) => setDescriptionInfo({ ...descriptionInfo, houseRules: e.target.value })}
 />

  </Box>


      <Box className="my-4">
<TextField 
  size='small'
  id='outlined-basic'
 label='Overview' 
 value={descriptionInfo.overview}
 onChange={(e) => setDescriptionInfo({ ...descriptionInfo, overview: e.target.value })}
 />

  </Box>


    </div>

<div className='w-full px-4'>
<Box>
<TextField 
  size='small'
  id='outlined-basic'
 label=' Getting Around' 
 value={descriptionInfo.gettingAround}
 onChange={(e) => setDescriptionInfo({ ...descriptionInfo, gettingAround: e.target.value })}
 />

  </Box>


    <Box fullWidth className='demo-space-x' sx={{ mb: 4 }}>
        <TextField
          size='small'

        fullWidth
          multiline
          maxRows={5}
          rows={4}
         
          label='Summary'
          value={descriptionInfo.summary}
          onChange={(e) => setDescriptionInfo({ ...descriptionInfo, summary: e.target.value })}
        />
 
      </Box>
</div>



    </div>
  );
};

export default Descriptions;
