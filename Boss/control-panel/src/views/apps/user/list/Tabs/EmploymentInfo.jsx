'use client'
import React, { useRef, useState } from 'react'
import useSWR from 'swr';
import FormField from '../FORM/FormFieldInput';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Third Party Imports
import DatePicker from 'react-datepicker'
import PickersComponent from 'src/views/ele/PickersCustomInput';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AddProType from 'src/views/apps/property/type/addProTypeModel';
import AddDepartmentModel from '../ele/addDepartmentModel';
import AddPosition from '../ele/addPosition';
// import PickersComponent from '../STEPS/ELE/PickersCustomInput';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};



const EmploymentInfo = ({formData,setFormData, handleInputChange}) => {

  const [filteredDataDep, setFilteredDataDep] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);


// this is the employment info
  const handleDateChangeJ = date => {
    setFormData({ ...formData, joiningDate: date });
  };
  const handleDateChangew = date => {
    setFormData({ ...formData, workPermitExpiry: date });
  };
  const staff = [
    { 
      value: 'iker paster',
      label: 'iker',
    },
    { 
      value: 'debo',
      label: 'deborah',
    }
    
  ];

  let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/users/linemanagers`;

  const { data, isLoading, error:Error } = useSWR(
    url,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );

  console.log("RESULTOSS USER STEP 4:: ", data);


  let urlDep = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/department/all`;

  const { data:dataDep, isLoading:isLoadingDep, error:ErrorDep } = useSWR(
    urlDep,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );

  console.log("THIS IS THE DEPARTMENT123:: ", dataDep);
 


  // console.log("LINE MANAGERS:: ",formData.lineManager);

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

 

// manage positions 
const [position,setPosition] = useState([]);
const [catchDepID,setCatchDepId] = useState();

console.log("AMA POSISIYO:: ",position);

