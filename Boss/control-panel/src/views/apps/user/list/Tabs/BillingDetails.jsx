'use client'
import React, { useState } from 'react'
import FormField from '../FORM/FormFieldInput';
import SelectInput from '../FORM/SelectInput';

const BillingDetails = ({formData, handleInputChange,setFormData,months,years}) => {
  const [isCardSaved, setIsCardSaved] = useState(false);

  const handleToggle = () => {
    setIsCardSaved(!isCardSaved);
  };

 
  const handleToggleSavedCard = () => {
 
    setIsCardSaved((prev=>!prev));
    setFormData((prevData) => ({
      ...prevData,
      isCardSaved: !prevData.isCardSaved,
    }));
 
  

  };
  if(isCardSaved){
    console.log("card saved");
  }else{
    console.log("card Not saved");
  }


  const countries = [
    { value: 'KENYA', label: 'KENYA' },
    { value: 'BURUNDI', label: 'BURUNDI' },
    { value: 'UAE', label: 'UAE' },
  ];

  return (
    <div className="w-full ">

    <h2 className="text-2xl font-semibold mb-4">Step8 Billing Details</h2>
          <div className="h-fit flex gap-2 py-2 justify-center bg-red-100x">
            <div className=" w-full  bg-white rounded shadow-md px-4">
            <div className='font-bold'>Card Details</div>
              <form>
    
    
    
         
    
              <FormField label="NAme On Card" name="cardHolderName" value={formData.cardHolderName} onChange={handleInputChange} />
    
    
                <FormField label="Card number" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
    
                <div className='grid grid-cols-3 gap-2 mt-4'>
    
                  {/* <FormField label="Month" name="expirationMonth" value={formData.expirationMonth} onChange={handleInputChange} /> */}
                  {/* <FormField label="Year" name="expirationYear" value={formData.expirationYear} onChange={handleInputChange} /> ccc  */}
    
                  <div className="mb-4">
                  <label htmlFor="status" className="formLabel">
                   Month
                  </label>
                  <SelectInput
                    id="expirationMonth"
                    name="expirationMonth"
                    value={formData.expirationMonth}
                    onChange={handleInputChange}
                    options={months}
                  />
                </div>
    
    
                  <div className="mb-4">
                  <label htmlFor="status" className="formLabel">
                   Years
                  </label>
                  <SelectInput
                    id="expirationYear"
                    name="expirationYear"
                    value={formData.expirationYear}
                    onChange={handleInputChange}
                    options={years}
                  />
                </div>
    
    
    
    
                  <FormField label="CVV" name="cvv" value={formData.cvv} onChange={handleInputChange} />
                </div>
    
    
    
    
                {/* <div className=" w-full p-6 bg-white rounded">
                  <h2 className="text-2xl font-semibold mb-4">Save Card for further billing ?</h2>
                  <div className="flex items-center mb-4">
                    <label
                      className={`flex items-center cursor-pointer ${isCardSaved ? 'text-blue-500' : 'text-gray-600'
                        }`}
                      onClick={handleToggle}
                    >
                      <span className="mr-2">No</span>
                      <div className={`w-12 h-6 rounded-full shadow-inner ${isCardSaved ? 'bg-blue-500' : 'bg-gray-300'
                        }`}>
                        <div className={`w-6 h-6 rounded-full transform transition-transform ${isCardSaved ? 'translate-x-6' : 'translate-x-0'
                          } ${isCardSaved ? 'bg-white' : 'bg-gray-400'}`} />
                      </div>
                      <span className="ml-2">Yes</span>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    {isCardSaved
                      ? 'Card will be saved for Later.'
                      : 'Card will not be saved.'}
                  </p>
                </div> */}
    
     
    
    
    <div className="w-full p-6 bg-white rounded">
    <h2 className="text-2xl font-semibold mb-4">Save Card for further billing ?</h2>
              <div className="flex items-center mb-4">
              <label
          className={`flex items-center cursor-pointer`}
          onClick={handleToggleSavedCard}
        >
                     <span className={` mr-2 ${!isCardSaved ? 'text-blue-500' : 'text-gray-500'}`}>No</span>
                  <div className={`w-12 h-6 rounded-full shadow-inner ${isCardSaved ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <div
                      className={`w-6 h-6 rounded-full transform transition-transform ${
                        isCardSaved ? 'translate-x-6' : 'translate-x-0'
                      } ${isCardSaved ? 'bg-white' : 'bg-gray-400'}`}
                    />
                  </div>
                  <span className={` ml-2 ${isCardSaved ? 'text-blue-500' : 'text-gray-500'}`}>Yes</span>
                </label>
              </div>
              <p className="text-sm text-gray-600">
                {isCardSaved ? 'Card will be saved for Later.'
          : 'Card will not be saved.'}
              </p>
            </div>
    
    
    
    
              </form>
            </div>
    
            <div className='h-50 w-full bg-red-500x px-4 shadow-md shadow-gray-200'>
              <div className='font-bold my-2'>Payment Details</div>
    
              <div className="mb-4">
                  <label htmlFor="status" className="formLabel">
                    Bank Country Religion
                  </label>
                  <SelectInput
                    id="countryBank"
                    name="countryBank"
                    value={formData.countryBank}
                    onChange={handleInputChange}
                    options={countries}
                  />
                </div>
              <FormField label="Account Name" name="accountName" value={formData.accountName} onChange={handleInputChange} />
            <FormField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} />
            <FormField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleInputChange} />
    
            <FormField label="SWIFT Number" name="swiftNumber" value={formData.swiftNumber} onChange={handleInputChange} />
            <FormField label="IBAN Number" name="ibanNumber" value={formData.ibanNumber} onChange={handleInputChange} />
            <FormField label="Confirm IBAN Number" name="ibanNumberConfirm" value={formData.ibanNumberConfirm} onChange={handleInputChange} />
            {/* <FormField label="Country" name="ibanNumber" value={formData.ibanNumber} onChange={handleInputChange} /> */}
          
     
            </div>
          </div>
    
    
    
    
    
    
    
        </div>
  )
}

export default BillingDetails