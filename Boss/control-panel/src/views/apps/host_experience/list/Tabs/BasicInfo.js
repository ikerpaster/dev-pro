// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'
import Tag from './Tag'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'


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


const BasicInfo = ({setBasicInfo,basicInfo}) => {
  const [value, setValue] = useState('ecommerce')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const CATEGORY = ['Category1','Category2','Category2'];

  return (
    <div>
      
      <Typography variant='h6' sx={{ mb: 4 }}>
        Basic Info
      </Typography>
  
        <div className='w-full grid grid-cols-2 gap-3'>

        <Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              placeholder={`Tour Title`}
            type='text' label='Tour Title' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.tourTitle}
            onChange={(e) => setBasicInfo({ ...basicInfo, tourTitle: e.target.value })} />
        </Box>

        <Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              placeholder={`TagLine`}
            type='text' label='TagLine' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.tagLine}
            onChange={(e) => setBasicInfo({ ...basicInfo, tagLine: e.target.value })} />
        </Box>


        <Box className="my-2 w-full">
      <FormControl className='w-full my-2'>
        <InputLabel sx={{mt:-2}}>Category</InputLabel>
        <Select 
        fullWidth
        size='small'
        label='Room Type' defaultValue=''
        value={basicInfo.category}
        MenuProps={MenuProps}
        onChange={(e) => setBasicInfo({ ...basicInfo, category: e.target.value })}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {CATEGORY?.map((e,i)=>(
            <MenuItem key={i} value={e}>{e}</MenuItem>
            ))}

        </Select>
      </FormControl>
      </Box>

 
        {/* <TextField size='small' fullWidth sx={{ mb: 4 }} label='City' placeholder={`City`} />
        <TextField size='small' fullWidth sx={{ mb: 4 }} label='Language' placeholder={`Language`} />
       */}

<Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              placeholder={`Time`}
            type='text' label='TagLine' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.time}
            onChange={(e) => setBasicInfo({ ...basicInfo, time: e.target.value })} />
</Box>

<Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              placeholder={`Group Size`}
            type='text' label='Group Size' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.grpSize}
            onChange={(e) => setBasicInfo({ ...basicInfo, grpSize: e.target.value })} />
</Box>


<Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              placeholder={`Price per Guest`}
            type='text' label='Price per Guest' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.pricePerGuest}
            onChange={(e) => setBasicInfo({ ...basicInfo, pricePerGuest: e.target.value })} />
</Box>


<Box
className="col-span-2"
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              rows={4} multiline 
              placeholder={`Host Biography`}
            type='text' label='Host Biography' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.Bio}
            onChange={(e) => setBasicInfo({ ...basicInfo, Bio: e.target.value })} />
</Box>




<Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              placeholder={`Start time`}
            type='text' label='Start time' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.StartTime}
            onChange={(e) => setBasicInfo({ ...basicInfo, StartTime: e.target.value })} />
</Box>


<Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
            <TextField
              size='small'
              fullWidth
              placeholder={`End Time`}
            type='text' label='End Time' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.EndTime}
            onChange={(e) => setBasicInfo({ ...basicInfo, EndTime: e.target.value })} />
</Box>



 
        </div>
 
  
    </div>
  )
}

export default BasicInfo
