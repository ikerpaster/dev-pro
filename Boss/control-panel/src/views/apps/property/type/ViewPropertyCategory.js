// ** React Imports

'use client'
import { useState, forwardRef, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import ListItemText from '@mui/material/ListItemText'
import Autocomplete from '@mui/material/Autocomplete'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogContent from '@mui/material/DialogContent'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs Imports
// import themeConfig from 'src/configs/themeConfig'

// ** Hooks Imports
import { useSettings } from 'src/@core/hooks/useSettings'
import { BorderColorOutlined, DeleteOutlineOutlined, EditNoteOutlined, PeopleOutlined, Person, Remove } from '@mui/icons-material'
import useSWR from 'swr'
import AddAmenityCategory from '../../rooms/amenities/ele/AddAmenityCategory'
import DialogDeleteAmenityCategory from '../../rooms/amenities/ele/DialogDeleteAmentyCategory'
import DialogDeleteProType from './ele/DialogDeleteProType'
import AddProType from './addProTypeModel'
 
import { Grid } from '@mui/material'
import AddProTypeView from './AddProTypeView'
import DialogDeleteProCategory from './ele/DialogDeleteProCategory'
import AddProCategoryView from './AddProCategoryView'
// import AddPosition from 'src/views/apps/user/department/AddPosition'
// import DialogDeletePosition from 'src/views/apps/user/department/ele/DialogDeletePosition'
// import DialogDeleteAmenity from './DialogDeleteAmenity'
// import AddAmenityCategory from './AddAmenityCategory'
// import DialogDeleteAmenityCategory from './DialogDeleteAmentyCategory'
// import DialogDeletePosition from './ele/DialogDeletePosition'
// import AddPosition from './AddPosition'

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


const ViewPropertyCategory = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [anchorEl, setAnchorEl] = useState(true)
 
  // ** Hooks
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // ** Var
  const { direction } = settings

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

 

  // get all positions related to the department 
    let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-category/all`; 
  const { data, isLoading, error:Error } = useSWR(
    url,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );

 
  const amenity_Text = 'Property Type';

  const [showAddPos,setAddPo] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
 const [datas,setData] = useState();
 const [purpose,setPurpose] = useState('');
 console.log("Data",datas);
  return (
    <div>
        
        <div onClick={() => setShow(true)} className='BTN'>
       Property Category 
        </div>
 
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
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            {/* <div className='bg-gray-400 w-10 h-10 text-4xl mx-auto text-white'>

            <Person className='w-full h-full' />
            </div> */}
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
             {/* {depName} */} Property Category
            </Typography>
            <Typography variant='body2'> 
            {/* {depDesc} Add - Edit - Delete - View */}
            <hr />
            </Typography>
          </Box>
        
        
<div className='flex w-full justify-end py-3'>
           <Typography  className='bg-violet-300  p-2 rounded-lg cursor-pointer'><span className='text-white' onClick={()=>{setShowEdit(false);setAddPo(true);setPurpose('add')}}>Add Property Category </span></Typography>

</div>
     
          {/* </InputLabel> */}
       
          <div className='w-full flex items-center gap-2 relative justify-between'>
<div className='flex  gap-2'>
{/* <Typography  className='bg-gray-300 p-2 rounded-lg'><span className='text-white'>{`${data?.length ==='' ? 0 : data?.length} Positions`}  </span></Typography> */}
          {/* <Typography  className='bg-gray-300  p-2 rounded-lg'><span className='text-white'>{`${data?.length ==='' ? 0 : staff} Staff On this Department`} </span></Typography> */}
         
</div>
       
         
</div>
        
         
         
          {showAddPos && (
          <div className='w-full h-fit bg-gray-300x my-1'>
<AddProCategoryView data='' purpose={purpose} />
          </div>
          )}
          
           {showEdit && (
          <div className='w-full h-fit bg-gray-300x my-1'>
<AddProCategoryView data={datas} purpose={purpose} />
          </div>
          )}


<div className={` bg-green-400x ${showAddPos ? '-mt-10': '-mt-1'} absolutex`} >


          <List dense sx={{ py: 4 }} className='' >
            {data?.map((member,index) => {
              return (
                <ListItem
                  key={index}
                  sx={{
                    p: 0,
                    display: 'flex',
                    flexWrap: 'wrap',
                    '.MuiListItem-container:not(:last-child) &': { mb: 4 }
                  }}
                >
               
                  <ListItemAvatar>
                    <Avatar src={`/images/avatars/${member.avatar}`} alt={member.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.name}
                    secondary={`${member.ID}`}
                    sx={{ m: 0, '& .MuiListItemText-primary, & .MuiListItemText-secondary': { lineHeight: '1.25rem' } }}
                  />

                   

                  <ListItemSecondaryAction sx={{ right: 0 }}>
                      <div className="relativex flex items-center gap-2">
                        <span
                          className='bg-green-800 text-white  hover:bg-lime-950 ACTION_BUTTON'
                          title='Edit Position'
                          onClick={()=>{setAddPo(false);setShowEdit(true); setData(member);setPurpose('edit')}}
                        >
                        <BorderColorOutlined />
                        </span>
                        <span
                          
                          className=''
                        title='Delete Property Type'
                        >
                        {/* <DeleteOutlineOutlined />  {member._id}  */}
                        {/* <DialogDeletePosition  /> */}
                        <DialogDeleteProCategory id={member._id}/> 
                        
                        </span>
                     
                      </div>
                  </ListItemSecondaryAction>

                
                </ListItem>
              )
            })}
          </List>
</div>
      
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ViewPropertyCategory
