 

'use client'

import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Add, Close } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';


const PriceRules = ({pricingRulesInfo,setPricingRulesInfo }) => {
  // const [pricingRulesInfo, setPricingRulesInfo] = useState({
  //   lengthOfStayDiscounts: [{ nights: '', percentage: '' }],
  //   earlyBirdDiscounts:[{ days: '', percentage: '' }],
  //   lastMinDiscounts: [{ days: '', percentage: '' }],
  // });



  const handleAddDiscount = () => {
    setPricingRulesInfo((prevPricingRulesInfo) => ({
      ...prevPricingRulesInfo,
      lengthOfStayDiscounts: [...prevPricingRulesInfo.lengthOfStayDiscounts, { nights: '', percentage: '' }],
    }));
  };

  const handleRemoveDiscount = (index) => {
    setPricingRulesInfo((prevPricingRulesInfo) => {
      if (!prevPricingRulesInfo.lengthOfStayDiscounts || prevPricingRulesInfo?.lengthOfStayDiscounts.length === 1) {
        return prevPricingRulesInfo;
      }
      const updatedDiscounts = [...prevPricingRulesInfo?.lengthOfStayDiscounts];
      updatedDiscounts.splice(index, 1);
      return { ...prevPricingRulesInfo, lengthOfStayDiscounts: updatedDiscounts };
    });
  };

  const handleUpdateDiscount = (index, field, value) => {
    setPricingRulesInfo((prevPricingRulesInfo) => {
      const updatedDiscounts = [...prevPricingRulesInfo.lengthOfStayDiscounts];
      updatedDiscounts[index][field] = value;
      return { ...prevPricingRulesInfo, lengthOfStayDiscounts: updatedDiscounts };
    });
  };

  // sssssssssssssssssss 

  const handleAddEarlyBirdDiscount = () => {
    setPricingRulesInfo((prevPricingRulesInfo) => ({
      ...prevPricingRulesInfo,
      earlyBirdDiscounts: [...prevPricingRulesInfo?.earlyBirdDiscounts, { days: '', percentage: '' }],
    }));
  };

  const handleRemoveEarlyBirdDiscount = (index) => {
    setPricingRulesInfo((prevPricingRulesInfo) => {
      if (!prevPricingRulesInfo.earlyBirdDiscounts || prevPricingRulesInfo?.earlyBirdDiscounts.length === 1) {
        return prevPricingRulesInfo;
      }
      const updatedDiscounts = [...prevPricingRulesInfo?.earlyBirdDiscounts];
      updatedDiscounts.splice(index, 1);
      return { ...prevPricingRulesInfo, earlyBirdDiscounts: updatedDiscounts };
    });
  };

  const handleUpdateEarlyBirdDiscount = (index, field, value) => {
    setPricingRulesInfo((prevPricingRulesInfo) => {
      const updatedDiscounts = [...prevPricingRulesInfo?.earlyBirdDiscounts];
      updatedDiscounts[index][field] = value;
      return { ...prevPricingRulesInfo, earlyBirdDiscounts: updatedDiscounts };
    });
  };

  // latminnnnnnnnn discount 
  const handleAddLastMinDiscount = () => {
    setPricingRulesInfo((prevPricingRulesInfo) => ({
      ...prevPricingRulesInfo,
      lastMinDiscounts: [...prevPricingRulesInfo?.lastMinDiscounts, { days: '', percentage: '' }],
    }));
  };

  const handleRemoveLastMinDiscount = (index) => {
    setPricingRulesInfo((prevPricingRulesInfo) => {
      if (!prevPricingRulesInfo.lastMinDiscounts || prevPricingRulesInfo.lastMinDiscounts.length === 1) {
        return prevPricingRulesInfo;
      }
      const updatedDiscounts = [...prevPricingRulesInfo.lastMinDiscounts];
      updatedDiscounts.splice(index, 1);
      return { ...prevPricingRulesInfo, lastMinDiscounts: updatedDiscounts };
    });
  };

  const handleUpdateLastMinDiscount = (index, field, value) => {
    setPricingRulesInfo((prevPricingRulesInfo) => {
      const updatedDiscounts = [...prevPricingRulesInfo.lastMinDiscounts];
      updatedDiscounts[index][field] = value;
      return { ...prevPricingRulesInfo, lastMinDiscounts: updatedDiscounts };
    });
  };



  return (
    <div className="w-full bg-white p-1 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Price Rules</h2>

      <div className="mb-4">
     
        <div className='w-full flex  justify-between bg-red-400x items-baseline py-2'>
        <h3 className="text-lg font-bold mb-2">Length of Stay Discounts</h3>
<button
          className="bg-blue-500 text-white w-fit p-1 rounded" onClick={handleAddDiscount}>
          <Add className='w-4 h-4' /> 
        </button>
</div>

        {pricingRulesInfo?.lengthOfStayDiscounts.map((discount, index) => (
          <div key={index} className="flex gap-4 mb-2">
    

            <Box>
<TextField 
size='small'
type='number'
 label='Length of Stay Discounts' 
 value={discount.nights}
 onChange={(e) =>handleUpdateDiscount(index, 'nights', e.target.value)}
 />

  </Box>
  
 

            <Box>
<TextField 
size='small'
type='number'
 label='Percentage Discount' 
 value={discount.percentage}
 onChange={(e) =>
   handleUpdateDiscount(index, 'percentage', e.target.value)
 }
 />

  </Box>


            <div className="flex items-center">
           
              {pricingRulesInfo.lengthOfStayDiscounts.length > 1 && (
                <button
                  className="bg-red-500 text-white  p-1 rounded w-fit"
                  onClick={() => handleRemoveDiscount(index)}
                >
                  <Close className='h-4 w-4' />
                </button>
              )}
            </div>
          </div>
        ))}

 





      </div>

      <div className="mb-4">
        {/* <h3 className="text-lg font-bold mb-2">Early Bird Discounts</h3> */}
        <div className='w-full flex  justify-between bg-red-400x items-baseline py-2'>
        <h3 className="text-lg font-bold mb-2">Early Bird Discounts</h3>
<button
          className="bg-blue-500 text-white w-fit p-1 rounded" 
          onClick={handleAddEarlyBirdDiscount}
          >
          <Add className='w-4 h-4' /> 
        </button>
</div>

        {pricingRulesInfo?.earlyBirdDiscounts.map((discount, index) => (
          <div key={index} className="flex gap-4 mb-2">
            

            <Box>
<TextField 
size='small'
type='number'
 label='Period of stay' 
 value={discount.days}
 onChange={(e) =>
   handleUpdateEarlyBirdDiscount(index, 'days', e.target.value)
 }
 />

  </Box>

 

            <Box>
<TextField 
size='small'
type='number'
 label='Percentage Discount' 
 value={discount.percentage}
 onChange={(e) =>
   handleUpdateEarlyBirdDiscount(index, 'percentage', e.target.value)
 }
 />

  </Box>


            <div className="flex items-center">
             
              {pricingRulesInfo?.earlyBirdDiscounts.length > 1 && (
                <button
                  className="bg-red-500 text-white w-fit p-1 rounded"
                  onClick={() => handleRemoveEarlyBirdDiscount(index)}
                >
                  <Close className='h-4 w-4' />
                </button>
              )}
            </div>
          </div>
        ))}

{/* <button
                className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                onClick={handleAddEarlyBirdDiscount}
              >
                Add
              </button> */}

              {/* <div className='w-full flex  justify-end bg-red-400x'>
<button
          className="bg-blue-500 text-white w-fit p-1 rounded  "
          onClick={handleAddEarlyBirdDiscount}
        >
          <Add className='w-4 h-4' />
        </button>
</div> */}

      </div>

      <div className="mb-4">
        {/* <h3 className="text-lg font-bold mb-2">Last Minute Discounts</h3> */}
        <div className='w-full flex  justify-between bg-red-400x items-baseline py-2'>
        <h3 className="text-lg font-bold mb-2">Last Minute Discounts</h3>
<button
          className="bg-blue-500 text-white w-fit p-1 rounded" 
          onClick={handleAddLastMinDiscount}
          >
          <Add className='w-4 h-4' /> 
</button>
</div>

        {pricingRulesInfo?.lastMinDiscounts.map((discount, index) => (
          <div key={index} className="flex gap-4 mb-2">
           

            <Box>
<TextField 
size='small'
type='number'
 label='Period of stay' 
 value={discount.days}
 onChange={(e) =>
   handleUpdateLastMinDiscount(index, 'days', e.target.value)
 }
 />

  </Box>

 

            <Box>
<TextField 
size='small'
type='number'
 label='Percentage Discount' 
 value={discount.percentage}
 onChange={(e) =>
   handleUpdateLastMinDiscount(index, 'percentage', e.target.value)
 }
 />

  </Box>


            <div className="flex items-center">

              {pricingRulesInfo?.lastMinDiscounts.length > 1 && (
                <button
                  className="bg-red-500 text-white w-fit p-1 rounded"
                  onClick={() => handleRemoveLastMinDiscount(index)}
                >
                  <Close className='w-4 h-4' />
                </button>
              )}
            </div>


          </div>
        ))}
{/* <div className='w-full flex justify-end bg-red-400x'>
<button
          className="bg-blue-500 text-white w-fit p-1 rounded  "
          onClick={handleAddLastMinDiscount}
        >
          <Add className='w-4 h-4' />
        </button>
</div> */}
       

      </div>


    </div>
  );
};

export default PriceRules;
