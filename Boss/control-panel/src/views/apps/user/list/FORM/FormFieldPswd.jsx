'use client'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import React, { useState } from 'react';

// const FormField = ({ label, name, value, onChange, required, type }) => {

  const FormFieldPSWD = ({ label, name, value, onChange, as, rows, required }) => {
    
    const InputComponent = as === 'textarea' ? 'textarea' : 'input';

    const [showPassword,setShowPassword]= useState(false)
  return (
    <>
    
    <div className="w-full my-2 flex items-center gap-2">
      <div className='w-full'>
      <label htmlFor={name} className="formLabel  ">
        {label}
      </label>
      <InputComponent
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={showPassword ? 'text':'password'}
        rows={rows}
        className="w-full px-3 py-2 border my-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        required={required}
      />
      </div>
    
      <div className='mt-5' onClick={()=>setShowPassword((prev)=>!prev)}> {!showPassword ? (<VisibilityOutlined />): (<VisibilityOffOutlined />)} </div>
    </div>
 

    </>
 
  );
};

export default FormFieldPSWD;
