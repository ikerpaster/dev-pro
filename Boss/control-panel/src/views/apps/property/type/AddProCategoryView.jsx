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
import useSWR from 'swr'
import AddProType from './addProTypeModel'
 

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};


const AddProCategoryView = ({data,purpose}) => {
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
    subCatego: data?.subCatego,
    proType: data.proType,
    status: false, // Default value set to false
  });

  useEffect(() => {
    // Set the initial state for invisible after the component mounts
    setInvisible(data.status ? true : false);
  }, [data.status]);

  useEffect(() => {
    setDepData({
      name: data.name,
      proType: data.proType,
      subCatego:data?.subCatego,
      status: invisible,
    });
  }, [invisible,data?.subCatego,data.status, data.name, data.proType]);


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
          const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-category`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              subCatego: depData.subCatego,
              proType: depData.proType,
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
          const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/property-category/${data._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              subCatego:depData.subCatego,
              proType: depData.proType,
              name:depData.name,
              status:invisible,
            }),
          });
      
          if (res.ok) {
            alert('Property Category Updated successfully!'); // Show success alert
          } else {
            console.log()
            alert('Failed to update Property Category'); // Show error alert
          }
        } catch (error) {
          console.error('Error sending data to backend:', error);
          alert('An error occurred while sending data to the server'); // Show error alert
        }
      };

      console.log("STATUS:: ",data.status);


        // get all positions related to the department 
    let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-type/all`; 
    const { data:dataProType, isLoading:isLoadingProType, error:ErrorProType } = useSWR(
      url,
      fetcher,
      {
        revalidateOnFocus: true, // Enable real-time revalidation
        fallback: <div>Loading...</div>,
      }
    );


      const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}


  return (

    <div> 
    <Box className="">

 

        <Grid container spacing={6} className=''>
            <div className='w-full flex gap-3 items-center mt-10 px-5'>

<Grid item sm={6} xs={10}>
<FormControl className='w-full'>
          <InputLabel id='demo-multiple-name-label'> Type Name*</InputLabel>
          <Select fullWidth
            // multiple
            label='Type Name*'
           className='relative'
            MenuProps={MenuProps}
            id='demo-multiple-name'
            labelId='demo-multiple-name-label'
            // value={basicInfo.propertyName}
            // onChange={(e) => setBasicInfo({ ...basicInfo, propertyName: e.target.value })}
            name="proType"
            value={depData.proType}
            onChange={handleChange}
          >
            <MenuItem>{depData.proType} </MenuItem>

             {dataProType?.map((e,i)=>(
            <MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>
            ))}
<div className='w-full text-center'>

{/* <button className='w-fit mx-auto bg-blue-500 py-2 text-white px-4 rounded-lg shadow-2xl text-xs my-2'>Add new </button> */}
<AddProType /> 
</div>
          </Select>
        
        </FormControl>
</Grid>
           


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
              label='Sub Category'
              placeholder='Sub Category'
              name='subCatego'
              value={depData.subCatego}
              onChange={handleChange}
            />
          </Grid>


          {/* <Grid item sm={6} xs={10}>
            <TextField
            className=''
              fullWidth
              label='Description'
              placeholder='Description'
              name='description'
              value={depData.description}
              onChange={handleChange}
            />
          </Grid> */}
 
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

export default AddProCategoryView