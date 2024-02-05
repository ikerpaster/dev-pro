// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Badge from '@mui/material/Badge'
import MuiAvatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import FormGroup from '@mui/material/FormGroup'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Custom Component Imports
import Sidebar from 'src/@core/components/sidebar'
import CustomAvatar from 'src/@core/components/mui/avatar'

const UserProfileRight = props => {
  const {
    store,
    hidden,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleUserProfileRightSidebarToggle
  } = props

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
    }
  }

  return (
    <Sidebar
      direction='right'
      show={userProfileRightOpen}
      backDropClick={handleUserProfileRightSidebarToggle}
      sx={{
        zIndex: 9,
        height: '100%',
        width: sidebarWidth,
        borderTopRightRadius: theme => theme.shape.borderRadius,
        borderBottomRightRadius: theme => theme.shape.borderRadius,
        '& + .MuiBackdrop-root': {
          zIndex: 8,
          borderRadius: 1
        }
      }}

     
    >
      <div  className="bg-red-500 w-full h-full">
        iker paster 
{/* Iker Paster so th siis is how am going to develope this sidebar positions  */}
      </div>
   
  
    </Sidebar>
  )
}

export default UserProfileRight
