// ** React Import
import { useRef, useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import { createTheme, responsiveFontSizes, styled, ThemeProvider } from '@mui/material/styles'

import * as mdiIcons from '@mdi/js';

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Theme Config
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import Drawer from './Drawer'
import VerticalNavItems from './VerticalNavItems'
import VerticalNavHeader from './VerticalNavHeader'

// ** Theme Options
import themeOptions from 'src/@core/theme/ThemeOptions'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { Collapse, ListItem, ListItemIcon, ListItemText } from '@mui/material'
 
import React from 'react'
import { ApiOutlined, BlurOnOutlined, ChevronRightOutlined, FiberManualRecordOutlined, KeyboardArrowDownOutlined, KeyboardDoubleArrowDownOutlined } from '@mui/icons-material';
import Link from 'next/link';

const StyledBoxForShadow = styled(Box)(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  transition: 'opacity .15s ease-in-out',
  background: `linear-gradient(${theme.palette.background.default} ${
    theme.direction === 'rtl' ? '95%' : '5%'
  },${hexToRGBA(theme.palette.background.default, 0.85)} 30%,${hexToRGBA(
    theme.palette.background.default,
    0.5
  )} 65%,${hexToRGBA(theme.palette.background.default, 0.3)} 75%,transparent)`,
  '&.scrolled': {
    opacity: 1
  }
}))

const Navigation = props => {
  // ** Props
  const { hidden, settings, afterNavMenuContent, beforeNavMenuContent, navMenuContent: userNavMenuContent } = props

  // ** States
  const [navHover, setNavHover] = useState(false)
  const [groupActive, setGroupActive] = useState([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState([])

  // ** Ref
  const shadowRef = useRef(null)

  // ** Var
  const { afterVerticalNavMenuContentPosition, beforeVerticalNavMenuContentPosition } = themeConfig

  const navMenuContentProps = {
    ...props,
    navHover,
    groupActive,
    setGroupActive,
    currentActiveGroup,
    setCurrentActiveGroup
  }

  // ** Create new theme for the navigation menu when mode is `semi-dark`
  let darkTheme = createTheme(themeOptions(settings, 'dark'))

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    darkTheme = responsiveFontSizes(darkTheme)
  }

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = ref => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect
      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect()

        return { ...original, height: Math.floor(original.height) }
      }
    }
  }

  // ** Scroll Menu
  const scrollMenu = container => {
    if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
      container = hidden ? container.target : container
      if (shadowRef && container.scrollTop > 0) {
        // @ts-ignore
        if (!shadowRef.current.classList.contains('scrolled')) {
          // @ts-ignore
          shadowRef.current.classList.add('scrolled')
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove('scrolled')
      }
    }
  }
  const ScrollWrapper = hidden ? Box : PerfectScrollbar

  const list = ["home","contact","support","email"];



  const navigation =  [
  
      {
        title: 'Dashboard',
        icon: 'mdi:email-outline',
        path: '/apps/dashboard'
      },
  
  
      {
        title: 'CMS',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: 'Home',
            path: '/apps/user/list'
          },
  
          {
            title: 'Banner',
            path: '/apps/roles'
          },
          {
            title: 'Header',
            path: ''
          },
  
          {
            title: 'Footer',
            path: ''
          }
  
        ]
      },
  
      {
        title: 'User Management',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: 'Users',
            path: '/apps/user/list'
          },
          {
            title: 'Department',
            path: '/apps/departments'
          },
          {
            title: 'Roles & Permissions',
            path: '/apps/roles'
          },
        ]
      },
  
      {
        title: 'Property',
        icon: 'mdi:file-document-outline',
        path: '/apps/property/list'
      },
  
      {
        title: 'Rooms',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: 'Rooms',
            path: '/apps/rooms/list'
          },
  
        
          
          {
            title: 'Amenities',
            path: '/apps/rooms/amenities'
          },

    
          
          
        ]
      },
  
  
      {
        title: 'Settings',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: 'Email',
            path: ''
          },
  
          {
            title: 'Currencies',
            path: ''
          },
          {
            title: 'Menu',
            path: ''
          },
         
         
          
        ]
      },
  
      {
        title: 'Sites',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: 'Mobile App',
            path: ''
          },
   
  
          {
            title: 'Cities',
            path: ''
          },
          {
            title: 'Our Communities',
            path: ''
          },
         
  
          {
            title: 'API Credentials',
            path: ''
          },
  
          {
            title: 'Join Us Links',
            path: ''
          },
          {
            title: 'Payment Gatway',
            path: ''
          },
  
          {
            title: 'FAQ',
            path: '/apps/sites/faq'
          },
         
         
          
        ]
      },
  
  
  
      {
        title: 'Reports',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: 'Deleted User',
            path: '/apps/reports/deleted-user'
          },
  
          {
            title: 'Finance',
            path: '/apps/reports/finance'
          },
          {
            title: 'Fee',
            path: '/apps/reports/fee'
          },
         
          {
            title: 'All',
            path: '/apps/reports'
          },
         
         
          
        ]
      },
  
  
      {
        title: 'Reservations',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: 'Bookings',
            path: '/apps/bookings/list'
          },
  
          {
            title: 'Reservatio Penalties',
            path: ''
          },
          {
            title: 'Disputes',
            path: ''
          },
          {
            title: 'Invoice',
            path: ''
          },
         
         
          
        ]
      },
  
      {
        title: 'Messages',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: 'Chats',
            path: '/apps/chats'
          },
  
          {
            title: 'MailBox',
            path: ''
          },
   
          
        ]
      },
  
      {
        title: 'Referrals',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: 'Coupon Code',
            path: ''
          },
  
          {
            title: 'Referral Settings',
            path: ''
          },
   
          
        ]
      },
  
      {
        title: 'Tours',
        icon: 'mdi:file-document-outline',
        children: [
          {
            title: 'Tour List',
            path: '/apps/host_experiences',
          },
          {
            title: 'Tour Reviews',
            path: '/apps/host_experiences/reviews'
          },
  
          {
            title: 'Tour Cities',
            path: '/apps/host_experiences/cities'
          },
  
      
  
          {
            title: 'Tour Reservations',
            path: '/apps/host_experiences/reservations'
          },
  
          {
            title: 'Tour Inquiries',
            path: '/apps/host_experiences/inquiries'
          },
         
  
          
        ]
      },
  
      {
        title: 'Help',
        icon: 'mdi:email-outline',
        path: ''
      },
  
    ];
  

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuClick = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

 

  return (
    <ThemeProvider theme={darkTheme}>
      <Drawer {...props} navHover={navHover} setNavHover={setNavHover}>
        <VerticalNavHeader {...props} navHover={navHover} />

        <Box
  sx={{
    overflowY: 'auto',
    height: 'calc(100vh - 4rem)',
    pl:'20px',
    backgroundColor: 'none',
    '&::-webkit-scrollbar': {
      width: '5px', // Set the width of the scrollbar
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent', // Set the track color
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'gray', // Set the thumb color
      borderRadius: '10px', // Set the border radius of the thumb
    },
  }}
>
<List component="nav">
      {navigation.map((item, index) => (
        <React.Fragment key={index}>
          {item.sectionTitle ? (
            <ListItem button disabled>
              <ListItemText primary={item.sectionTitle} />
            </ListItem>
          ) : (
            <>
              {item.children ? (
                <>
                  <ListItem button onClick={() => handleSubMenuClick(index)}>
                    <ListItemIcon>
                      {/* {getIcon(item.icon)} */}
                      <BlurOnOutlined />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    {openSubMenu === index ? <KeyboardDoubleArrowDownOutlined /> : <ChevronRightOutlined />}
                  </ListItem>
                  <Collapse in={openSubMenu === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((childItem, childIndex) => (
                         <Link href={childItem.path}   key={childIndex}>

                        <ListItem
                         button
                          sx={{ pl: 4 }}
                          >
                         <FiberManualRecordOutlined />
                          <ListItemIcon> 
                            {/* {getIcon(childItem.icon)} */}
                          </ListItemIcon>
                          <ListItemText primary={childItem.title} />
                        </ListItem>
                          </Link>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <Link href={item.path}>
                <ListItem button>
                  <ListItemIcon>
                    {/* {getIcon(item.icon)} */}
                    <BlurOnOutlined />
                  </ListItemIcon>
                  <ListItemText primary={item.title} /> 
                </ListItem>
                </Link>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </List>

        </Box>
      </Drawer>
    </ThemeProvider>
  )
}

export default Navigation
