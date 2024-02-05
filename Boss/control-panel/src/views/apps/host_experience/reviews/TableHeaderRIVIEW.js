// ** MUI Imports
'use client'
import { ExitToAppOutlined, ImportExportOutlined, PrintOutlined, SearchOutlined } from '@mui/icons-material'

import Box from '@mui/material/Box'


// ** Icon Imports
 

const TableHeaderRIVIEWS = props => {
 
  const { 
    searchText,
  handleSearchInputChange
} = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }} >
 
      <div className='w-full bg-red-500x flex justify-between items-center'>

     
 <div className='text-lg font-semibold px-2'>
  REVIEWS
 </div>
 <div className='w-full flex justify-end tems-center'>
 <div className='flex  gap-2 items-center '>
  
 {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }} className="flex gap-2">
 <ViewAmenityCategory />
 <div className='BTN' onClick={handleAddBTN} >Add Amenity </div>

  </Box> */}

  <div className='flex  bg-violet-800x py-1 px-2 rounded-md  gap-3 text-white'>
        <div className='TABLE_HEADER_ACTIONS' title="Export"><ExitToAppOutlined /></div>
        <div className='TABLE_HEADER_ACTIONS' title="Import"><ImportExportOutlined /></div>
        <div className='TABLE_HEADER_ACTIONS' title="Print"><PrintOutlined /></div>
      </div>


  <div className='w-fit bg-violet-400x rounded-lg  py-1 00 border px-2'>
  <SearchOutlined />
  <input  
  value={searchText}
        onChange={handleSearchInputChange}
        type='text' placeholder='Search' className='outline-none px-2 mr-9 w-[60%]  text-xs' />
 

  {/* <button className='hiddenx h-8  bg-violet-400 p-2 px-4 text-xs rounded-lg text-white font-semibold hover:bg-violet-300 transform transition ease-in-out duration-500 z-50'> */}
    {/* Advanced  */}
  
     {/* </button>   */}

 </div>

 </div>
 </div>
 </div>
    </Box>
  )
}

export default TableHeaderRIVIEWS
