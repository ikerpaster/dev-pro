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
 
import DialogDeleteRoomType from '../type/ele/DialogDeleteROomType'
import AddRoomTypeView from './AddRoomTypeView'
import AddRoomCategoryView from './AddRoomCategoryView'
 
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


const ViewRoomCategory = () => {
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
    let url = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/room-category/all`; 
  const { data, isLoading, error:Error } = useSWR(
    url,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );

 
  const amenity_Text = 'Room Type';

  const [showAddPos,setAddPo] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
 const [datas,setData] = useState();
 const [purpose,setPurpose] = useState('');
 console.log("Data",datas);
  return (
    <div>
        
        <div onClick={() => setShow(true)} className='BTN'>
       Room Category 
        </div>
 
      <Dialog
        fullWidth
        open={show}
        maxWidth='sm'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
        className='h-[calc(100vh-10rem)]'
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
          <Box sx={{ mb: 4, textAlign: 'center' }} className="flex justify-between items-center">
     
          <Typography variant='' className='w-fit whitespace-nowrap font-bold text-xl'>
             {/* {depName} */} Room Category
            </Typography>

            <div className='flex w-full justify-end py-3'>
           <Typography  className='bg-violet-300  p-2 rounded-lg cursor-pointer'><span className='text-white' onClick={()=>{setShowEdit(false);setAddPo(true);setPurpose('add')}}>Add Room Category </span></Typography>

</div>
          </Box>
          <Typography variant='body2'> 
            <hr />
            </Typography>
        

     
          {/* </InputLabel> */}
       
          <div className='w-full flex items-center gap-2 relative justify-between'>
<div className='flex  gap-2'>
{/* <Typography  className='bg-gray-300 p-2 rounded-lg'><span className='text-white'>{`${data?.length ==='' ? 0 : data?.length} Positions`}  </span></Typography> */}
          {/* <Typography  className='bg-gray-300  p-2 rounded-lg'><span className='text-white'>{`${data?.length ==='' ? 0 : staff} Staff On this Department`} </span></Typography> */}
         
</div>
       
         
          </div>
        
         
         
          {showAddPos && (
          <div className='w-full h-fit bg-gray-300x my-1'>
<AddRoomCategoryView data='' purpose={purpose} />
          </div>
          )}
          
           {showEdit && (
          <div className='w-full h-fit bg-gray-300x my-1'>
<AddRoomCategoryView data={datas} purpose={purpose} />
          </div>
          )}


<div className={` bg-green-400x ${showAddPos ? '-mt-10': '-mt-1'} absolutex h-[calc(100vh-29rem)] menu pr-10 mt-5`} >


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
                        <BorderColorOutlined /> x   
                        </span>
                        <span
                          
                          className=''
                        title='Delete Property Type'
                        >
                        {/* <DeleteOutlineOutlined />  {member._id}  */}
                        {/* <DialogDeletePosition  /> */}
                        <DialogDeleteRoomType id={member._id}/> 
                        
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

export default ViewRoomCategory





