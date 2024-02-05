'use client'
import React, { useState } from 'react'
import Calendar from 'src/views/apps/calendar/Calendar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'
import { TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import themeConfig from 'src/configs/themeConfig'


const Venues = () => {

  const [value, setValue] = useState('ecommerce')

  const handleChange = event => {
    setValue(event.target.value)
  }



let TIME = [];
for (let i = 0; i <= 24; i += 30) {
    let hours = ('0' + i).slice(-2); // Adding leading zero if needed
    TIME.push(`${hours}:00`);
}

console.log("this is the selection Time::", TIME);  

  return (
    <div>
      
    <Typography variant='h6' sx={{ mb: 4 }}>
     Venue
    </Typography>
    <Box sx={{ mb: 8 }}>
    <Box
        onClick={() => setValue('crm')}
        sx={{ mb: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
      <TextField fullWidth sx={{ mb: 4 }} label='Where You will be' placeholder={` where you will be`} />
      </Box>

      <Box
        onClick={() => setValue('crm')}
        sx={{ mb: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
      <TextField fullWidth sx={{ mb: 4 }} label='where we will meet' placeholder={`where we will meet`} />
      </Box>

  {/* this is the starting time and ending time  */}


<Box className="w-full grid grid-cols-2 gap-2">
<div className=''>
  <Typography>
    Start time
  </Typography>
  <TextField fullWidth sx={{ mb: 4 }} label='Time' placeholder={`End Time`} />
  </div>

  <div className=''>
  <Typography>
    End time
  </Typography>
  <TextField fullWidth sx={{ mb: 4 }} label='End Time' placeholder={`End Time`} />
  </div>


</Box>
   
  
    </Box>
  </div>
  )
}

export default Venues