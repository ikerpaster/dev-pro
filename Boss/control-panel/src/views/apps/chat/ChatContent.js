// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Badge from '@mui/material/Badge'
import MuiAvatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Import
import ChatLog from './ChatLog'
import SendMsgForm from 'src/views/apps/chat/SendMsgForm'
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import UserProfileRight from 'src/views/apps/chat/UserProfileRight'
import { InputAdornment, TextField } from '@mui/material'
import { Close } from '@mui/icons-material'
import UploadFiles from './UploadFiles'

// ** Styled Components
const ChatWrapperStartChat = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  borderRadius: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.action.hover
}))

const ChatContent = props => {
  // ** Props
  const {
    store,
    hidden,
    sendMsg,
    mdAbove,
    dispatch,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleLeftSidebarToggle,
    handleUserProfileRightSidebarToggle
  } = props
  const [query, setQuery] = useState('');
  const [showSearch,setSHowSearch] = useState(false);
  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle()
    }
  }


  // START NEW FEATURES 
  const [formData, setFormData] = useState({
    documentIDsE: [],
  });
  const [chatBoardReceivedFile,setChatBoardReceivedFile] = useState(false);
  const handleChatBoard = (event) => {
    // alert("received!");
    event.preventDefault();
    setChatBoardReceivedFile(true);
  };

  const closeUploadBoard = () => {
    setChatBoardIsClicked(false);
  };
  const handleDragLeave = () => {
    setChatBoardReceivedFile(false);
  };

  const handleFileDrop = (event, type) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
  
    if (type === 'documentIDsE') {
      setFormData({ ...formData, documentIDsE: [...formData.documentIDsE, ...files] });
    }
  };

  const handleScreenClick = () => {
    // alert('Screen Clicked!');
  };
  // ENDING THE NEW FEATURES 


  const Modal = ({ closeModal }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>This is the modal content!</p>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      </div>
    );
  };



  // new data 
  const  chats = [
    {
      id: 1,
      userId: 1,
      unseenMsgs: 1,
      chat: [
        {
          message: "Turabamenyesha iki? Dufite hano kubakurikira!",
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Muraho John, ndashaka admin ikomeye. Wibagirire kubisobanura kubyo byawe?',
          time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
      ]
    },
    
    {
      id: 2,
      userId: 2,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Salut',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Bonjour. Comment puis-je vous aider ?',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Puis-je obtenir les détails de ma dernière transaction que j\'ai effectuée le mois dernier ? 🤔',
          time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Nous devons vérifier si nous pouvons vous fournir de telles informations.',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Je vous informerai dès que j\'aurai une mise à jour à ce sujet.',
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 2,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Si cela prend du temps, vous pouvez m\'envoyer un e-mail à mon adresse e-mail.',
          time: "2.3.2020",
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: false,
            isSeen: false
          }
        }
      ]
    }
  ];


  const MESSAGESx = [
    {
      senderId: 1,
      time: new Date(),
      message: 'Hello, how are you?',
      feedback: { isSent: true, isDelivered: true, isSeen: false }
    },
    {
      senderId: 2,
      time: new Date(),
      message: 'Hi! I\'m good, thanks.',
      feedback: { isSent: true, isDelivered: true, isSeen: true }
    },
    {
      senderId: 1,
      time: new Date(),
      message: 'That\'s great to hear!',
      feedback: { isSent: true, isDelivered: true, isSeen: true }
    },
    {
      senderId: 2,
      time: new Date(),
      message: 'How about you?',
      feedback: { isSent: true, isDelivered: true, isSeen: false }
    },
    {
      senderId: 1,
      time: new Date(),
      message: 'I\'m doing well too, thank you.',
      feedback: { isSent: true, isDelivered: false, isSeen: false }
    }
  ];
  
  
 
  const [MESSAGES,setMESSAGES] = useState([]);


  const renderContent = () => {
    if (store) {
      const selectedChat = store.selectedChat
      if (!selectedChat) {
        return (
          <ChatWrapperStartChat
            sx={{
              ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
            }}
          >
            <MuiAvatar
              sx={{
                mb: 5,
                pt: 8,
                pb: 7,
                px: 7.5,
                width: 110,
                height: 110,
                boxShadow: 3,
                '& svg': { color: 'action.active' },
                backgroundColor: 'background.paper'
              }}

              className='animate-bounce'
            >
              <Icon icon='mdi:message-outline' fontSize='3.125rem' />
            </MuiAvatar>
            <Box
              onClick={handleStartConversation}
              sx={{
                px: 6,
                py: 2.25,
                boxShadow: 3,
                borderRadius: 5,
                backgroundColor: 'background.paper',
                cursor: mdAbove ? 'default' : 'pointer'
              }}
            >
              <Typography sx={{ fontWeight: 600 }} className='animate-bounce'>Start Conversation</Typography>
            </Box>
          </ChatWrapperStartChat>
        )
      } else {
        return (
          <Box
            sx={{
              width: 0,
              flexGrow: 1,
              height: '100%',
              backgroundColor: 'action.hover'
            }}

            // className="relativex"
            onDragOver={handleChatBoard}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleFileDrop(e, 'documentIDsE')}
          >
            <Box
              sx={{
                py: 3,
                px: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {mdAbove ? null : (
                  <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                    <Icon icon='mdi:menu' />
                  </IconButton>
                )}
                <Box
                  onClick={handleUserProfileRightSidebarToggle}
                  sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <Badge
                    overlap='circular'
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    sx={{ mr: 4.5 }}
                    badgeContent={
                      <Box
                        component='span'
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          color: `${statusObj[selectedChat.contact.status]}.main`,
                          boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}`,
                          backgroundColor: `${statusObj[selectedChat.contact.status]}.main`
                        }}
                      />
                    }
                  >
                    {selectedChat.contact.avatar ? (
                      <MuiAvatar
                        src={selectedChat.contact.avatar}
                        alt={selectedChat.contact.fullName}
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <CustomAvatar
                        skin='light'
                        color={selectedChat.contact.avatarColor}
                        sx={{ width: 40, height: 40, fontSize: '1rem' }}
                      >
                        {getInitials(selectedChat.contact.fullName)}
                      </CustomAvatar>
                    )}
                  </Badge>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ color: 'text.secondary' }}>{selectedChat.contact.fullName}</Typography>
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                      {selectedChat.contact.role} 
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {mdAbove ? (
                  <Fragment>
                    <IconButton size='small' sx={{ color: 'text.secondary' }}>
                      <Icon icon='mdi:phone-outline' />
                    </IconButton>
                    <IconButton size='small' sx={{ color: 'text.secondary' }}>
                      <Icon icon='mdi:video-outline' fontSize='1.5rem' />
                    </IconButton>
                    <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={()=>setSHowSearch((prev)=>!prev)}>
                      <Icon icon='mdi:magnify' />
                    </IconButton>
                  </Fragment>
                ) : null}

                <OptionsMenu
                  menuProps={{ sx: { mt: 2 } }}
                  icon={<Icon icon='mdi:dots-vertical' fontSize='1.25rem' />}
                  iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                  options={['View Contact', 'Mute Notifications', 'Block Contact', 'Clear Chat', 'Report']}
                />
              </Box>
            </Box>
{showSearch && (
  <div className='w-full shadow-2xl bg-blue-200  rounded-lg h-fit py-3 flex justify-center transition transform ease-in-out duration-500  absolute z-50'>
<center className='flex items-center w-1/2 '> 
    <TextField
            fullWidth
            size='small'
           
            placeholder='Search for Messages...'
            sx={{ '& .MuiInputBase-root': { borderRadius: 5 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='mdi:magnify' fontSize='1.25rem' />
                </InputAdornment>
              )
            }}
          />

<div className='cursor-pointer hover:text-red-400 duration-500' title="Click to dismiss this search"  onClick={()=>setSHowSearch((prev)=>!prev)} >
         <Close  />
          </div> 


  </center>

         
           </div>
)}

 

{chatBoardReceivedFile ? (
   <div className="w-full" onClick={handleScreenClick}>
 <ChatLog hidden={hidden} data={{ ...selectedChat, userContact: store.userProfile }} />
 <SendMsgForm store={store} dispatch={dispatch} sendMsg={sendMsg} />
    <UploadFiles  formData={formData} setFormData={setFormData} setChatBoardReceivedFile={setChatBoardReceivedFile} store={store} dispatch={dispatch} sendMsg={sendMsg} />
  </div>
  ) : (
    
    <>
    

     
     {selectedChat && store.userProfile ? (
       <ChatLog hidden={hidden} data={{ ...selectedChat, userContact: store.userProfile }} />
      ) : null}
<SendMsgForm store={store} dispatch={dispatch} sendMsg={sendMsg} />

      
    </>
  )}

{/* </div> */}






 

            <UserProfileRight
              store={store}
              hidden={hidden}
              statusObj={statusObj}
              getInitials={getInitials}
              sidebarWidth={sidebarWidth}
              userProfileRightOpen={userProfileRightOpen}
              handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
            />
          </Box>
        )
      }
    } else {
      return null
    }
  }

  return renderContent()
}

export default ChatContent
