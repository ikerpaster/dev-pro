import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/solid';
import React from 'react'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Third Party Imports
import DatePicker from 'react-datepicker'
// import PickersComponent from '../STEPS/ELE/PickersCustomInput';
import FormField from '../FORM/FormFieldInput';
import PickersComponent from 'src/views/ele/PickersCustomInput';


const LegalInfo = ({formData,setFormData, handleInputChange,handleFileDrop, handleFileChange, handleRemoveDocument}) => {
 
  const handleDateChange = date => {
    setFormData({ ...formData, visaExpiry: date });
  };

  const handleDateChangeE = date => {
    setFormData({ ...formData, passportExpiry: date });
  };


  return (
    <div className='w-full'>
    <h2 className="text-lg font-bold mb-4">Step 5: Legal Info</h2>

    {/* Visa No */}
    <FormField label="Visa No" name="visaNo" value={formData.visaNo} onChange={handleInputChange} />

    {/* Visa Expiry */}
    {/* <div className="mb-4">
      <label htmlFor="visaExpiry" className="block text-gray-700 font-medium">
        Visa Expiry
      </label>
      <DateInput
        id="visaExpiry"
        name="visaExpiry"
        value={formData.visaExpiry}
        onChange={handleInputChange}
      />
    </div> */}

<div className="w-full">
    <label htmlFor="status" className="formLabel">
    &nbsp;
            </label>

  <DatePickerWrapper>
   

   <DatePicker
       selected={formData?.visaExpiry}
       id='picker-open-date'
       onChange={handleDateChange}
       name="visaExpiry"
        dateFormat="dd/MM/yyyy" 
        minDate={new Date()}
        customInput={<PickersComponent label='Visa Expiry' />} 
        className='w-full'
      />
          </DatePickerWrapper>

 </div>



    {/* Emirates ID No */}
    <FormField label="Emirates ID No" name="emiratesIdNo" value={formData.emiratesIdNo} onChange={handleInputChange} />

    {/* Passport No */}
    <FormField label="Passport No" name="passportNo" value={formData.passportNo} onChange={handleInputChange} />

    {/* Passport Expiry */}
    {/* <div className="mb-4">
      <label htmlFor="passportExpiry" className="block text-gray-700 font-medium">
        Passport Expiry
      </label>
      <DateInput
        id="passportExpiry"
        name="passportExpiry"
        value={formData.passportExpiry}
        onChange={handleInputChange}
      />
    </div> */}

<div className="w-full">
    <label htmlFor="status" className="formLabel">
    &nbsp;
            </label>

  <DatePickerWrapper>
   

   <DatePicker
       selected={formData?.passportExpiry}
       id='picker-open-date'
       onChange={handleDateChangeE}
       name="passportExpiry"
        dateFormat="dd/MM/yyyy" 
        minDate={new Date()}
        customInput={<PickersComponent label='Passport Expiry' />} 
        className='w-full'
      />
          </DatePickerWrapper>

 </div>

     {/* document uploads  */}
<div className='w-full bg-red-500x h-fit py-4 mt-10'>
        <div className='h-20'>&nbsp;</div>


        <div className='w-full bg-gray-100 h-52 flex justify-center items-center mb-8'>
          <div
            className="w-full bg-white p-8 rounded-lg shadow-md border border-dashed border-gray-400"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleFileDrop(e, 'documentIDs')}
          >
            <label htmlFor="documentIDs" className="block text-gray-700 font-medium text-lg mb-4 text-center">
              Upload Documents (PDFs or Images)
            </label>
            <div className="flex justify-center items-center">
              <input
                type="file"
                id="documentIDs"
                name="documentIDs"
                accept="image/*, application/pdf"
                multiple
                onChange={(event) => handleFileChange(event, 'documentIDs')}
                className="hidden"
              />
              <label
                htmlFor="documentIDs"
                className="cursor-pointer py-6 px-8 text-gray-500 transition duration-300 ease-in-out"
              >
                <ArrowUpTrayIcon className='h-12 w-12 mx-auto mb-2 text-gray-400' />
                <p className="text-center">Drag and drop or click to upload</p>
              </label>
            </div>
          </div>
        </div>






        {formData.documentIDs.map((document, index) => (
          <div key={index} className="flex w-full justify-between items-center space-x-2 my-3 border border-gray-100 py-2 px-5">
            <div className='flex gap-2'>
              <div className="h-14 w-14 bg-blue-400 rounded-lg overflow-hidden">
                {document.type.includes('image') ? (
                  <img
                    src={URL.createObjectURL(document)}
                    alt={`Uploaded Document ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-500 font-semibold">
                    PDF
                  </div>
                )}
              </div>

              {/* with extensions  */}
              {/* <div className=''>
      <div className=''>{document.name}</div>
      <div className=''>
      {((document.size / 1024).toFixed(2) < 1024) ?
          `${(document.size / 1024).toFixed(2)} KB` :
          `${(document.size / (1024 * 1024)).toFixed(2)} MB`
        }

      </div>
    </div> */}

              {/* with no extenstion */}
              <div className=''>
                <div className=''>{document.name.split('.').slice(0, -1).join('.')}</div>
                <div className=''>
                  {((document.size / 1024).toFixed(2) < 1024) ?
                    `${(document.size / 1024).toFixed(2)} KB` :
                    `${(document.size / (1024 * 1024)).toFixed(2)} MB`
                  }
                </div>
              </div>




            </div>
            <button
              type="button"
              className="text-red-500 hover:text-red-700 font-medium"
              onClick={() => handleRemoveDocument(index)}
            >
              <TrashIcon className='w-5 h-5 ' />
            </button>
          </div>
        ))}


      </div>
  </div>
  )
}

export default LegalInfo