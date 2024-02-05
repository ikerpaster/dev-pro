// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Role from '../roles/permissionForm'
import { Close, ExitToAppOutlined, ImportExportOutlined, PrintOutlined } from '@mui/icons-material'

const TableHeader = props => {
  // ** Props
  const { value, handleFilter } = props

  // ** State
  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => setOpen(!open)

  const onSubmit = e => {
    setOpen(false)
    e.preventDefault()
  }

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div className='flex  bg-violet-300 py-1 px-2 rounded-md  gap-3 text-white shadow-2xl shadow-violet-500'>
        <div className='TABLE_HEADER_ACTIONS'><ExitToAppOutlined /></div>
        <div className='TABLE_HEADER_ACTIONS'><ImportExportOutlined /></div>
        <div className='TABLE_HEADER_ACTIONS'><PrintOutlined /></div>
      </div>
        <Button sx={{ mb: 2.5 }} variant='contained' onClick={handleDialogToggle}>
          Add Role
        </Button>
      </Box>
      <Dialog fullWidth maxWidth='lg' onClose={handleDialogToggle} open={open}>
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
    </>
  )
}

export default TableHeader
