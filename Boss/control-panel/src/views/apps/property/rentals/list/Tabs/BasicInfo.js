// ** React Imports
import { useEffect, useState } from 'react'

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


const BasicInfo = ({selectedPurpose,data_host,data_roomType,rentInfo, setRentInfo,saleInfo, setSaleInfo,basicInfo, setBasicInfo}) => {
  const [value, setValue] = useState('ecommerce');

  const handleChange = event => {
    setValue(event.target.value)
  }

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

 
const PERIOD = ['daily','weekly','monthly','yearly'];
const OWNERSHIP_STATUS = ['Freehold','Leasehold'];
const OCCUPANCY_STATUS=['Vacant','Occupied'];
const COMPLETION_STATUS=['ready','offPlan'];
const FINANCIAL_INSTITUTION_NAMES = [
  'ABC Bank',
  'XYZ Credit Union',
  'First National Bank',
  'City Savings and Loan',
  'Global Investment Group',
  // Add more financial institution names as needed
];

const FINANCIAL_AVAILABLE=['yes','not','not sure'];
console.log("GIGIGIGIG::: ",data_host);

const squareMetersx = value * 0.092903; // 1 Square Meter = 0.092903 Square Yards
const squareYards = value / 0.092903;

const [squareMeters,setSquareMeters] = useState(0);
const [squareYArds,setSquareYArds] = useState(0);

const handleSquareMeters =(val)=>{
  setSquareMeters(val * 0.092903);
  setSquareYArds(val / 0.092903);
  setBasicInfo({ ...basicInfo, squareFit: val })
  console.log("This is Val::", val );
}

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
              placeholder='Building Floor Number'
            type='text' label='Building Floor Number' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.buildingNo}
            onChange={(e) => setBasicInfo({ ...basicInfo, buildingNo: e.target.value })} />
        </Box>


        <Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
         
            <TextField 
              size='small'
              fullWidth
              placeholder='Property Floor Number'
            type='text' label='Property Floor Number' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.propertyFloorNo}
            onChange={(e) => setBasicInfo({ ...basicInfo, propertyFloorNo: e.target.value })} />
        </Box>


        
        <Box
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
         
            <TextField 
              size='small'
              fullWidth
              placeholder='Unity No'
            type='number' label='Unity No' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.unitNo}
            onChange={(e) => setBasicInfo({ ...basicInfo, unitNo: e.target.value })} />
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
              placeholder='Description'

            type='text' label='Description' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.description}
            onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })} />
        </Box>

 
        <Box
        className=""
          onClick={() => setValue('crm')}
          sx={{my:2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
         
            <TextField 
              size='small'
              fullWidth
              placeholder='Permit Number'
              type='text' label='Permit Number' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.permitNo}
            onChange={(e) => setBasicInfo({ ...basicInfo, permitNo: e.target.value })} />
        </Box>


 

      


        <Box
          onClick={() => setValue('crm')}
          sx={{my:2,  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
      
            <TextField 
              size='small'
              fullWidth
              placeholder='Bathroom(s)'
            type='number' label='Bathroom(s)' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.bedrooms}
            onChange={(e) => setBasicInfo({ ...basicInfo, bedrooms: e.target.value })} />
        </Box>

 

      <Box
          onClick={() => setValue('crm')}
          sx={{my:2,  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
      
            <TextField 
              size='small'
              fullWidth
              placeholder='BedRoom(s)'
            type='number' label='BedRoom(s)' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.bathrooms}
            onChange={(e) => setBasicInfo({ ...basicInfo, bathrooms: e.target.value })} />
        </Box>


        
      <Box
          onClick={() => setValue('crm')}
          sx={{my:2,  cursor: 'pointer',  alignItems: 'center', justifyContent: 'space-between' }}
        >
      
            <TextField 
              size='small'
              fullWidth
              placeholder='Area(Square)'
            type='number' label='Area(Square)' id='form-props-number' InputLabelProps={{ shrink: true }}
            value={basicInfo.squareFit}
            onChange={(e) => handleSquareMeters(e.target.value)} />
         
        </Box>
        <div className='w-full col-span-2 text-right text-xs'>{squareMeters.toFixed(2)} Square Meters / {squareYArds.toFixed(2)} Square Yards</div>


        {/* const squareMetersx = value * 0.092903; // 1 Square Meter = 0.092903 Square Yards
const squareYards = value / 0.092903;

const [squareMeters,setSquareMeters] = useState();
const [squareYArds,setSquareYArds] = useState();

squareMeters: squareMeters.toFixed(2),
      squareYards: squareYards.toFixed(2),
 */}

 
 
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
        value={basicInfo.ownshipStatus}
        MenuProps={MenuProps}
        onChange={(e) => setBasicInfo({ ...basicInfo, ownshipStatus: e.target.value })}
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
        value={basicInfo.listingOwner}
        MenuProps={MenuProps}
        onChange={(e) => setBasicInfo({ ...basicInfo, listingOwner: e.target.value })}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {data_host?.map((e,i)=>(
            <MenuItem key={i} value={e._id}>{e.firstName} {e.lastName} </MenuItem>
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
        value={basicInfo.completionStatus}
        MenuProps={MenuProps}
        onChange={(e) => setBasicInfo({ ...basicInfo, completionStatus: e.target.value })}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {COMPLETION_STATUS?.map((e,i)=>(
            <MenuItem key={i} value={e}>{e}</MenuItem>
            ))}
        </Select>
      </FormControl>
</Box>

<Box
     onClick={() => setValue('crm')}
     sx={{my:2,  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
   >
 
       <TextField 
         size='small'
         fullWidth
         placeholder='Price (AED)'
       type='number' label='Price (AED) ' id='form-props-number' InputLabelProps={{ shrink: true }}
       value={basicInfo.price}
       onChange={(e) => setBasicInfo({ ...basicInfo, price: e.target.value })} />
   </Box>






 

{selectedPurpose ==='Buy' ? (
<>
<div className="col-span-2 text-lg font-bold mb-4 mt-4">Rentals Details</div>
 
<Box className="w-full">
<FormControl className='w-full my-2'>
   <InputLabel sx={{mt:-2}}>Rental Frequency</InputLabel>
   <Select 
   
   size='small'
   label='Period' defaultValue=''
   value={rentInfo.rentalFrequency}
   MenuProps={MenuProps}
   onChange={(e) => setRentInfo({ ...rentInfo, rentalFrequency: e.target.value })}
   >
     <MenuItem value=''>
       <em>None</em>
     </MenuItem>
  

     {PERIOD?.map((e,i)=>(
       <MenuItem key={i} value={e}>{e}</MenuItem>
       ))}

   </Select>
 </FormControl>
</Box>



<Box
     onClick={() => setValue('crm')}
     sx={{my:2,  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
   >
 
       <TextField 
         size='small'
         fullWidth
         placeholder='Min Contract Period'
       type='number' label='Min Contract Period' id='form-props-number' InputLabelProps={{ shrink: true }}
       value={rentInfo.contractPeriod}
       onChange={(e) => setRentInfo({ ...rentInfo, contractPeriod: e.target.value })} />
   </Box>


   <Box
     onClick={() => setValue('crm')}
     sx={{my:2,  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
   >
 
       <TextField 
         size='small'
         fullWidth
         placeholder='Vacating Notice Period (Months)'
       type='number' label='Vacating Notice Period (Months)' id='form-props-number' InputLabelProps={{ shrink: true }}
       value={rentInfo.vocatingNoticePeriod}
       onChange={(e) => setRentInfo({ ...rentInfo, vocatingNoticePeriod: e.target.value })} />
   </Box>

   <Box
     onClick={() => setValue('crm')}
     sx={{my:2,  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
   >
 
       <TextField 
         size='small'
         fullWidth
         placeholder='Maintenance Fee (AED)'
       type='number' label='Maintenance Fee (AED)' id='form-props-number' InputLabelProps={{ shrink: true }}
       value={rentInfo.maintenanceFee}
       onChange={(e) => setRentInfo({ ...rentInfo, maintenanceFee: e.target.value })} />
   </Box>


   <Box className="w-full">
<FormControl className='w-full my-2'>
   <InputLabel sx={{mt:-2}}>Paid By</InputLabel>
   <Select 
   
   size='small'
   label='Period' defaultValue=''
   value={rentInfo.paidBy}
   MenuProps={MenuProps}
   onChange={(e) => setRentInfo({ ...rentInfo, paidBy: e.target.value })}
   >
     <MenuItem value=''>
       <em>None</em>
     </MenuItem>
  

     {PERIOD?.map((e,i)=>(
       <MenuItem key={i} value={e}>{e}</MenuItem>
       ))}

   </Select>
 </FormControl>
</Box>
</>
):
(
  <>
  <div className="col-span-2 text-lg font-bold mb-4 mt-4">Sales Details</div>

<Box className="w-full">
<FormControl className='w-full my-2'>
<InputLabel sx={{mt:-2}}>Financing Available</InputLabel>
<Select 

size='small'
label='Financing Available' defaultValue=''
value={saleInfo.financingAvailable}
MenuProps={MenuProps}
onChange={(e) => setSaleInfo({ ...saleInfo, financingAvailable: e.target.value })}
>
  <MenuItem value=''>
    <em>None</em>
  </MenuItem>

  {FINANCIAL_AVAILABLE?.map((e,i)=>(
    <MenuItem key={i} value={e}>{e}</MenuItem>
    ))}

</Select>
</FormControl>
</Box>

<Box className="w-full">
<FormControl className='w-full my-2'>
   <InputLabel sx={{mt:-2}}>Financing Institution Names</InputLabel>
   <Select 
   
   size='small'
   label='Financing Institution Names' defaultValue=''
   value={saleInfo.financingInstitutionName}
   MenuProps={MenuProps}
   onChange={(e) => setSaleInfo({ ...saleInfo, financingInstitutionName: e.target.value })}
   >
     <MenuItem value=''>
       <em>None</em>
     </MenuItem>
  

     {FINANCIAL_INSTITUTION_NAMES?.map((e,i)=>(
       <MenuItem key={i} value={e}>{e}</MenuItem>
       ))}

   </Select>
 </FormControl>
</Box>


  </>
)}
 






<div className="col-span-2 text-lg font-bold mb-4 mt-4">Contact Details</div>
 
<Box className="my-1">
        <FormControl className='w-full my-1'>
        <InputLabel sx={{mt:-2}}>Occupancy Status</InputLabel>
        <Select
        size='small'
        label='Listing Owner' defaultValue=''
        value={basicInfo.ocupationStatus}
        MenuProps={MenuProps}
        onChange={(e) => setBasicInfo({ ...basicInfo, ocupationStatus: e.target.value })}
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




</div>
 

      {/* starting  */}
 

 
      
    





      
  
    </div>


       

    </div>
  )
}

export default BasicInfo
