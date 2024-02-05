// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import Avatar from '@mui/material/Avatar'

import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'


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

const RolesCards = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const [modalOpenAdmin, setModalOpenAdmin] = useState(false);

  const openModalAdmin = () => setModalOpenAdmin(true); 

  const closeModalAdmin = () =>  setModalOpenAdmin(false);

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
  }

  const togglePermission = id => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      rolesArr.forEach(row => {
        const id = row.toLowerCase().split(' ').join('-')
        togglePermission(`${id}-read`)
        togglePermission(`${id}-write`)
        togglePermission(`${id}-create`)
      })
    }
  }
  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  const renderCards = () =>
    cardData.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='body2'>{`Total ${item.totalUsers} users`}</Typography>
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 40, height: 40, fontSize: '0.875rem' } }}>
                {item.avatars.map((img, index) => (
                  <Avatar key={index} alt={item.title} src={`/images/avatars/${img}`} />
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h6'>{item.title}</Typography>
                <Typography
                  href='/'
                  variant='body2'
                  component={Link}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                  onClick={e => {
                    e.preventDefault()
                    handleClickOpen()
                    setDialogTitle('Edit')
                  }}
                >
                  {/* Edit Role 1 */}
                </Typography>
              </Box>
              <IconButton sx={{ color: 'text.secondary' }}>
                <Icon icon='mdi:content-copy' fontSize={20} />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  return (
    <>
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
       
    
{/* model permissions here  */}

    </Grid>
    {modalOpenAdmin && <RolePOPUP isOpen={modalOpenAdmin} onClose={closeModalAdmin} />}
    </>
  )
}

export default RolesCards
