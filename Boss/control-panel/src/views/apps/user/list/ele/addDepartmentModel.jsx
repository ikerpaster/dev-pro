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

const AddDepartmentModel = () => {
  // ** States


  const [show, setShow] = useState(false)
  const [languages, setLanguages] = useState([])


  const [depName, setDepNAme] = useState('');
  const [icon, setIcon] = useState(''); 
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true); // Setting initial state as active

  // const handlePropertyTypeNameChange = (event) => {
  //   setDepNAme(event.target.value);
  // };

  // const handleDescriptionChange = (event) => {
  //   setDescription(event.target.value);
  // };

  // const handleActiveChange = (event) => {
  //   setIsActive(event.target.checked);
  // };



  // const handleSubmit = () => {
    // Do something with the captured information
    // console.log('Property Type Name:', depName);
    // console.log('Description:', description);
    // console.log('Active:', isActive);

    // Optionally, you can reset the form fields after submission
    // alert("ok")
    // setDepNAme('');
    // setDescription('');
    // setIsActive(true);
  // };
  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/department`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
          name:depName,
          Icon:icon,
          description:description,
          status:isActive,
        }),
      });
  
      if (res.ok) {
        alert('Department added successfully!'); 
           setDepNAme('');
    setDescription('');
    setIsActive(true);
    setShow(false)
        // toast.success("Property Type added successfully!");// Show success alert
        // setAdding((prev)=>!prev);
      } else {
        alert('Failed to add  Department'); // Show error alert
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
          Add Department
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
             Add New Department
            </Typography>
            <Typography variant='body2'>Introduce a new property type with relevant details.</Typography>
          </Box>

        

     
       
        
      <div className='grid grid-cols-2x gap-2 '>
       

 
 


        <TextField
        size='small'
          fullWidth
          label='Department Name'
          placeholder='Department Name'
          value={depName}
          name="depName"
          onChange={(e)=>setDepNAme(e.target.value)}
        />

<TextField
        size='small'
        type='text'
        fullWidth
        label='ICON'
        placeholder='ICON'
        value={icon}
        name='icon'
        onChange={(e)=>setIcon(e.target.value)}
      />


<TextField  size='small'
        type='text'
          fullWidth
          label='Description'
          placeholder='Description'
          value={description}
          name='descriptiom'
          onChange={(e)=>setDescription(e.target.value)}
        />
          



{/* <div className='w-full'>
        <FormControl className='w-full'>
        <InputLabel  className='-mt-2' >PRO Category</InputLabel>
        <Select   size='small' fullWidth label='PRO TYPE' defaultValue='' className='w-full'
        // value={descriptionInfo.language}
        // onChange={(e) => setDescriptionInfo({ ...descriptionInfo, language: e.target.value })}
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

export default AddDepartmentModel
