'use client'
import React, { useState } from 'react'
import Calendar from 'src/views/apps/calendar/Calendar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'
import { Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import themeConfig from 'src/configs/themeConfig'
import Tag from './Tag'


const Activies = ({activities, setActivities}) => {

  const [value, setValue] = useState('ecommerce')

  const handleChange = event => {
    setValue(event.target.value)
  }



  const [capturedText, setCapturedText] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newEntry = event.target.value.trim();
      if (newEntry !== '') {
        setCapturedText((prevText) => {
          const newText = prevText !== '' ? prevText + ', ' + newEntry : newEntry;
          return newText;
        });
        event.target.value = ''; // Clear the TextField after capturing the text
      }
    }
  };

  const handleAlcoholChange = (event) => {
    setActivities((prevActivities) => ({
      ...prevActivities,
      alcohol: event.target.checked,
    }));
  };

const handleKidsChange= (event)=>{
  setActivities((prevActivities) => ({
    ...prevActivities,
    kids: event.target.checked,
  }));
}

const handleFlexibilityChange = (event) => {
  setActivities((prevActivities) => ({
    ...prevActivities,
    flexible: event.target.value === 'checked',
  }));
};


  return (
    <div className='pr-2'>
      
    <Typography variant='h6' sx={{ mb: 4 }}>
    Activies
    </Typography>
    <Box sx={{ mb: 8 }}>

<div className='grid grid-cols-2 gap-2'>

<Box
className="col-span-2"
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              rows={4} multiline 
              placeholder={`What we  will do`}
            type='text' label='What we  will do' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={activities.whatWeWillDo}
            onChange={(e) => setActivities({ ...activities, whatWeWillDo: e.target.value })} />
</Box>

 <div className='col-span-2'>
      <Typography variant='h6' sx={{ mb: 4 }}>
        Who can Attend Your Experience?
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={activities.alcohol}
            onChange={handleAlcoholChange}
            name="alcohol"
          />
        }
        label={
          <Typography variant="body2">
            My experience includes alcohol. Only guests that meet the legal drinking age will be served.
          </Typography>
        }
      />
    </div>

    <Box
className=""
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              type="number"
              placeholder={`Minimum Age`}
            label='Minimum Age' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={activities.minAge}
            onChange={(e) => setActivities({ ...activities, minAge: e.target.value })} />
</Box>


<div className=''>
  

      <FormControlLabel
        control={
          <Checkbox
            checked={activities.kids}
            onChange={handleKidsChange}
            name="kids"
          />
        }
        label={
          <Typography variant="body2">
               Parents can bring kids under 2 years.
          </Typography>
        }
      />
    </div>

    <Box
className=""
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              type="text"
              placeholder={`Special Certifications`}
            label='Special Certifications' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={activities.specialCertificate}
            onChange={(e) => setActivities({ ...activities, specialCertificate: e.target.value })} />
</Box>

<Box
className=""
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              type="text"
              placeholder={`Addition Requirement`}
            label='Addition Requirement' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={activities.aditionRequirement}
            onChange={(e) => setActivities({ ...activities, aditionRequirement: e.target.value })} />
</Box>


<Typography variant='h6' sx={{ mb: 4 }} className='col-span-2'>
      How Much time do you need to prepare?
    </Typography>

    <Box
className=""
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              type="text"
              placeholder={`Preparation Time`}
            label='Preparation Time' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={activities.preparationTime}
            onChange={(e) => setActivities({ ...activities, preparationTime: e.target.value })} />
</Box>



<div className='col-span-2 flex items-center gap-3'>
      <Typography variant='h6' sx={{  }}>
        Are you flexible?
      </Typography>

      <RadioGroup
        row
        value={activities.flexible ? 'checked' : 'unchecked'}
        name='flexibility-radio'
        onChange={handleFlexibilityChange}
        aria-label='flexibility-radio'
      >
        <FormControlLabel value='checked' control={<Radio />} label="Yes, I'm flexible" />
        <FormControlLabel value='unchecked' control={<Radio />} label='No thanks' />
      </RadioGroup>
    </div>


</div>

 
  
     
      {/* </div> */}


<div className='grid grid-cols-2 gap-2 mt-3'>
{/* <TextField size='small' fullWidth sx={{ mb: 4 }} label="Cutoff Time" placeholder="cut off Time" /> */}

{/* <TextField size='small' fullWidth sx={{ mb: 4 }} label="What Should do Your Guest Bring" placeholder="What Should do Your Guest Bring" /> */}


</div>
<Tag activities={activities} setActivities={setActivities} />
    
    
 
         
    </Box>
  </div>
  )
}

export default Activies