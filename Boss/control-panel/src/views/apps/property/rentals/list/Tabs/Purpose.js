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
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TrashIcon } from '@heroicons/react/24/solid'
import AddProType from 'src/views/apps/property/type/addProTypeModel'


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


const Purpose = (
  {
    basicInfo,
    setBasicInfo,
    bedsQuantity,
    bedsList,
    setBedsList,
    showBedInput,
    setShowBedInput,
    handleAddBeds,
    data_roomType,
    data_bedType,
    data_property
  }
) => {
  const [value, setValue] = useState('ecommerce')

  const handleChange = event => {
    setValue(event.target.value)
  }



  const [bedType, setBedType] = useState('');

  const handleRemoveBeds = (index) => {
    const updatedBeds = [...bedsList];
    updatedBeds.splice(index, 1);
    setBedsList(updatedBeds);
  };

  const handleIncreaseBeds = (index) => {
    const updatedBeds = [...bedsList];
    updatedBeds[index].quantity += 1;
    setBedsList(updatedBeds);
  };

  const handleDecreaseBeds = (index) => {
    const updatedBeds = [...bedsList];
    if (updatedBeds[index].quantity > 1) {
      updatedBeds[index].quantity -= 1;
      setBedsList(updatedBeds);
    }
  };

 


  console.log("data_roomType:: ",data_roomType);
  console.log("Data_bedType::: ",data_bedType);
  console.log("Data Property Type::: ",data_property);


 

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


const CURRENCY = ['usd','aed','eur'];
const PERIOD = ['daily','weekly','monthly','yearly'];

const OWNERSHIP_STATUS = ['Freehold','Leasehold'];
const OCCUPANCY_STATUS=['Vacant','Occupied'];
  return (
    <div>
      

      <div className="bg-white rounded-lg shadow-md p-6 w-full flex flex-col menu ">
      {/* <h2 className="text-2xl font-bold mb-4">Step 1: Basic Info</h2> */}
      
      <div className="text-lg font-bold mb-4">Property Details</div>
<div className='grid grid-cols-2 items-center gap-3'>
<Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
         
            <TextField 
              size='small'
              fullWidth
            type='text' label='Listing Name' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.listingName}
            onChange={(e) => setBasicInfo({ ...basicInfo, listingName: e.target.value })} />
        </Box>

        <Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
         
            <TextField 
              size='small'
              fullWidth
            type='text' label='Building Floor Number' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.listingName}
            onChange={(e) => setBasicInfo({ ...basicInfo, listingName: e.target.value })} />
        </Box>


        <Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
         
            <TextField 
              size='small'
              fullWidth
            type='text' label='Property Floor Number' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.listingName}
            onChange={(e) => setBasicInfo({ ...basicInfo, listingName: e.target.value })} />
        </Box>


        
        <Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
         
            <TextField 
              size='small'
              fullWidth
            type='text' label='Unity No' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.listingName}
            onChange={(e) => setBasicInfo({ ...basicInfo, listingName: e.target.value })} />
        </Box>

        <Box
        className="col-span-2"
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
         
            <TextField 
              size='small'
              fullWidth
           
              multiline
              maxRows={5}
              rows={4}

            type='text' label='Description' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.listingName}
            onChange={(e) => setBasicInfo({ ...basicInfo, listingName: e.target.value })} />
        </Box>







        <Box
          onClick={() => setValue('crm')}
          sx={{ my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
      
            <TextField 
              size='small'
              fullWidth
            type='number' label='BedRoom' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.bedrooms}
            onChange={(e) => setBasicInfo({ ...basicInfo, bedrooms: e.target.value })} />
        </Box>


        <Box
        className=""
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
         
            <TextField 
              size='small'
              fullWidth
              type='text' label='Permit Number' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.listingName}
            onChange={(e) => setBasicInfo({ ...basicInfo, listingName: e.target.value })} />
        </Box>





        <Box
          onClick={() => setValue('crm')}
          sx={{my:2,  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
      
            <TextField 
              size='small'
              fullWidth
              placeholder='Price'
            type='number' label='Price' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.price}
            onChange={(e) => setBasicInfo({ ...basicInfo, price: e.target.value })} />
        </Box>


      


        <Box
          onClick={() => setValue('crm')}
          sx={{my:2,  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
      
            <TextField 
              size='small'
              fullWidth
              placeholder='Price'
            type='number' label='Bathrooms' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.price}
            onChange={(e) => setBasicInfo({ ...basicInfo, price: e.target.value })} />
        </Box>



        <FormControl className='flex flex-1 my-2'>
        <InputLabel sx={{mt:-2}}>Period</InputLabel>
        <Select 
        
        size='small'
        label='Period' defaultValue=''
        value={basicInfo.period}
        MenuProps={MenuProps}
        onChange={(e) => setBasicInfo({ ...basicInfo, period: e.target.value })}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {PERIOD?.map((e,i)=>(
            <MenuItem key={i} value={e}>{e}</MenuItem>
            ))}

        </Select>
      </FormControl>

     


      <Box
          onClick={() => setValue('crm')}
          sx={{my:2,  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
      
            <TextField 
              size='small'
              fullWidth
              placeholder='Price'
            type='number' label='BedRoom(s)' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.price}
            onChange={(e) => setBasicInfo({ ...basicInfo, price: e.target.value })} />
        </Box>


        
      <Box
          onClick={() => setValue('crm')}
          sx={{my:2,  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
      
            <TextField 
              size='small'
              fullWidth
              placeholder='Price'
            type='number' label='Area(Square)' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.price}
            onChange={(e) => setBasicInfo({ ...basicInfo, price: e.target.value })} />
        </Box>

     

<Box className="my-2">
        <FormControl className='w-full my-2'>
        <InputLabel sx={{mt:-2}}>Occupancy Status</InputLabel>
        <Select
        size='small'
        label='Listing Owner' defaultValue=''
        value={basicInfo.roomType}
        MenuProps={MenuProps}
        onChange={(e) => setBasicInfo({ ...basicInfo, roomType: e.target.value })}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {OCCUPANCY_STATUS?.map((e,i)=>(
            <MenuItem key={i} value={e}>{e}</MenuItem>
            ))}

        </Select>
      </FormControl>
 </Box>

 
 
      <Box className="my-2 w-full">
      <FormControl className='w-full my-2'>
        <InputLabel sx={{mt:-2}}>Room Type</InputLabel>
        <Select 
        fullWidth
        size='small'
        label='Room Type' defaultValue=''
        value={basicInfo.roomType}
        MenuProps={MenuProps}
        onChange={(e) => setBasicInfo({ ...basicInfo, roomType: e.target.value })}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {data_roomType?.map((e,i)=>(
            <MenuItem key={e._id} value={e.name}>{e.name}</MenuItem>
            ))}

        </Select>
      </FormControl>
      </Box>

      <Box className="my-2 ">
      <FormControl className='w-full my-2'>
        <InputLabel sx={{mt:-2}}>OwnerShip Status</InputLabel>
        <Select
        fullWidth
        size='small'
        label='OwnerShip Status' defaultValue=''
        value={basicInfo.roomType}
        MenuProps={MenuProps}
        onChange={(e) => setBasicInfo({ ...basicInfo, roomType: e.target.value })}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {OWNERSHIP_STATUS?.map((e,i)=>(
            <MenuItem key={i} value={e}>{e}</MenuItem>
            ))}

        </Select>
      </FormControl>
      </Box>

      <Box className="my-2">
      <FormControl className='w-full'>
        <InputLabel sx={{mt:-2}}>Listing Owner</InputLabel>
        <Select
        size='small'
        label='Listing Owner' defaultValue=''
        value={basicInfo.roomType}
        MenuProps={MenuProps}
        onChange={(e) => setBasicInfo({ ...basicInfo, roomType: e.target.value })}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {OWNERSHIP_STATUS?.map((e,i)=>(
            <MenuItem key={i} value={e}>{e}</MenuItem>
            ))}

        </Select>
      </FormControl>
</Box>


<Box className="my-2">
      <FormControl className='w-full'>
        <InputLabel sx={{mt:-2}}>Completion Status</InputLabel>
        <Select
        size='small'
        label='Completion Status' defaultValue=''
        value={basicInfo.roomType}
        MenuProps={MenuProps}
        onChange={(e) => setBasicInfo({ ...basicInfo, roomType: e.target.value })}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {OWNERSHIP_STATUS?.map((e,i)=>(
            <MenuItem key={i} value={e}>{e}</MenuItem>
            ))}

        </Select>
      </FormControl>
</Box>




</div>
 

      {/* starting  */}
 

 
      
    

      <div className="col-span-2 text-lg font-bold mb-4">Rentals Details</div>
 

{/* <div className='grid grid-cols-2 gap-2'> */}
 
 
{/* <FormControl fullWidth>
          <InputLabel id='demo-multiple-name-label'>Property Name1*</InputLabel>
          <Select
            // multiple
            label='Property Name*'
           className='relative'
            MenuProps={MenuProps}
            id='demo-multiple-name'
            labelId='demo-multiple-name-label'
            value={basicInfo.propertyName}
            onChange={(e) => setBasicInfo({ ...basicInfo, propertyName: e.target.value })}
          >
             {data_property?.map((e,i)=>(
              <MenuItem key={e._id} value={e._id}>{e.proInfo.proName}</MenuItem>
            ))}
<div className='w-full text-center'>

 
<AddProType /> 
</div>
          </Select>
        
        </FormControl>
  */}
 
 




{/* </div> */}
    

 

     
 

      
  
    </div>


       

    </div>
  )
}

export default Purpose
