// ** React Imports
'use client'
import { useState, forwardRef, useContext } from 'react'

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

import useBgColor from 'src/@core/hooks/useBgColor'
import UploadFilePropertyList from './UploadPropertiesFiles'
import { CurrentUserContext } from "src/@core/context/CurrentUserContext"
import LocationsProperty from './LocationsProperty'
import upload from 'src/@core/utils/upload'
import useSWR from 'swr'
import AddProType from '../type/ele/AddPROType'
// import upload from 'src/utils/upload'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const AddProList = () => {
  // ** States
  // ** States
  const {currentUser,isAuthenticated} = useContext(CurrentUserContext)
  const [show, setShow] = useState(false)
  const [addressType, setAddressType] = useState('home')

  // ** Hooks
  const bgColors = useBgColor()

  const [proInfo, setProInfo] = useState({
    proName: '',
    proType:'',
    proCategory:'',
    Prodescription: '',
    proImages:[],
    proBuildingNumbers:0,
    proFloorNumbers:0,
    status: true, // Default value for status
  });

  const [locationInfo, setLocationInfo] = useState({
     
    country: '',
    addressLine1: '',
    addressLine2: '',
    cityTownDistrict: '',
    stateProvinceCountyRegion: '',
    zipPostalCode: '',
    mapAddress: {
      place: '',
      mapUrl: '',
    },
  });

  const handleChange = (e, field) => {
    const value = e.target.value;
    const newValue = field === 'status' ? e.target.checked : value;

    setProInfo(prevData => ({
      ...prevData,
      [field]: newValue,
    }));
  };

 
  const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
  
    if (!res.ok) {
      const error = new Error(data.message);
      throw error;
    }
    return data;
  };
  

  

  const handleSubmit = async () => {
    console.log('Form Data:', proInfo);
    const id = currentUser?._id
    const uploaded_PHOTO_DOC = [];

    // Upload photos if proImages is present in proInfo
    if (proInfo.proImages.length > 0) {
      for (const selectedFileLegalDoc of proInfo.proImages) {
        const url = await upload(selectedFileLegalDoc);
        uploaded_PHOTO_DOC.push(url);
      }
    }

    console.log("this is the data!!! :: ",uploaded_PHOTO_DOC);

    const data = {
      locationInfo,
      proInfo: {
        ...proInfo,
        proImages: uploaded_PHOTO_DOC,
      },
    };

    console.log("DATA:: ", data);
    try {
   
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/properties/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An error occurred');
      }
  
      const responseData = await res.json();
      const successMessage = responseData.message || 'Property successful'; // Access the response message
  
      toast.success(successMessage);
    } catch (error) {
      console.error('Error sending data to backend:', error);
      // setError(error.message || 'An error occurred');
      toast.error(error.message || 'An error occurred');
    }
  };
  

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

const [catechId,setCatchId]=useState();
// this property type 
let urlProType = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-type/all`;
const { data:dataProType, isLoading:isLoadingProType, error:ErrorProType } = useSWR(
  urlProType,
  fetcher,
  {
    revalidateOnFocus: true, // Enable real-time revalidation
    fallback: <div>Loading...</div>,
  }
);


// this property category 
let urlProCategory = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-category/all/${catechId}`;
const { data:dataProCategory, isLoading:isLoadingProCategory, error:ErrorProCategory } = useSWR(
  urlProCategory,
  fetcher,
  {
    revalidateOnFocus: true, // Enable real-time revalidation
    fallback: <div>Loading...</div>,
  }
);




  return (
    <Card>
 

      <Button variant='contained' onClick={() => setShow(true)}>
          Add property 
        </Button>


      <Dialog
        fullWidth
        open={show}
        maxWidth='sm'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(7)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            height: 'calc(100vh - 10rem)' 
          }}
       
        >
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 9, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Add New Property
              {/* {currentUser?._id} */}
            </Typography>
            {/* <Typography variant='body2'>Add address for billing address</Typography> */}
          </Box>

