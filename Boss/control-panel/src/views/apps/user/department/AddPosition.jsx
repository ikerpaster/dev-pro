// ** React Imports
'use client'
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Fade from '@mui/material/Fade'
import { toast } from 'react-toastify'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})



const AddPosition = ({depId}) => {
    const [depData, setDepData] = useState({
        name: '',
        IconPos: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;

        
        setDepData({ ...depData, [name]: value });
      };

      console.log("ID",depId);
      console.log("Name",depData.name);
      console.log("Icon", depData.IconPos);
      const handleSubmit = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/position`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              depId: depId,
              Icon:depData.IconPos,
              name:depData.name
            }),
          });
      
          if (res.ok) {
            toast.success('Position added successfully!'); // Show success alert
          } else {
            toast.error('Failed to add position'); // Show error alert
          }
        } catch (error) {
          console.error('Error sending data to backend:', error);
          alert('An error occurred while sending data to the server'); // Show error alert
        }
      };
      

  return (
    <div> 
    <Box className=""
  
    >

        <Grid container spacing={6} className=''>
            <div className='w-full flex gap-3 items-center mt-10 px-5'>

            {/* <Typography>Add</Typography> */}
          <Grid item sm={6} xs={10}>
            <TextField
            className=''
              fullWidth
              label='New Position Name'
              placeholder='Position Name'
              name='name'
              value={depData.name}
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

      className="my-10 text-center"
    >
        </Box>
       
    </Box>
 
    
 </div>
  )
}

export default AddPosition