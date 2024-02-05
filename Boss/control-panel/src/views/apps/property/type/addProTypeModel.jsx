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

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const AddProType = () => {
  // ** States

  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
 
 
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-type`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:name,
          description:description,
          status:isActive,
        }),
      });
  
      if (res.ok) {
        alert('Property Type added successfully!'); 
 
    setShow(false)

      } else {
        alert('Failed to add property Type'); // Show error alert
        // toast.error('Failed to add Property Type');
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
      alert('An error occurred while sending data to the server'); // Show error alert
    }
  };

 
  return (
    <>
    
        <div onClick={() => setShow(true)}>
          Add property Type
        </div>
      
      <Dialog
        fullWidth
        open={show}
        maxWidth='xs'
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
             Add New Property Type
            </Typography>
            <Typography variant='body2'>Introduce a new property type with relevant details.</Typography>
          </Box>
        
      <div className='grid grid-cols-2x gap-2 '>
       
      <TextField
        size='small'
          fullWidth
          label='Property Type Name'
          placeholder='Property Type Name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />


<TextField
        size='small'
          fullWidth
          label='Description'
          placeholder='Description'
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

   
    
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={(e)=>setIsActive(e.target.checked)}
            />
          }
          label='Active'
        />
      </Grid>

          </div>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' onClick={handleSubmit}>
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

export default AddProType
