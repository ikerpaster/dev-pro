'use client'
import React, { useEffect, useState } from 'react'
import FormField from '../FORM/FormFieldInput';
// import PhoneNumberValidation from '../STEPS/ELE/PhoneNumberValidator';


import SelectInput from '../FORM/SelectInput';
import { useTheme } from '@emotion/react';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Third Party Imports
import DatePicker from 'react-datepicker'
// import PickersComponent from '../STEPS/ELE/PickersCustomInput';
import moment from 'moment';
import ReactFlagsSelect from 'react-flags-select';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from '@mui/icons-material';
import PhoneNumberValidation from 'src/views/ele/PhoneNumberValidator';
import PickersComponent from 'src/views/ele/PickersCustomInput';


// import PickersComponent from './ELE/PickersCustomInput';

const PersonalInfo = ({formData,setFormData, handleInputChange}) => {
  const handleDateChange = date => {
    setFormData({ ...formData, dateOfBirth: date });
  };
  const countries = [
    { value: 'KENYA', label: 'KENYA' },
    { value: 'BURUNDI', label: 'BURUNDI' },
    { value: 'UAE', label: 'UAE' },
  ];

  const gender = [
    { 
      value: 'male',
      label: 'Male',
      description: 'Typically associated with individuals assigned male at birth based on biological characteristics.'
    },
    { 
      value: 'female',
      label: 'Female',
      description: 'Typically associated with individuals assigned female at birth based on biological characteristics.'
    }
    
  ];
  
  const [dateOpen, setDateOpen] = useState(null)
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
const Language = ['English','French','Arabic'];
const [lang,setLang] = useState('')
const [showLangInput,setShowLangInput] = useState(false);
const [showLang,setShowLang] = useState(false);

formData.language = lang;
// const HandleClearlang = ()=>{

// }

useEffect(()=>{
  if(showLangInput){

    setLang(formData.languagex);
  }
},[formData.languagex,showLangInput]);




console.log("THis is the Language men:: ", formData.language);

// const [formData, setFormData] = useState({
//   dateOfBirth: null // Initialize with null or default date if needed
// });

// const handleDateChange = date => {
//   setFormData({ ...formData, dateOfBirth: date });
// };


// const handleInputChange = (event) => {
//   const { name, value } = event.target;
//   setFormData({ ...formData, [name]: value });
// };
const [italiki,setItali] = useState(formData.dateOfBirt);
console.log("ITALIKI:: ",formData.dateOfBirth);
 
const [selected, setSelected] = useState('');

useEffect(() => {
  if (selected) {
    setFormData({ ...formData, nationality: selected });
  }

}, [selected]);

 


console.log("NtURUKA: ", formData.nationality);

  return (
    <div className="w-full min-h-screen-[400px]">
      <h2 className="text-lg font-bold mb-2">Step 2: Personal Information</h2>
      <div className="gridCols">
        {/* Nationality */}
        {/* <div className="mb-4">
              <label htmlFor="status" className="formLabel">
              Nationality
              </label>
              <SelectInput
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                options={countries}
              />
            </div> */}
 
<div className=''>
<label htmlFor="status" className="formLabel">
              Nationality
              </label>
              <div className='mt-1'>

              <ReactFlagsSelect
        selected={selected}
        onSelect={(code) => setSelected(code)}
        placeholder="Select Nationality"
        searchable
        id="flags-select"
        className='bg-red-500x px-1 py-2 text-xs rounded-lg '
      />
              </div>
</div>
            
    


 
        {/* Gender */}
        {/* <FormField label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} /> */}
        <div className="mb-4">
              <label htmlFor="status" className="formLabel">
              Gender
              </label>
              <SelectInput
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                options={gender}
              />
            </div>
</div>


<div className="gridCols">
        {/* Language */}
        <div className=''>
       {showLangInput ? (<div className='flex items-center'> <FormField label="Type Language Manualy" name="languagex" value={formData.languagex} onChange={handleInputChange} /> 
       <div className='-ml-7 mt-4 font-semibold text-black cursor-pointer' onClick={()=>{setShowLang((prev)=>!prev);setShowLangInput(false)}}> <ArrowDropDownOutlined /></div> </div>) : <div className=''> 
Language
{/* <div className='h-10  w-full border-1 border-dotted rounded-lg p-2 px-3' onClick={()=>setShowLang((prev)=>!prev)}> {formData.language}</div> */}
<div
onClick={()=>setShowLang((prev)=>!prev)}
 className='w-full flex justify-between px-3 py-2 border my-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'>
  <span> {lang} </span> 
  {showLang ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
  </div>
       </div> }
       { showLang && 
       <div className={`w-1/4 h-fit bg-white z-20 border border-gray-200 text-sm p-2 shadow rounded-lg absolute px-3 py-2 ${showLangInput ? '':'mt-2'} `}>
       {Language.map((e,i)=>(
         <div key={i} className='py-2 px-3 font-semibold hover:bg-violet-50 rounded-lg transition transform ease-in-out duration-500 cursor-pointer' onClick={()=>{setLang(e);setShowLang(false)}} > {e} </div>
       ))}
     
     <div
  className='py-2 px-3 bg-violet-200 rounded-xl text-center text-black font-semibold shadow-xl m-3 cursor-pointer hover:via-violet-900 hover:text-white duration-500'
  onClick={() => {
    setShowLangInput((prev) => !prev);setShowLang(false)
 
  }}
>
  Other
</div>

        </div>
        }

        </div>


        {/* Marital Status */}
        <FormField label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} />
        </div>
<div className="gridCols">
      
 
      <div className="w-full">
      <label htmlFor="status" className="formLabel">
      &nbsp;
              </label>
 
    <DatePickerWrapper>
     

     <DatePicker
         selected={formData?.dateOfBirth}
      
         id='picker-open-date'
         onChange={handleDateChange}
         name="dateOfBirth"
          dateFormat="dd/MM/yyyy" // Set the desired date format here
          maxDate={new Date()} // Restrict selection to dates up to today
          customInput={<PickersComponent label='Date of Birth' />} 
          className='w-full'
        />
            </DatePickerWrapper>

      {/* Datess: {moment(italiki).fromNow()} */}
 

   </div>






        {/* Place of Birth */}
        <FormField label="Place of Birth" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleInputChange} />
        </div>
<div className="gridCols">
        {/* Number of Children */}
        <FormField label="Number of Children" name="numOfChildren" value={formData.numOfChildren} onChange={handleInputChange} />

        {/* Home Address */}
        <FormField label="Home Address" name="homeAddress" value={formData.homeAddress} onChange={handleInputChange} />
        </div>
<div className="gridCols">
        {/* Emergency Contact Name */}
        <FormField label="Emergency Contact Name" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange} />

        {/* Emergency Contact Number */}
        <div className="mt-3">
          {/* <CountryCodeInput label="Emergency Contact Number" name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleInputChange} /> */}
          <PhoneNumberValidation label="Emergency Contact Number" formData={formData} setFormData={setFormData} value={formData.emergencyContactNumber} name="emergencyContactNumber" />
        </div>
      </div>

{/* <div className='bg-red-400 py-10'>
      {formData.language } cc  {formData.languagex }

</div> */}


 
   


    </div>
  )
}

export default PersonalInfo