const EmpType = [
  'Full-Time','Part-time','Internership'
];
const CONTRACT = [
  'limited','unlimited','fixed term','special contract','job sharing'
];
  return (
    <div className="w-full my-auto">
      <h2 className="text-lg font-bold mb-4">Step 4: Employment Information</h2>

      <div className="gridCols">
      {/* Department */}
      {/* <FormField label="Department" name="department" value={formData.department} onChange={handleInputChange} /> */}

      <FormControl fullWidth>
          <InputLabel id='demo-multiple-name-label'>Department*</InputLabel>
          <Select
            // multiple
            label='Department*'
           className='relative'
            MenuProps={MenuProps}
            id='demo-multiple-name'
            labelId='demo-multiple-name-label'
            name="department" value={formData.department} onChange={handleInputChange}
          >
    
             {dataDep?.map((e,i)=>(

            <MenuItem key={e._id} value={e._id} onClick={()=>{setPosition(e?.positions);setCatchDepId(e?._id)}} >{e.name}</MenuItem>
            ))}
<div className='w-full text-center'>

 
<AddDepartmentModel /> 
</div>
          </Select>
        
        </FormControl>

 
{/* 
        <FormControl fullWidth>
          <InputLabel id='demo-multiple-name-label'>Position*</InputLabel> */}
          {/* <Select
            // multiple
            label='Position*'
           className='relative'
            MenuProps={MenuProps}
            id='demo-multiple-name'
            labelId='demo-multiple-name-label'
            name="position" value={formData.position} onChange={handleInputChange}
          >
    {position.length === 0 (<MenuItem> </MenuItem>) }
             {position.length > 0 && position?.map((e,i)=>(

            <MenuItem key={e._id} value={e._id} >{e.name}</MenuItem>
            ))}
<div className='w-full text-center'>

 
<AddPosition /> 
</div>
          </Select> */}
        
   

        {/* </FormControl> */}

        <FormControl fullWidth>
      <InputLabel id='position-nameID'>Position*</InputLabel>
      <Select
      size='small'
        InputLabelProps={{ shrink: false }}
        label='Position*'
        className='relative'
         MenuProps={MenuProps}
         id='position-nameID'
         labelId='position-nameID'
         name="position" value={formData.position} onChange={handleInputChange}
      >
        {position.length === 0 && <MenuItem>No positions available</MenuItem>}
        {position.length > 0 &&
          position.map((e) => (
            <MenuItem key={e._id} value={e._id}>
              {e.name}
            </MenuItem>
          ))}
        <div className='w-full text-center'>
       <AddPosition id={catchDepID} /> 
        </div>
      </Select>
    </FormControl>
      {/* Position */}
      {/* <FormField label="Position" name="position" value={formData.position} onChange={handleInputChange} /> */}
</div>
<div className="gridCols">
      {/* Work Mobile */}
     

      
      <FormField label="Work Mobile" name="workMobile" value={formData.workMobile} onChange={handleInputChange} />

      {/* Telephone */}
      {/* <FormField label="Telephone" name="telephone" value={formData.telephone} onChange={handleInputChange} /> */}

    
      </div>
<div className="gridCols">
      {/* Branch */}
      <FormField label="Branch" name="branch" value={formData.branch} onChange={handleInputChange} />

      {/* Work Location */}
      <FormField label="Work Location" name="workLocation" value={formData.workLocation} onChange={handleInputChange} />
      </div>
<div className="gridCols">
      {/* Line Manager */}
      {/* <FormField label="Line Manager" name="lineManager" value={formData.lineManager} onChange={handleInputChange} /> */}
      <div className="mb-4">
      <label htmlFor={name} className="block text-gray-400 ">
       Line Manager
      </label>
              <select 
               onChange={handleInputChange}
                name="lineManager"  
                 value={formData.lineManager}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                 >
                {data?.map((e,i)=>(

<option key={i} value={e._id}>{`${e.firstName} ${e.lastName}`}</option>

                ))}
              </select>


              
            </div>  


      {/* Joining Date */}
      {/* <div className="mb-4">
        <label htmlFor="joiningDate" className="block text-gray-700 font-medium">
          Joining Date
        </label>
        <DateInput
          id="joiningDate"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleInputChange}
        />
      </div> */}



      
      <div className="w-full">
      <label htmlFor="status" className="formLabel">
      &nbsp;
              </label>
 
    <DatePickerWrapper>
     

     <DatePicker
         selected={formData?.joiningDate}
      
         id='picker-open-date'
         onChange={handleDateChangeJ}
         name="joiningDate"
          dateFormat="dd/MM/yyyy" // Set the desired date format here
          maxDate={new Date()} // Restrict selection to dates up to today
          customInput={<PickersComponent label='Joining Date' />} 
          className='w-full'
        />
            </DatePickerWrapper>

      {/* Datess: {moment(italiki).fromNow()} */}
 

   </div>



      </div>
<div className="grid grid-cols-2 gap-2 ">
 
      <FormControl fullWidth>
      <InputLabel id='position-nameID' sx={{mt:-2}}>Contract Type*</InputLabel>
      <Select
      size='small'
        InputLabelProps={{ shrink: false }}
        label='Contract Type*'
        className='relative'
         MenuProps={MenuProps}
         id='position-nameID'
         labelId='position-nameID'
      name="contract" value={formData.contract} onChange={handleInputChange}
      >
        {CONTRACT.length === 0 && <MenuItem>No Contract Type available</MenuItem>}
        {CONTRACT.length > 0 &&
          CONTRACT.map((e,i) => (
            <MenuItem key={i} value={e}>
              {e}
            </MenuItem>
          ))}
        <div className='w-full text-center'>
       
        </div>
      </Select>
    </FormControl>

 
      <FormControl fullWidth >
      <InputLabel id='position-nameID' sx={{mt:-2}}>Employement Type*</InputLabel>
      <Select
      size='small'
        InputLabelProps={{ shrink: false }}
        label='Employement Type*'
        className='relative'
         MenuProps={MenuProps}
         id='position-nameID'
         labelId='position-nameID'
       name="employeeType" value={formData.employeeType} onChange={handleInputChange}
      >
        {EmpType.length === 0 && <MenuItem>No Employment Type available</MenuItem>}
        {EmpType.length > 0 &&
          EmpType.map((e,i) => (
            <MenuItem key={i} value={e}>
              {e}
            </MenuItem>
          ))}
        <div className='w-full text-center'>
       
        </div>
      </Select>
    </FormControl>


      </div>
<div className="gridCols">
      {/* Work Permit No */}
      <FormField label="Work Permit No" name="workPermitNo" value={formData.workPermitNo} onChange={handleInputChange} />

      {/* Work Permit Expiry */}
      {/* <div className="mb-4">
        <label htmlFor="workPermitExpiry" className="block text-gray-700 font-medium">
          Work Permit Expiry
        </label>
        <DateInput
          id="workPermitExpiry"
          name="workPermitExpiry"
          value={formData.workPermitExpiry}
          onChange={handleInputChange}
        />
      </div> */}

<div className="w-full">
      <label htmlFor="status" className="formLabel">
      &nbsp;
              </label>
 
    <DatePickerWrapper>
     

     <DatePicker
         selected={formData?.workPermitExpiry}
         id='picker-open-date'
         onChange={handleDateChangew}
         name="workPermitExpiry"
          dateFormat="dd/MM/yyyy" // Set the desired date format here
          minDate={new Date()} // Restrict selection to dates up to today
          customInput={<PickersComponent label='Work Permit Expiry' />} 
          className='w-full'
        />
            </DatePickerWrapper>

   </div>


</div>
      {/* Document Uploads */}
      {/* You can add the document uploads UI and functionality here */}
    </div>
  )
}

export default EmploymentInfo