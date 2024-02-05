'use client'
import { FormControl, InputLabel, Select,Grid, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import useSWR from 'swr';


const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const PRE_RENTAL = ({  selectedPurpose, setSelectedPurpose,
  continueB, setContinueB ,
   selectedFurnishing,
    setSelectedFurnishing,
     selectedType, setSelectedType,
     selectedCategory, setSelectedCategory,
     previewB, setPreviewB
     }) => {

  // const [selectedPurpose, setSelectedPurpose] = useState(null);
  // const [continueB, setContinueB] = useState(false);

  // const handleUserTypeSelection = (userType) => {
  //   setSelectedPurpose(userType);
  // };

  const handleContinue = () => {
    setContinueB(prev => prev + 1);
  };

  const handlePreview = () => {
    setContinueB(prev => (prev > 1 ? prev - 1 : 1));
  };
  


  const [catechId,setCatchId]=useState();
// this property type 
let urlProType = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-type/all`;
const { data:dataProType, isLoading:isLoadingProType, error:ErrorProType } = useSWR(
  urlProType,
  fetcher,
  {
    revalidateOnFocus: true, // Enable real-time revalidation
    fallback: <div>Loading...</div>,
  }
);


// this property category 
let urlProCategory = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-category/all/${catechId}`;
const { data:dataProCategory, isLoading:isLoadingProCategory, error:ErrorProCategory } = useSWR(
  urlProCategory,
  fetcher,
  {
    revalidateOnFocus: true, // Enable real-time revalidation
    fallback: <div>Loading...</div>,
  }
);
  
 
  return (
    <>
 
          {/* Make this full screen width */}
          <div className="bg-white w-full bg-opacity-120 px-3 rounded-lg z-10  h-[calc(100vh-20rem)]  overflow-y-hidden">
            <div className='w-full flex justify-end -mt-6  items-center'>  </div>

            <div className='px-2 w-full h-full py-14 '>
 
              <hr />
 
              {continueB === 1 && (

<div className="w-full h-[calc(100vh-20rem)] bg-yellow-800x relative">
  <div className="w-full px-20 mt-20">
    <div className="text-[2rem] font-bold"> Purpose</div>
    <span className="text-gray-400 text-md"> Choose Property Purpose </span>
  </div>
 
  <div className="w-full grid grid-cols-2 gap-5  items-center px-20 mt-20 text-xs">
    <div
      onClick={() => setSelectedPurpose('Buy')}
      className={`bg-white SelectUserCard ${selectedPurpose === 'Buy' ? 'selected' : ''
        }`}
    >
      <span className="titleDUser ">Buy</span>
      <span className="subDUser">List a Property for Sale</span>
    </div>

    <div
      onClick={() => setSelectedPurpose('Rent')}
      className={`SelectUserCard ${selectedPurpose === 'Rent' ? 'selected' : ''
        }`}
    >
      <span className="titleDUser">Rent</span>
      <span className="subDUser">List a Property for Rent</span>
    </div>
 
  </div>
  {/* xlg:h-[400px] lg:h-[220px] */}
  {/* previewB, setPreviewB */}
  <div className="my-20 float-right   mr-20 ">
   <div
      onClick={()=>setContinueB(prev => prev + 1)}
      className={`w-fit bg-[#7239ea] py-4 px-5 md:text-md font-bold text-white  rounded-lg ${selectedPurpose ? 'cursor-pointer' : 'opacity-50 pointer-events-none'
        }`}
    >
      <span>Continue</span>
      <span>
      </span>
    </div>

  </div>

</div>
)}

{continueB === 2 && (

<div className="w-full h-[calc(100vh-20rem)] bg-yellow-800x relative">
<div className="w-full px-20 mt-20">
  <div className="text-[2rem] font-bold">Property Types</div>
  <span className="text-gray-400 text-md">Select the Type,Category of the Property</span>
</div>


<div className="w-full grid grid-cols-2 gap-5  items-center px-20 mt-20 text-xs">
  
    {dataProType?.map((e,i)=>(
            
            <div  key={e?._id}
            onClick={() => {setCatchId(e?._id); setSelectedType(e?._id)}}
            className={`bg-white SelectUserCard ${catechId ===  e._id ? 'selected' : ''
              }`}
          >
            <span className="titleDUser ">{e?.name}</span>
            <span className="subDUser">{e?.description}</span>
          </div>

            ))}

 
 
  </div>
  {/* xlg:h-[400px] lg:h-[220px] */}

  <div className="my-20 w-full flex justify-between mr-20 ">
  <div
      onClick={handlePreview}
      className={`w-fit bg-[#7239ea] py-4 px-5 md:text-md font-bold text-white  rounded-lg cursor-pointer `}
    >
      <span>Prev</span>
      <span>
      </span>
    </div>

    <div
      onClick={handleContinue}
      className={`w-fit bg-[#7239ea] py-4 px-5 md:text-md font-bold text-white  rounded-lg ${catechId ? 'cursor-pointer' : 'opacity-50 pointer-events-none'
        }`}
    >
      <span>Continue</span>
      <span>
      </span>
    </div>
  </div>

</div>
)}


{continueB === 3 && (

<div className="w-full h-[calc(100vh-20rem)] bg-yellow-800x relative">
<div className="w-full px-20 mt-20">
  <div className="text-[2rem] font-bold">Property Types</div>
  <span className="text-gray-400 text-md">Select the Type,Category of the Property</span>
</div>


  <div className="w-full grid grid-cols-1 gap-5  items-center px-20 mt-20 text-xs">

 
 
<Grid item sm={12} xs={12}>
<FormControl fullWidth>
          <InputLabel id='demo-multiple-name-label' >Property Category*</InputLabel>
          <Select
            // multiple
            fullWidth
            size='md'
            label='Property Category*'
           className='relative'
            MenuProps={MenuProps}
            id='demo-multiple-name'
            labelId='demo-multiple-name-label'
              value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
          >
             {dataProCategory?.map((e,i)=>(
            <MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>
            ))}
<div className='w-full text-center'>

{/* <button className='w-fit mx-auto bg-blue-500 py-2 text-white px-4 rounded-lg shadow-2xl text-xs my-2'>Add new </button> */}

{/* <AddProType />  */}
</div>
          </Select>
        
        </FormControl>

</Grid>


  </div>
  {/* xlg:h-[400px] lg:h-[220px] */}

   <div className="my-20 w-full flex justify-between mr-20 ">
  <div
      onClick={handlePreview}
      className={`w-fit bg-[#7239ea] py-4 px-5 md:text-md font-bold text-white  rounded-lg ${selectedPurpose ? 'cursor-pointer' : 'opacity-50 pointer-events-none'
        }`}
    >
      <span>Prev</span>
      <span>
      </span>
    </div>

    <div
      onClick={handleContinue}
      className={`w-fit bg-[#7239ea] py-4 px-5 md:text-md font-bold text-white  rounded-lg ${selectedPurpose ? 'cursor-pointer' : 'opacity-50 pointer-events-none'
        }`}
    >
      <span>Continue</span>
      <span>
      </span>
    </div>
  </div>

</div>
)}


{continueB === 4 && (

<div className="w-full h-[calc(100vh-20rem)] bg-yellow-800x relative">
<div className="w-full px-20 mt-20">
  <div className="text-[2rem] font-bold">Furnishing</div>
  <span className="text-gray-400 text-md">Select the Furnishing Type</span>
</div>


  <div className="w-full grid grid-cols-2 gap-5  items-center px-20 mt-20 text-xs">
    <div
      onClick={() => setSelectedFurnishing('Furnished')}
      className={`bg-white SelectUserCard ${selectedFurnishing === 'Furnished' ? 'selected' : ''
        }`}
    >
      <span className="titleDUser ">Furnished</span>
      <span className="subDUser">Employees / staff</span>
    </div>

    <div
      onClick={() => setSelectedFurnishing('Unfurnished')}
      className={`SelectUserCard ${selectedFurnishing === 'Unfurnished' ? 'selected' : ''
        }`}
    >
      <span className="titleDUser">UnFurnished</span>
      <span className="subDUser">Property Owners / Managers</span>
    </div>

  </div>
  {/* xlg:h-[400px] lg:h-[220px] */}

   <div className="my-20 w-full flex justify-between mr-20 ">
  <div
      onClick={handlePreview}
      className={`w-fit bg-[#7239ea] py-4 px-5 md:text-md font-bold text-white  rounded-lg ${selectedPurpose ? 'cursor-pointer' : 'opacity-50 pointer-events-none'
        }`}
    >
      <span>Prev</span>
      <span>
      </span>
    </div>

    <div
      onClick={handleContinue}
      className={`w-fit bg-[#7239ea] py-4 px-5 md:text-md font-bold text-white  rounded-lg ${selectedPurpose ? 'cursor-pointer' : 'opacity-50 pointer-events-none'
        }`}
    >
      <span>Continue</span>
      <span>
      </span>
    </div>
  </div>

</div>
)}


{/* {continueB && (<USER_INFO userCategory={selectedPurpose} isAdmin={selectedPurpose==='admin'} isCustomer={selectedPurpose==='customer'} isHost={selectedPurpose==='host'} /> )}
               
           */}


              <div className="mt-6 flex justify-end">

              </div>
            </div>
          </div>
   
    </>
  );
};

export default PRE_RENTAL  
 
