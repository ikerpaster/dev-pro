'use client'
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

const AddPosition = ({id}) => {
  // ** States


  const [show, setShow] = useState(false)
  const [languages, setLanguages] = useState([])

  const [positionName, setPositionName] = useState(''); // Corrected variable name for better readability
  const [icon, setIcon] = useState(''); // Corrected variable name for better readability

  const handlePositionNameChange = (e) => {
    setPositionName(e.target.value);
  };

  const handleIconChange = (e) => {
    setIcon(e.target.value);
  };
  
 
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/position`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          depId:id,
          name:positionName,
          Icon:icon,
        }),
      });
  
      if (res.ok) {
        alert('Position added successfully!'); 
    //        setPropertyTypeName('');
    // setDescription('');
    // setIsActive(true);
    setShow(false)
        // toast.success("Property Type added successfully!");// Show success alert
        // setAdding((prev)=>!prev);
      } else {
        alert('Failed to add Position'); // Show error alert
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
          Add Position
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
             Add New Position {id}
            </Typography>
            <Typography variant='body2'>Introduce a new Position type with relevant details.</Typography>
          </Box>

        

     
       
        
      <div className='grid grid-cols-2x gap-2 '>
       
      

{/* <div className='w-full'>
        <FormControl className='w-full'>
        <InputLabel  className='-mt-2' >PRO Category</InputLabel>
        <Select   size='small' fullWidth label='PRO TYPE' defaultValue='' className='w-full'

        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {PRO?.map((e, i) => (
            <MenuItem key={e._id} value={e.name}>{e}</MenuItem>
            ))}

        </Select>
      </FormControl>
        </div> */}

        {/* <div className=''>
        <FormControl className='w-full'>
        <InputLabel className='-mt-2' >Listing TYpe</InputLabel>
        <Select  size='small' fullWidth label='PRO TYPE' defaultValue=''
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {PRO?.map((e, i) => (
            <MenuItem key={e._id} value={e.name}>{e}</MenuItem>
            ))}

        </Select>
      </FormControl>
        </div> */}


<TextField
        size='small'
        fullWidth
        label='Position Name'
        placeholder='Position Name'
        value={positionName}
        onChange={handlePositionNameChange}
        onKeyPress={(e) => {
          // Log the key pressed to check if all keys are being registered
          console.log('Pressed key:', e.key);
          // To prevent any interference or rejection of keys, you can return true unconditionally
          return true;
        }}
      />

      <TextField
        size='small'
        type='text'
        fullWidth
        label='ICON'
        placeholder='Villa'
        value={icon}
        onChange={handleIconChange}
      />
 
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

export default AddPosition
