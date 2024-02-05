// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Icon from 'src/@core/components/icon'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DialogDeleteDepartment = ({id}) => {
  // ** State
  const [open, setOpen] = useState(false)

  // ** Hooks
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // const handleDelete = () =>{

  // }



  const handleDelete = async () => {
    try {
      const idd = "6575f872f091e6f49dbb57ee";
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/admin/department/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        const errorData = await res.json(); // Parse error message from JSON response
        throw new Error(errorData.message || 'An error occurred');
      }
  
      // Note: Reading the response body only once
      const responseData = await res.json(); // Assuming the response is JSON
  
      const successMessage = responseData.message || 'Department deleted successfully';
      toast.success(successMessage);
      // setOpen(false)
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || 'An error occurred');
    }
  };
  



  return (
    <Fragment>
      <div onClick={handleClickOpen} className='flex items-center'>
      <Icon icon='mdi:delete-outline' fontSize={20} /> <span> Delete </span>
      </div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>Are You Sure You want to delete this Department?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            this is ID to delete :: {id}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogDeleteDepartment