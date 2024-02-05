import React, { useState } from 'react'
import Photos from './Photos';
import Video from './Video';
import { Typography } from '@mui/material';

const Medials = (
  {
   handleFileDrop,handleFileChange,handleRemovePHOTO_DOC,handleRemoveVIDEO_DOC,mediaData,setMediaData
  }
) => {
  const [selectedTb,setSelectedTab]= useState('photo');
 
  return (
    <div>
         <Typography variant='h6' sx={{ mb: 4 }}>
        Media
      </Typography>

      <div className='w-full  grid grid-cols-2  px-0 mb-1 bg-violet-400 rounded-lg'>
        <button onClick={()=>setSelectedTab('photo')} className={`${selectedTb === 'photo' ? 'bg-violet-800':'bg-violet-400'}  text-white py-2 rounded-tl-lg hover:bg-violet-800 transition transform ease-in-out duration-500 hover:shadow-2xl`}>Photos</button>
        <button onClick={()=>setSelectedTab('video')} className={`${selectedTb === 'video' ?'bg-violet-800':'bg-violet-400'}  text-white py-2 rounded-tr-lg hover:bg-violet-800 transition transform ease-in-out duration-500 hover:shadow-2xl`}> Videos</button>
      </div>

      {/* <div className='w-full  grid grid-cols-2 gap-3 px-4'>
        <button onClick={()=>setSelectedTab('photo')} className={`${selectedTb === 'photo'? 'bg-violet-800':'bg-violet-400'}  text-white py-2 rounded-lg hover:bg-violet-800 transition transform ease-in-out duration-500 hover:shadow-2xl`}>Photos</button>
        <button onClick={()=>setSelectedTab('video')} className={`${selectedTb === 'video'? 'bg-violet-800':'bg-violet-400'}  text-white py-2 rounded-lg hover:bg-violet-800 transition transform ease-in-out duration-500 hover:shadow-2xl`}> Videos</button>
      </div> */}

{/* body content  */}

<div className='w-full bg-gray-50 h-[500px]x my-4'>
{selectedTb === 'photo' 
? 
<Photos mediaData={mediaData} setMediaData={setMediaData}  handleFileDrop={handleFileDrop} handleFileChange={handleFileChange} handleRemovePHOTO_DOC={handleRemovePHOTO_DOC} />
:
<Video mediaData={mediaData} setMediaData={setMediaData}  handleFileDrop={handleFileDrop} handleFileChange={handleFileChange} handleRemoveVIDEO_DOC={handleRemoveVIDEO_DOC}/>}


</div>

    </div>
  )
}

export default Medials