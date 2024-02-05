// ** React Imports
'use client'
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})



const AddAmenityCategory = () => {
    const [depData, setDepData] = useState({
        name: '',
        IconPos: '',
        description:''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;

        
        setDepData({ ...depData, [name]: value });
      };

      // console.log("ID",depId);
      // console.log("Name",depData.name);
      // console.log("Icon", depData.IconPos);
      const handleSubmit = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/amenities-category`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              description: depData.description,
              icon:depData.IconPos,
              name:depData.name,
            }),
          });
      
          if (res.ok) {
            alert('Amenity Category added successfully!'); // Show success alert
          } else {
            alert('Failed to add Amenity Category'); // Show error alert
          }
        } catch (error) {
          console.error('Error sending data to backend:', error);
          alert('An error occurred while sending data to the server'); // Show error alert
        }
      };
      

  return (
    <div> 
    <Box className=""
    //   sx={{
    //     position: 'relative',
    //     pb: theme => `${theme.spacing(8)} !important`,
    //     px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
    //     pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
    //   }}
    >
      {/* <IconButton
        size='small'
        onClick={() => setShow(false)}
        sx={{ position: 'absolute', right: '1rem', top: '1remx' }}
      >
        <Icon icon='mdi:close' />
      </IconButton> */}
      {/* <Box sx={{ mb: 0, textAlign: 'center' }}>
        <Typography variant='h5' sx={{ mb: 0, lineHeight: '2remx' }}>
         Add New Position
        </Typography>
        <Typography variant='body2'>Introduce a new Position with relevant details.</Typography>
      </Box> */}
     

     
        <Grid container spacing={6} className=''>
            <div className='w-full flex gap-3 items-center mt-10 px-5'>

            {/* <Typography>Add</Typography> */}
            <Grid item sm={6} xs={10}>
            <TextField
            className=''
              fullWidth
              label='Amenity Category Name'
              placeholder='Amenity Category Name'
              name='name'
              value={depData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={6} xs={10}>
            <TextField
            className=''
              fullWidth
              label='Description'
              placeholder='Description'
              name='description'
              value={depData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={4} xs={12}>
            <TextField
              fullWidth
              label='Icon'
              placeholder='Icon Url'
              name='IconPos'
              value={depData.IconPos}  
              onChange={handleChange}
            />
          </Grid>

          <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
            Save
          </Button>

            </div>
           
        </Grid>

        <Box
    //   sx={{
    //     justifyContent: 'center',
    //     px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
    //     pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
    //   }}

      className="my-10 text-center"
    >
        {/* <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
            Submit
          </Button> */}
          {/* <Button variant='outlined' color='secondary'>
            Reset
          </Button> */}
        </Box>
       
    </Box>
 
    
 </div>
  )
}

export default AddAmenityCategory