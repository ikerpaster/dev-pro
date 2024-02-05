// ** React Imports
'use client'
import { useState, forwardRef, useEffect } from 'react'

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
import { Badge } from '@mui/material'
 

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})



const AddProTypeView = ({data,purpose}) => {
  const [count, setCount] = useState(1)
  const [invisible, setInvisible] = useState(data.status);
  const [isActive, setIsActive] = useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
    setDepData((prevDepData) => ({
      ...prevDepData,
      status: !invisible,
    }));
  };

  const [depData, setDepData] = useState({
    name: data.name,
    description: data.description,
    status: false, // Default value set to false
  });

  useEffect(() => {
    // Set the initial state for invisible after the component mounts
    setInvisible(data.status ? true : false);
  }, [data.status]);

  useEffect(() => {
    setDepData({
      name: data.name,
      description: data.description,
      status: invisible,
    });
  }, [invisible,data.status, data.name, data.description]);


      const handleChange = (e) => {
        const { name, value } = e.target;
        setDepData({ ...depData, [name]: value });
      };

      if(purpose ==='edit'){
        console.log("EDIT:: ",data);
// alert("edit");
      }

      if(purpose === 'add'){
        console.log("Add::")
        // alert("add")
      }
      
      // console.log("ID",depId);
      // console.log("Name",depData.name);
      // console.log("Icon", depData.IconPos);
      const handleSubmit = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-type`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              description: depData.description,
              name:depData.name,
              status:isActive,
            }),
          });
      
          if (res.ok) {
            alert('Property Type added successfully!'); // Show success alert
          } else {
            alert('Failed to add Property Type'); // Show error alert
          }
        } catch (error) {
          console.error('Error sending data to backend:', error);
          alert('An error occurred while sending data to the server'); // Show error alert
        }
      };
      
      const handleEdit = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/property-type/${data._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              description: depData.description,
              name:depData.name,
              status:invisible,
            }),
          });
      
          if (res.ok) {
            alert('Property Type Updated successfully!'); // Show success alert
          } else {
            alert('Failed to add Property Type'); // Show error alert
          }
        } catch (error) {
          console.error('Error sending data to backend:', error);
          alert('An error occurred while sending data to the server'); // Show error alert
        }
      };

      console.log("STATUS:: ",data.status);
  return (

    <div> 
    <Box className="">
      
        <Grid container spacing={6} className=''>
            <div className='w-full flex gap-3 items-center mt-10 px-5'>

            {/* <Typography>Add</Typography> */}
            <Grid item sm={6} xs={10}>
            <TextField
            className=''
              fullWidth
              label='Type Name'
              placeholder='Type Name'
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
 
            <Grid className='demo-space-x'>
 
        <FormControlLabel
          label=''
          control={purpose ==='edit' ? <Switch color='primary' checked={invisible}   onChange={handleBadgeVisibility} /> :  <Switch color='primary' checked={isActive}   onChange={()=>setIsActive((prev=>!prev))} /> }
        /> 
      </Grid>

          <Button variant='contained' sx={{ mr: 2 }} onClick={purpose ==='edit' ? handleEdit : handleSubmit}>
          {purpose ==='edit' ? 'Update':'Save'} 
          </Button>

            </div>
           
        </Grid>

        <Box className="my-10 text-center" >
 
        </Box>
       
    </Box>
 
    
 </div>
  )
}

export default AddProTypeView