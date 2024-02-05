// ** MUI Imports
'use client'
import { Close, ExitToAppOutlined, ImportExportOutlined, PrintOutlined, SearchOutlined } from '@mui/icons-material'
import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Role from '../roles/permissionForm'
import { useState } from 'react'
 
 

// ** Icon Imports
 

const TableHeaderROle = props => {
  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => setOpen(!open)
  const { 
 
    searchText,
  handleSearchInputChange  
} = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }} >
 
      <div className='w-full bg-red-500x flex justify-between items-center'>

     
 <div className='text-lg font-semibold px-2'>

        Roles
 </div>
 <div className='w-full flex justify-end tems-center'>
 <div className='flex  gap-2 items-center '>
  
 
  <Button variant='contained' onClick={handleDialogToggle}>
          Add Role
        </Button>
  {/* </Box> */}

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
 

 
 
 </div>

 </div>
 </div>
 </div>


      
      <Dialog fullWidth maxWidth='md' onClose={handleDialogToggle} open={open}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
             Role & Permissions
          </Typography>
          <Typography variant='body2'>Permissions you may use and assign to user's Role.</Typography>
        </DialogTitle>


        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
            <Role />
            <button className='absolute top-2 right-3 hover:text-red-500' onClick={handleDialogToggle}> <Close /> </button>

          {/* </Box> */}
        </DialogContent>
      </Dialog>

    </Box>
  )
}

export default TableHeaderROle
