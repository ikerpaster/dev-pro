// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import RolePOPUP from './role_POPUP'

const cardData = [
  { totalUsers: 4, title: 'Cutomers', avatars: ['3.png', '3.png', '3.png', '3.png'] },
  { totalUsers: 7, title: 'Host', avatars: ['3.png', '3.png', '3.png', '3.png', '3.png', '3.png', '3.png'] },
  { totalUsers: 5, title: 'Admins', avatars: ['3.png', '3.png', '3.png', '3.png', '3.png'] },

]

const rolesArr = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll'
]

const ROleBtn = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const [modalOpenAdmin, setModalOpenAdmin] = useState(false);

  const openModalAdmin = () => setModalOpenAdmin(true); 

  const closeModalAdmin = () =>  setModalOpenAdmin(false);
 

  return (
    <>
    <Grid container spacing={6} className='match-height'>
     
      
       
        
                  <Button
                    variant='contained'
                    sx={{ mb: 2.5, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      openModalAdmin()
                     
                    }}
                  >
                    Add Role
                  </Button>
             
     

    </Grid>
    {modalOpenAdmin && <RolePOPUP isOpen={modalOpenAdmin} onClose={closeModalAdmin} />}
    </>
  )
}

export default ROleBtn
