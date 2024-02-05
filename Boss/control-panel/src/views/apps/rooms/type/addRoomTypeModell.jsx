// ** React Imports
import { useState, forwardRef } from 'react'


import Box from '@mui/material/Box'

import Grid from '@mui/material/Grid'

import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import useBgColor from 'src/@core/hooks/useBgColor'

 

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const AddRoomType = () => {
  // ** States
  // ** States
  const [show, setShow] = useState(false)
  const [addressType, setAddressType] = useState('home')

  // ** Hooks
  const bgColors = useBgColor()
  return (
    <>
    
    <Button variant='contained' onClick={() => setShow(true)}>
      Add Room type
    </Button>
  
  <Dialog
    fullWidth
    open={show}
    maxWidth='md'
    scroll='body'
    onClose={() => setShow(false)}
    TransitionComponent={Transition}
    onBackdropClick={() => setShow(false)}
  >
    <DialogContent
      sx={{
        position: 'relative',
        pb: theme => `${theme.spacing(8)} !important`,
        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
        pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
      }}
    >
      <IconButton
        size='small'
        onClick={() => setShow(false)}
        sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
      >
        <Icon icon='mdi:close' />
      </IconButton>
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
         Add Room Type
        </Typography>
        <Typography variant='body2'>
        Fill in the details to add a new room type to your property.
          </Typography>
      </Box>
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField fullWidth   label='Room Type Name' placeholder='ex: King Bed Room' />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField fullWidth   label='Description' placeholder='Enter new room type' />
        </Grid>
    
       
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label='Active'
            sx={{
              '& .MuiFormControlLabel-label': {
                color: 'text.secondary'
              }
            }}
          />
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions
      sx={{
        justifyContent: 'center',
        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
      }}
    >
      <Button variant='contained' sx={{ mr: 2 }} onClick={() => setShow(false)}>
        Submit
      </Button>
      <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
</>
  )
}

export default AddRoomType