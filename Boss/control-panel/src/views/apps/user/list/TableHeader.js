// ** MUI Imports
'use client'
import { ExitToAppOutlined, ImportExportOutlined, PrintOutlined, SearchOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import AddUserModel from './AddUSER_Modal'
import { GridToolbarFilterButton } from '@mui/x-data-grid'
import QuickSearchToolbarr from './ele/QuickSearchToolbar'


const TableHeader = props => {
 
  const { 
    searchText,
  handleSearchInputChange 
} = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }} >
 
      <div className='w-full bg-red-500x flex justify-between items-center'>

     
 <div className='text-lg font-semibold px-2'>
  Users
 </div>
 <div className='w-full flex justify-end tems-center'>
 <div className='flex  gap-2 items-center '>
  
 {/* <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2.5 }}
          placeholder='Search Permission'
          onChange={e => handleFilter(e.target.value)}
        /> */}

 <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
    

    <Grid  sx={{ mb: 0 }} >
    {/* <div className='py-2 bg-violet-400 text-xs px-3 rounded-lg text-white cursor-pointer hover:bg-violet-300 transform transition ease-in-out duration-500 ' onClick={()=>setModalOpenAdmin(true)} >New User</div> */}
 
    <AddUserModel />
       </Grid>
 
  </Box>

  <div className='flex  bg-violet-800x py-1 px-2 rounded-md  gap-3 text-white  '>
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

export default TableHeader
