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

const AddRole = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    roleName: '',
    description: '',
    status: true, // Default value for status
  });


  // const handleChange = (e, field) => {
  //   const value = e.target.value;
    
  //   setFormData(prevData => ({
  //     ...prevData,
  //     [field]: value,
  //   }));
  // };

  const handleChange = (e, field) => {
    const value = e.target.value;

    // Handling switch component's value change
    const newValue = field === 'status' ? e.target.checked : value;

    setFormData(prevData => ({
      ...prevData,
      [field]: newValue,
    }));
  };


  const { roleName, description,status } = formData;

  // const handleSubmit = () => {
  //   console.log('Form Data:', formData);
  //   // You can perform other actions here with formData
  // };


  const handleSubmit = async () => {
    console.log('Form Data:', formData);
    try {
   
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:formData.roleName,
          description:formData.description,
          status:formData.status
        }),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Parse error message from JSON response
        throw new Error(errorData.message || 'An error occurred');
      }

      const responseData = await res.json(); // Assuming the response is JSON
      const successMessage = responseData.message || 'role successful';

      toast.success(successMessage);
    } catch (error) {
      console.error('Error sending data to backend:', error);
      // setError(error.message || 'An error occurred');
      toast.error(error.message || 'An error occurred');
    }
  };
  

  

  return (
    <>
    
        <Button variant='contained' onClick={() => setShow(true)}>
          Add new Role
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
             Add New ROle
            </Typography>
            <Typography variant='body2'>Introduce a new Role type with relevant details.</Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth   label='Role Name' placeholder='Role NAme' 
              value={roleName}
              onChange={(e) => handleChange(e, 'roleName')}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth   label='Description' 
               placeholder='this is the property based on Italy'
               value={description}
               onChange={(e) => handleChange(e, 'description')}
                />
            </Grid>
        
            <Grid item xs={12}>
          <FormControlLabel
            control={<Switch checked={status} onChange={(e) => handleChange(e, 'status')} />}
            label='Active'
            sx={{
              '& .MuiFormControlLabel-label': {
                color: 'text.secondary'
              }
            }}
          />
        </Grid>

            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label='Active'
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color: 'text.secondary'
                  }
                }}
              />
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit} >
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

export default AddRole
