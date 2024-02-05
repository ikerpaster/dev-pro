// ** React Imports
import { useState } from 'react'


import TextField from '@mui/material/TextField'

import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/solid'
import FormField from '../FORM/FormFieldInput'
import SelectInput from '../FORM/SelectInput'
import FormFieldPSWD from '../FORM/FormFieldPswd'
import PhoneNumberValidation from '../ele/PhoneNumberValidator'
// import PhoneNumberValidation from '../STEPS/ELE/PhoneNumberValidator'


const BasicInfo = (
  {
    formData,setFormData,
  handleFileDrop,
  handleInputChange,
  handleFileChange,
  handleRemoveImage,
  handleRemoveDocument,
  roleOptions,
  statusOptions
  }
) => {
 
  const countries = [
    { value: 'KENYA', label: 'KENYA' },
    { value: 'BURUNDI', label: 'BURUNDI' },
    { value: 'UAE', label: 'UAE' },
  ];

const states =[
  { value: 'DUABI', label: 'DUBAI' },
  { value: 'KIGALI', label: 'KIGALI1' },
]
  const [isActive, setActive] = useState(false);

  // const handleToggle = () => {
  //   setActive((prev=>!prev));
  // };

  const [isVerified, setIsVerified] = useState(false);

  // const handleverifedStatus = () => {
  //   setIsVerfiied((prev=>!prev));
  // };

  // const handleToggleActive = () => {
  //   setActive((prev) => !prev);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     isActive: !prevData?.isActive ?? false,
  //   }));
  // };
  
  // const handleToggleVerified = () => {
  //   setIsVerified((prev) => !prev);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     isVerified: !prevData?.isVerified ?? false,
  //   }));
  // };
  
  const handleToggleActive = () => {
      setActive((prev) => !prev);
  };
  
  const handleToggleVerified = () => {
      setIsVerified((prev) => !prev);
  };
  


  if(isActive){
    console.log("is Active");
    formData.isActive = true;
  }else{
    console.log("is Not Active");
    formData.isActive = false;
  }


  if(isVerified){
    console.log("is Verified");
    formData.isVerified = true;
  }else{
    console.log("is not verified");
    formData.isVerified = false
  }


  console.log("this FORMDATA MME isActive:: ", formData.isActive);
  console.log("this FORMDATA MME isVerified:: ", formData.isVerified);

  return (

    <div className="w-full">
    <h2 className="text-lg font-bold mb-2">Step 1: Basic Information</h2>

<div className='grid grid-cols-3'>



          {/* profile picture  */}

          <div className="w-1/2 relative"    onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleFileDrop(e, 'profile')}>
        <label htmlFor="profile" className="block text-gray-700 font-medium">
          {/* Profile Pic */}
        </label>
        <input
          type="file"
          id="profile"
          name="profile"
          accept="image/*"
          onChange={(event) => handleFileChange(event, 'profile')}
          className="hidden"
        />
        {formData.profile ? (
          <div className="h-44 w-40 bg-gray-800 rounded-lg overflow-hidden relative">
            <img
              src={URL.createObjectURL(formData.profile)}
              alt="Uploaded Profile"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              className="absolute top-0 right-0 m-2 text-gray-700 hover:text-red-700 focus:outline-none"
              onClick={handleRemoveImage}
            >
              <TrashIcon className="w-5 h-5 bg-gary-800 rounded text-red-900 text-xs" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="profile"
            className="h-44 w-40 bg-gray-800 flex flex-col justify-center items-center cursor-pointer rounded-lg overflow-hidden border border-dashed border-gray-300 hover:border-indigo-500 transition duration-300 ease-in-out"
          >
            <ArrowUpTrayIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-center text-white">Add Picture</p>
            <p className="text-xs text-gray-500">(or drag and drop)</p>
          </label>
        )}
      </div>

 

<div className="w-full p-6 bg-white rounded">
        <h2 className="text-2xl font-semibold mb-4">User Status x</h2>
        <div className="flex items-center mb-4">
        <label
    className={`flex items-center cursor-pointer ${
      formData.isActive ? 'text-blue-500' : 'text-gray-600'
    }`}
    onClick={handleToggleActive}
  >
            <span className="mr-2">{isActive ? 'Active' : 'InActive'}</span>
            <div className={`w-12 h-6 rounded-full shadow-inner ${isActive ? 'bg-blue-500' : 'bg-gray-300'}`}>
              <div
                className={`w-6 h-6 rounded-full transform transition-transform ${
                  isActive ? 'translate-x-6' : 'translate-x-0'
                } ${isActive ? 'bg-white' : 'bg-gray-400'}`}
              />
            </div>
          </label>
        </div>
        <p className="text-sm text-gray-600">
          {isActive ? 'User is Active.' : 'User is InActive'}
        </p>
      </div>

      <div className="w-full p-6 bg-white rounded">
        <h2 className="text-2xl font-semibold mb-4">Verification Status</h2>
        <div className="flex items-center mb-4">
        <label
    className={`flex items-center cursor-pointer ${
      formData.isVerified ? 'text-blue-500' : 'text-gray-600'
    }`}
    onClick={handleToggleVerified}
  >
            <span className="mr-2">{isVerified ? 'Verified' : 'Not Verified'}</span>
            <div className={`w-12 h-6 rounded-full shadow-inner ${isVerified ? 'bg-blue-500' : 'bg-gray-300'}`}>
              <div
                className={`w-6 h-6 rounded-full transform transition-transform ${
                  isVerified ? 'translate-x-6' : 'translate-x-0'
                } ${isVerified ? 'bg-white' : 'bg-gray-400'}`}
              />
            </div>
          </label>
        </div>
        <p className="text-sm text-gray-600">
          {isVerified ? 'User is Verified.' : 'User is Not Verified'}
        </p>
      </div>


</div>
 
    <div className="space-x-4 bg-blue-500x"
   
    >
     

     {/* <Box>
<TextField
  size='small'
   id='outlined-basic'
 label='Listing Name' 
 value={descriptionInfo.listingName}
 onChange={(e) => setDescriptionInfo({ ...descriptionInfo, listingName: e.target.value })}/>

  </Box> */}

      <div className="mt-6">
        <div className="grid grid-cols-2 gap-3">
          {/* First Name */}
          {/* <FormField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required /> */}
    
    <div className='TextFied'>
    <TextField
  size='small'
   id='outlined-basic'
 label='First Name' 
 name="firstName" value={formData.firstName} onChange={handleInputChange} className='' />

    </div>

 

          {/* Middle Name */}

      <div className='TextFied'>
      <TextField
  size='small'
   id='outlined-basic'
 label='Middle Name' 
 name="nickName" value={formData.nickName} onChange={handleInputChange}   className='' />
 
      </div>



          {/* <FormField label="Middle Name" name="nickName" value={formData.nickName} onChange={handleInputChange} /> */}

       

        {/* Mobile */}
    
          {/* Last Name */}
          {/* <FormField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required /> */}
          <div className='TextFied'>
          <TextField
  size='small'
   id='outlined-basic'
 label='Last Name' 
 name="lastName" value={formData.lastName} onChange={handleInputChange}  className='TextFied' />
 </div>
          {/* Email */}
          {/* <FormField label="Email" name="email" value={formData.email} onChange={handleInputChange} /> */}

          <div className='TextFied'>
          <TextField
  size='small'
   id='outlined-basic'
 label='Email' 
 name="email" value={formData.email} onChange={handleInputChange}  className='TextFied' />
 </div>



          {/* <CountryCodeInput label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder='2345678' required /> */}
     


        </div>

   <div className='w-fit grid grid-cols-2 gap-4 '>
   <div className='TextFied'>
          {/* Phone */}
          <PhoneNumberValidation label="Mobile" formData={formData} setFormData={setFormData} value={formData.mobile} name="mobile" />
          </div>
          {/* <CountryCodeInput label="Mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder='51234567' required /> */}
          <div className='TextFied '>
          <PhoneNumberValidation label="Work phone" formData={formData} setFormData={setFormData} value={formData.phone} name="phone" />
          </div>
          
          </div>    



        <div className='text-md font-bold'>Location</div>
        <div className="gridCols">

          {/* Country */}
 
          <div className="mb-4">
            <label htmlFor="status" className="formLabel">
              Country
            </label>
            <SelectInput
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              options={countries}
            />
          </div>




          {/* <div className="mb-4">
            <label htmlFor="State" className="formLabel">
              State
            </label>
            <SelectInput
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              options={states}
            />
          </div> */}

          <FormField label="State" name="state" value={formData.state} onChange={handleInputChange} />





        </div>

        <div className='gridCols'>
          {/* Address */}
          <FormField label="Address1" name="address1" value={formData.address1} onChange={handleInputChange} />
          <FormField label="Address2" name="address2" value={formData.address2} onChange={handleInputChange} />

        </div>

        <div className='gridCols'>
          {/* Address */}
          <FormField label="City" name="city" value={formData.city} onChange={handleInputChange} />
          <FormField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />

        </div>



        <div className='text-md font-bold mt-5'>User Credentials</div>

    {/* Username */}
    <FormField label="Username" name="username" value={formData.username} onChange={handleInputChange} />



    <div className='gridCols'>
{/* Password */}
<FormFieldPSWD label="Password"  name="password" value={formData.password} onChange={handleInputChange} />

{/* Retyped Password */}
<FormFieldPSWD label="Retype Password" name="retypedPassword" value={formData.retypedPassword} onChange={handleInputChange} />


</div>
   

      </div>




    </div>









  </div>

  )
}

export default BasicInfo