<Grid container  className='menu relative pr-2'  sx={{  height: 'calc(100vh - 22rem)', px:3 }} >


          <h2 className="text-lg font-bold mb-4 -ml-2">Property Info </h2>
          <Grid container spacing={6}  >
       
        
            <Grid item sm={6} xs={12} >
              <TextField size='small' fullWidth label='Property NAme' placeholder='FairMount Hotel' 
              value={proInfo.proName}
              onChange={e => handleChange(e, 'proName')}/>
            </Grid>
        
 
            <Grid item sm={6} xs={12}>
              <TextField size='small' fullWidth label='Property Description' placeholder='Number one Hotel in ASIA'
                value={proInfo.Prodescription}
                onChange={e => handleChange(e, 'Prodescription')}/>
                 
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField type='number' size='small' fullWidth label='Building Floor Number' placeholder='Building Floor Numbers'
                value={proInfo.proBuildingNumbers}
                onChange={e => handleChange(e, 'proBuildingNumbers')}/>
                 
            </Grid>
           

            <Grid item sm={6} xs={12}>
              <TextField type='number' size='small' fullWidth label='Property Floor Number' placeholder='Property Floor Numbers'
                value={proInfo.proFloorNumbers}
                onChange={e => handleChange(e, 'proFloorNumbers')}/>
                 
            </Grid>



            {/* <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id='country-select' sx={{mt:-2}}>Type</InputLabel>
                <Select
                size='small'
                  fullWidth
                  placeholder='UK'
                  label='Country'
                  labelId='country-select'
                  defaultValue='Select Property Type'
                //   value={proInfo.proType}
                // onChange={e => handleChange(e, 'proType')}
                >
                  <MenuItem value='Select Property TYpe'>Select Propperty TYpe</MenuItem>
                  <MenuItem value='FrVillaance'>Villa</MenuItem>
                  <MenuItem value='RuAprtmentssia'>Appartment</MenuItem>
                  <MenuItem value='Condor'>Condor</MenuItem>
                  <MenuItem value='Studio'>Studio</MenuItem>
                  <MenuItem value='House'>House</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}


<Grid item sm={6} xs={12}>

<FormControl fullWidth>
          <InputLabel id='demo-multiple-name-label' sx={{mt:-2}}>Property Type*</InputLabel>
          <Select
            // multiple
            size='small'
            label='Property Type*'
            className='relative'
            MenuProps={MenuProps}
            id='demo-multiple-name'
            labelId='demo-multiple-name-label'
              value={proInfo.proType}
                onChange={e => handleChange(e, 'proType')}
          >
             {dataProType?.map((e,i)=>(
            <MenuItem key={e._id} value={e._id} onClick={()=>setCatchId(e._id)}>{e.name}</MenuItem>
            ))}
<div className='w-full text-center'>

{/* <button className='w-fit mx-auto bg-blue-500 py-2 text-white px-4 rounded-lg shadow-2xl text-xs my-2'>Add new </button> */}
{/* <AddProType />  */}
<AddProType /> 
</div>
          </Select>
        
        </FormControl>
</Grid>
         



<Grid item sm={6} xs={12}>
<FormControl fullWidth>
          <InputLabel id='demo-multiple-name-label' sx={{mt:-2}}>Property Category*</InputLabel>
          <Select
            // multiple
            size='small'
            label='Property Category*'
           className='relative'
            MenuProps={MenuProps}
            id='demo-multiple-name'
            labelId='demo-multiple-name-label'
              value={proInfo.proCategory}
                onChange={e => handleChange(e, 'proCategory')}
          >
             {dataProCategory?.map((e,i)=>(
            <MenuItem key={e._id} value={e._id}>{e.name}</MenuItem>
            ))}
<div className='w-full text-center'>

{/* <button className='w-fit mx-auto bg-blue-500 py-2 text-white px-4 rounded-lg shadow-2xl text-xs my-2'>Add new </button> */}

{/* <AddProType />  */}
</div>
          </Select>
        
        </FormControl>

</Grid>
       


        
            {/* <FormControl className='flex flex-1 my-3'>
        <InputLabel >Property Type</InputLabel>
        <Select  label='Room Type' defaultValue=''
        value={proInfo.proType}
        onChange={e => handleChange(e, 'proType')}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
       

          {data_roomType?.map((e,i)=>(
            <MenuItem key={e._id} value={e.name}>{e.name}</MenuItem>
            ))}

        </Select>
      </FormControl> */}
           


           <LocationsProperty locationInfo={locationInfo} setLocationInfo={setLocationInfo} />
          
            <UploadFilePropertyList proInfo={proInfo} setProInfo={setProInfo} />


            <Grid item xs={12}>
            <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >


          <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
              Submit
            </Button>
          <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Cancel
          </Button>
        </DialogActions>
            </Grid>
          </Grid>
          </Grid>

        </DialogContent>
      
      </Dialog>
    </Card>
  )
}

export default AddProList
