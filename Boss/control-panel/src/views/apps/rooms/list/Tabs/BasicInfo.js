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

const BasicInfo = (
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
    data_roomCategory
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
  console.log("Data Property Type::: ",data_roomCategory);


 

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

  return (
    <div>
      

      <div className="bg-white rounded-lg shadow-md p-6 w-full flex flex-col menu ">
      <h2 className="text-2xl font-bold mb-4">Step 1: Basic Info</h2>
      

      <Box
          onClick={() => setValue('crm')}
          sx={{ mb: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
      
            <TextField 
              size='small'
              fullWidth
            type='number' label='BedRoom' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.bedrooms}
            onChange={(e) => setBasicInfo({ ...basicInfo, bedrooms: e.target.value })} />
        </Box>

 
      {/* starting  */}

<div className='w-full grid grid-cols-2 my-2 gap-3'>
{bedsList?.map((bed, index) => (
        <div key={index} className="flex flex-col mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2" htmlFor={`bedType-${index}`}>
            Beds Type {index + 1}:
          </label>
          <div className="flex items-center gap-2 justify-evenly">
            <button
              className="px-2 py-1 border border-gray-400 rounded-full "
              onClick={() => handleDecreaseBeds(index)}
            >
              -
            </button>
            <span>{bed.type}</span>
            <span className="mx-2">({bed.quantity})</span>
            <button
              className="px-2 py-1 border border-gray-400 rounded-full "
              onClick={() => handleIncreaseBeds(index)}
            >
              + 
            </button>
            <button
              className=" text-red-600 p-1 bg-red-200  rounded"
              onClick={() => handleRemoveBeds(index)}
            >
              <TrashIcon className='h-4 w-4'/>
            </button>
          </div>
        </div>
      ))}
</div>
    

      {showBedInput ? (
        <div className="flex mb-4 gap-2 items-center">
         

            <FormControl className='flex flex-1'>
        <InputLabel >Bed Type</InputLabel>
        <Select  label='Bed Type' defaultValue='' id='demo-simple-select-helper' labelId='demo-simple-select-helper-label'
        // id="bedType"
        value={bedType}
        onChange={(e) => setBedType(e.target.value)}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {data_bedType?.map((e, i) => (
            <MenuItem key={e._id} value={e.name}>{e.name}</MenuItem>
            ))}

        </Select>
        {/* <FormHelperText>select bed Type</FormHelperText> */}
      </FormControl>


            <button
              className=" h-fit py-2 px-2 rounded-lg text-white shadow-2xl bg-violet-300 "
              onClick={() => {
                handleAddBeds(bedType); // Pass bedType as an argument
              }}
            >
              Add
            </button>
          
        </div>
      ) : (
        <button className="bg-violet-500 text-white px-4 py-2 rounded" onClick={() => setShowBedInput(true)}>
          Add Beds
        </button>
      )}

      {/* ending  */}

      <div className="flex flex-col mb-4">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="bathrooms">
          Bathrooms <span className="text-red-500">*</span>:
        </label>
        <div className="flex items-center">
          <button
            className="px-2 py-1 border border-gray-400 rounded-full mr-2"
            onClick={() =>
              setBasicInfo((prevInfo) => ({
                ...prevInfo,
                bathrooms: Math.max(0, prevInfo.bathrooms - 1),
              }))
            }
          >
            -
          </button>
          <input
            className="appearance-none border border-gray-400 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            type="number"
            id="bathrooms"
            placeholder="Enter number of bathrooms"
            value={basicInfo.bathrooms}
            onChange={(e) => setBasicInfo({ ...basicInfo, bathrooms: e.target.value })}
            required
          />
          <button
            className="px-2 py-1 border border-gray-400 rounded-full ml-2"
            onClick={() =>
              setBasicInfo((prevInfo) => ({
                ...prevInfo,
                bathrooms: Math.max(0, prevInfo.bathrooms + 1),
              }))
            }
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-gray-700 text-sm font-bold mb-2">
          Are any of the bathrooms private? <span className="text-red-500">*</span>:
        </label>
        <div className="flex items-center">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-blue-500"
              name="privateBathroom"
              value="yes"
              checked={basicInfo.privateBathroom === true}
              onChange={(e) => setBasicInfo({ ...basicInfo, privateBathroom: true })}
              required
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-blue-500"
              name="privateBathroom"
              value="no"
              checked={basicInfo.privateBathroom === false}
              onChange={(e) => setBasicInfo({ ...basicInfo, privateBathroom: false })}
              required
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
 
<div className='grid grid-cols-2 gap-2'>
 
 
<FormControl fullWidth>
          <InputLabel id='demo-multiple-name-label'>Room Category*</InputLabel>
          <Select
            // multiple
            label='Property Name*'
           className='relative'
            MenuProps={MenuProps}
            id='demo-multiple-name'
            labelId='demo-multiple-name-label'
            value={basicInfo.RoomCategory}
            onChange={(e) => setBasicInfo({ ...basicInfo, RoomCategory: e.target.value })}
          >
             {data_roomCategory?.map((e,i)=>(
              <MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>
            ))}
<div className='w-full text-center'>

{/* <button className='w-fit mx-auto bg-blue-500 py-2 text-white px-4 rounded-lg shadow-2xl text-xs my-2'>Add new </button> */}
{/* <AddProType />  */}
</div>
          </Select>
        
        </FormControl>
 
 
 


      <FormControl className='flex flex-1 my-3'>
        <InputLabel >Room Type</InputLabel>
        <Select  label='Room Type' defaultValue=''
        value={basicInfo.roomType}
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


</div>
    

 

     

      <div className="flex flex-col mb-4 my-3">
     

<div className="flex flex-col mb-4">
        <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="accommodates">
          Accomodates <span className="text-red-500">*</span>:
        </label>
        <div className="flex items-center">
          <button
            className="px-2 py-1 border border-gray-400 rounded-full mr-2"
            onClick={() =>
              setBasicInfo((prevInfo) => ({
                ...prevInfo,
                accommodates: Math.max(0, prevInfo.accommodates - 1),
              }))
            }
          >
            -
          </button>
          <input
            className="appearance-none border border-gray-400 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            type="number"
            id="accommodates"
            placeholder="Enter number of accommodates"
            value={basicInfo.accommodates}
            onChange={(e) => setBasicInfo({ ...basicInfo, accommodates: e.target.value })}
            required
          />
          <button
            className="px-2 py-1 border border-gray-400 rounded-full ml-2"
            onClick={() =>
              setBasicInfo((prevInfo) => ({
                ...prevInfo,
                accommodates: Math.max(0, prevInfo.accommodates + 1),
              }))
            }
          >
            +
          </button>
        </div>
      </div>
      </div>

{/* 
      <TextField
  size='small'
   id='outlined-basic'
 label='Listing Name' 
 value=""
 
 /> */}


<Box
          onClick={() => setValue('crm')}
          sx={{ mb: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
         
            <TextField 
              size='small'
              fullWidth
            type='text' label='Listing Name' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.listingName}
            onChange={(e) => setBasicInfo({ ...basicInfo, listingName: e.target.value })} />
</Box>

  


    </div>


       

    </div>
  )
}

export default BasicInfo
