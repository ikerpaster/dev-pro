'use client'
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberValidation = ({ label, name, value, onChange, formData, setFormData }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  useEffect(() => {
    if (phoneNumber) {
      setFormData({ ...formData, [name]: phoneNumber }); // Use computed property names to set formData
    }
  }, [phoneNumber, name,formData, setFormData]);

  // console.log("VALUE:: ", name);
  // console.log("this is the PHONE NUMBER:: ", formData.emergencyContactNumber);


  return (
    <div className='w-full'>
      <label>
        {label}:
        <PhoneInput
        className="w-full "
          country={'Rw'}
          value={phoneNumber}
          onChange={handleChange}
          inputProps={{
            required: true,
          }}
        />
      </label>
      {!valid && (
        <p className='text-red-500'>Please enter a valid phone number.</p>
      )}
      {/* {phoneNumber} */}
    </div>
  );
};

export default PhoneNumberValidation;