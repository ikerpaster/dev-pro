// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import useBgColor from 'src/@core/hooks/useBgColor'
// import UploadFilePropertyList from './UploadPropertiesFiles'

 

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const AddAmenitiesCategory = () => {
  // ** States
  // ** States
  const [show, setShow] = useState(false)
  const [addressType, setAddressType] = useState('home')

  // ** Hooks
  const bgColors = useBgColor()
  return (
    <>
    
    <Button variant='contained' onClick={() => setShow(true)}>
      Add new Amenity Category
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
         Add New Amenity Category
        </Typography>
        <Typography variant='body2'> Provide details for the new amenity category you want to add. </Typography>
      </Box>
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <TextField fullWidth   label='Category Name' placeholder='ex: Common Amenities' />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField fullWidth   label='Description' placeholder='Enter a brief description that provides additional information about the amenity category.' />
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

export default AddAmenitiesCategory
