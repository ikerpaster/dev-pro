'use client'
 
import React, { useState } from 'react';
 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upload from 'src/@core/utils/upload';
 

const Submit = ({ formData }) => {
  const [backendResponse, setBackendResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 

  const handleSubmit = async () => {
    try {
      const uploadedProfilePicUrl = formData.profile ? await upload(formData.profile) : null;
      const uploadedEducationDocUrls = [];
      const uploadedLegalDocUrls = [];
  
      if (formData.documentIDsE) {
        for (const selectedFileLegalDoc of formData.documentIDsE) {
          const url = await upload(selectedFileLegalDoc);
          uploadedLegalDocUrls.push(url);
        }
      }
  
      if (formData.documentIDs) {
        for (const selectedFileLegalDoc of formData.documentIDs) {
          const url = await upload(selectedFileLegalDoc);
          uploadedEducationDocUrls.push(url);
        }
      }
  
      const profilePhotoUrl = uploadedProfilePicUrl || null;
  
      const combinedData = {
        ...formData,
        profile: profilePhotoUrl,
        educationDocs: uploadedEducationDocUrls,
        legalDocs: uploadedLegalDocUrls,
      };
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Parse error message from JSON response
        throw new Error(errorData.message || 'An error occurred');
      }

      const responseData = await res.json(); // Assuming the response is JSON
      const successMessage = responseData.message || 'Registration successful';

      toast.success(successMessage);
    } catch (error) {
      console.error('Error sending data to backend:', error);
      setError(error.message || 'An error occurred');
      toast.error(error.message || 'An error occurred');
    }
  };
  

 



  return (
    <div className='w-full h-full bg-gray-800 text-white py-40'>
      <h1>Final Step</h1>

      {/* Display backend response */}
      {backendResponse && (
        <div>
          <h2>Backend Response:</h2>
          <pre>{JSON.stringify(backendResponse, null, 2)}</pre>
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error.toString()}</p>
        </div>
      )}

      <div className='w-3/4 h-40 bg-violet-300 mx-auto shadow-2xl shadow-white rounded-lg '> 
      
      <button onClick={handleSubmit} className='py-4 px-5 bg-blue-600 m-10 text-white shadow-2xl rounded-xl'>
        Confirm && Send Data to database 
      </button>
      
      </div>

   
    </div>
  );
};

 
export default Submit