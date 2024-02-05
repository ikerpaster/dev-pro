'use client'

import React, { useState } from 'react';

const Terms = ({termsInfo,setTermsInfo}) => {
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  // termsInfo,setTermsInfo
  const handleCancellationPolicyChange = (e) => {
    setCancellationPolicy(e.target.value);
    setTermsInfo((preveTermsInfo)=>({
      ...preveTermsInfo,
      cancellationPolicy:e.target.value,
    }));
  };


  return (
    <div className='h-[300px] w-3/5 bg-white p-4'>
      <div className='w-full h-full bg-white p-4 rounded-lg shadow-sm shadow-gray-300'>
        <h2 className="text-lg font-bold mb-4">Step 11 Terms</h2>

        <div className='flex items-center'>
          <label className="block text-sm font-medium text-gray-700 mr-4">Select Terms:</label>
          <select
            className="border border-gray-400 px-3 py-2 w-48 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
            value={cancellationPolicy}
            onChange={handleCancellationPolicyChange}
          >
            <option value="">Select cancellation policy</option>
            <option value="flexible">Flexible</option>
            <option value="moderate">Moderate</option>
            <option value="strict">Strict</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Terms;

