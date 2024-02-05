import React from 'react'
import FormField from '../FORM/FormFieldInput';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/solid';
import SelectInput from '../FORM/SelectInput';

const  EducationInfo = ({formData, handleInputChange ,handleFileDrop, handleFileChange,handleRemoveDocumentE}) => {
  const ACademicLevel = [
    {
      value: 'no_formal_education',
      label: 'No Formal Education',
    },
    {
      value: 'elementary_school',
      label: 'Elementary School',
    },
    {
      value: 'middle_school',
      label: 'Middle School',
    },
    {
      value: 'high_school',
      label: 'High School',
    },
    {
      value: 'vocational_certificate',
      label: 'Vocational Certificate',
    },
    {
      value: 'diploma',
      label: 'Diploma',
    },
    {
      value: 'associate_degree',
      label: 'Associate Degree',
    },
    {
      value: 'foundation_degree',
      label: 'Foundation Degree',
    },
    {
      value: 'bachelor_degree',
      label: "Bachelor's Degree",
    },
    {
      value: 'honours_degree',
      label: "Honours Degree",
    },
    {
      value: 'master_degree',
      label: "Master's Degree",
    },
    {
      value: 'professional_degree',
      label: 'Professional Degree',
    },
    {
      value: 'doctoral_degree',
      label: "Doctoral Degree",
    },
    {
      value: 'post_doctoral',
      label: 'Post-Doctoral Studies',
    },
  ];
  

  return (
     <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Step 6: Education Info</h2>

      {/* Academic Level */}
      {/* <FormField label="Academic Level" name="academicLevel" value={formData.academicLevel} onChange={handleInputChange} /> */}
      <div className="mb-4">
              <label htmlFor="status" className="formLabel">
              Academic Level
              </label>
              <SelectInput
                id="academicLevel"
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleInputChange}
                options={ACademicLevel}
              />
            </div>

      {/* Field of Study */}
      <FormField label="Field of Study" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} />

      {/* School */}
      <FormField label="School" name="school" value={formData.school} onChange={handleInputChange} />

 

  {/* document uploads  */}
  <div className='w-full bg-red-500x h-fit py-4 mt-10'>
          <div className='h-20'>&nbsp;</div>

          <div className='w-full bg-gray-100 h-52 flex justify-center items-center mb-8'>
            <div
              className="w-full bg-white p-8 rounded-lg shadow-md border border-dashed border-gray-400"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleFileDrop(e, 'documentIDsE')}
            >
              <label htmlFor="documentIDsE" className="block text-gray-700 font-medium text-lg mb-4 text-center">
                Upload Documents (PDFs or Images)
              </label>
              <div className="flex justify-center items-center">
                <input
                  type="file"
                  id="documentIDsE"
                  name="documentIDsE"
                  accept="image/*, application/pdf"
                  multiple
                  onChange={(event) => handleFileChange(event, 'documentIDsE')}
                  className="hidden"
                />
                <label
                  htmlFor="documentIDsE"
                  className="cursor-pointer py-6 px-8 text-gray-500 transition duration-300 ease-in-out"
                >
                  <ArrowUpTrayIcon className='h-12 w-12 mx-auto mb-2 text-gray-400' />
                  <p className="text-center">Drag and drop or click to upload</p>
                </label>
              </div>
            </div>
          </div>






          {formData.documentIDsE.map((document, index) => (
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
                onClick={() => handleRemoveDocumentE(index)}
              >
                <TrashIcon className='w-5 h-5 ' />
              </button>
            </div>
          ))}


        </div>

    </div>
  )
}

export default EducationInfo