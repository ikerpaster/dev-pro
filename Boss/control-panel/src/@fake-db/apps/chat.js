// ** Mock Adapter
import mock from 'src/@fake-db/mock'

const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
const dayBeforePreviousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2)

const data = {
  profileUser: {
    id: 11,
    avatar: '/images/avatars/1.png',
    fullName: 'John Doe',
    role: 'admin',
    about:
      'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
    status: 'online',
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false
    }
  },
  contacts: [
    {
      id: 1,
      fullName: 'Iker Paster ',
      role: 'Web Developer',
      about: ' web developer about me text me',
      avatar: '/images/avatars/2.png',
      status: 'offline'
    },
    {
      id: 2,
      fullName: 'Izere Ignace',
      role: 'Mobile App Designer',
      avatarColor: 'primary',
      about:
        'web developer about me text me',
      status: 'busy'
    },
    {
      id: 3,
      fullName: 'Joaquina Weisenborn',
      role: 'Town planner',
      about:
        'web developer about me text me',
      avatar: '/images/avatars/8.png',
      status: 'busy'
    },
    {
      id: 4,
      fullName: 'Verla Morgano',
      role: 'Data scientist',
      about:
        'web developer about me text me',
      avatar: '/images/avatars/3.png',
      status: 'online'
    },
    {
      id: 5,
      fullName: 'Margot Henschke',
      role: 'Dietitian',
      avatarColor: 'success',
      about: 'web developer about me text me',
      status: 'busy'
    },
    {
      id: 6,
      fullName: 'Sal Piggee',
      role: 'Marketing executive',
      about:
        'web developer about me text me',
      avatar: '/images/avatars/5.png',
      status: 'online'
    },
    {
      id: 7,
      fullName: 'Miguel Guelff',
      role: 'Special educational needs teacher',
      about:
        'web developer about me text me.',
      avatar: '/images/avatars/7.png',
      status: 'online'
    },
    {
      id: 8,
      fullName: 'Mauro Elenbaas',
      role: 'Advertising copywriter',
      about:
        'web developer about me text me.',
      avatar: '/images/avatars/6.png',
      status: 'away'
    },
    {
      id: 9,
      avatarColor: 'warning',
      fullName: 'Bridgett Omohundro',
      role: 'Designer, television/film set',
      about:
        'web developer about me text me',
      status: 'offline'
    },
     
  ],

  calls: [
    {
      id: 1,
      fullName: 'Iker call',
      role: 'Web Developer',
      about: ' web developer about me text me',
      avatar: '/images/avatars/2.png',
      status: 'offline'
    },
    {
      id: 2,
      fullName: 'Izere Ignace',
      role: 'Mobile App Designer',
      avatarColor: 'primary',
      about:
        'web developer about me text me',
      status: 'busy'
    },
    {
      id: 3,
      fullName: 'Keza Bebe',
      role: 'Town planner',
      about:
        'web developer about me text me',
      avatar: '/images/avatars/8.png',
      status: 'busy'
    },
    {
      id: 4,
      fullName: 'Gisa Emmy',
      role: 'Data scientist',
      about:
        'web developer about me text me',
      avatar: '/images/avatars/3.png',
      status: 'online'
    },
 
     
  ],

  chats: [
    {
      id: 1,
      userId: 1,
      unseenMsgs: 1,
      chat: [
        {
          messageType:"text",
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
          messageType:"text",
          message: 'Muraho John, ndashaka admin template ikomeye. Wibagirire kubisobanura kubyo byawe?',
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
          messageType:"text",
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
          messageType:"file",
          message: 'Je vous informerai dès que j\'aurai une mise à jour à ce sujet.',
          fileMessage:[{
            url:"url.jpg",
            caption:" this is the image baba",
          }],
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 2,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },

        {
          messageType:"file",
          message: 'ndabakumbuye cyane mwabantumwe.',
          fileMessage:[{
            url:"http://localhost:3000/images/chats/m1.png",
            caption:" this  xxx is the second caption",
          }],
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 3,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },

        {
          messageType:"file",
          message: 'ndabakumbuye cyane mwabantumwe.',
          fileMessage:[{
            url:"http://localhost:3000/images/chats/m2.jpeg",
            caption:" this is the second caption",
          }],
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },

        {
          messageType:"file",
          message: 'ndabakumbuye cyane mwabantumwe.',
          fileMessage:[{
            url:"http://localhost:3000/images/chats/m3.jpeg",
            caption:" this cccc is the second caption",
          }],
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },

        {
          messageType:"text",
          message: 'ndabakumbuye cyane mwabantumwe.',
          fileMessage:[{
            url:"",
            caption:"",
          }],
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },

        {
          messageType:"text",
          message: 'this is the last test messages.',
          fileMessage:[{
            url:"",
            caption:"",
          }],
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },

        {
          messageType:"text",
          message: 'this is the last test messages.',
          fileMessage:[{
            url:"",
            caption:"",
          }],
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        }



        
      ]
    }
    
  ]
}

const reorderChats = (arr, from, to) => {
  const item = arr.splice(from, 1)

  // ** Move the item to its new position
  arr.splice(to, 0, item[0])
}

// ------------------------------------------------
// GET: Return Chats Contacts and Contacts
// ------------------------------------------------
mock.onGet('/apps/chat/chats-and-contacts').reply(() => {
  const chatsContacts = data.chats.map(chat => {
    const contact = data.contacts.find(c => c.id === chat.userId)

    // @ts-ignore
    contact.chat = { id: chat.id, unseenMsgs: chat.unseenMsgs, lastMessage: chat.chat[chat.chat.length - 1] }

    return contact
  })

  const contactsToShow = data.contacts.filter(co => {
    return !data.chats.some(ch => {
      return co.id === ch.id
    })
  })

  const profileUserData = {
    id: data.profileUser.id,
    avatar: data.profileUser.avatar,
    fullName: data.profileUser.fullName,
    status: data.profileUser.status
  }

  return [200, { chatsContacts, contacts: contactsToShow, profileUser: profileUserData }]
})

// ------------------------------------------------
// GET: Return User Profile
// ------------------------------------------------
mock.onGet('/apps/chat/users/profile-user').reply(() => [200, data.profileUser])

// ------------------------------------------------
// GET: Return Single Chat
// ------------------------------------------------
mock.onGet('/apps/chat/get-chat').reply(config => {
  // Get event id from URL
  let userId = config.params.id

  //  Convert Id to number
  userId = Number(userId)
  const chat = data.chats.find(c => c.id === userId)
  if (chat) chat.unseenMsgs = 0
  const contact = data.contacts.find(c => c.id === userId)

  // @ts-ignore
  if (contact.chat) contact.chat.unseenMsgs = 0

  return [200, { chat, contact }]
})

// ------------------------------------------------
// POST: Add new chat message
// ------------------------------------------------
mock.onPost('/apps/chat/send-msg').reply(config => {
  // Get event from post data
  const { obj } = JSON.parse(config.data).data
  let activeChat = data.chats.find(chat => chat.id === obj.contact.id)

  const newMessageData = {
    senderId: 11,
    time: new Date(),
    message: obj.message,
    messageType: obj.type,
    fileMessage: obj.fileMessage,

    feedback: {
      isSent: true,
      isSeen: false,
      isDelivered: false
    }
  }

  // If there's new chat for user create one
  let isNewChat = false
  if (activeChat === undefined) {
    isNewChat = true
    data.chats.push({
      id: obj.contact.id,
      userId: obj.contact.id,
      unseenMsgs: 0,
      chat: [newMessageData]
    })
    activeChat = data.chats[data.chats.length - 1]
  } else {
    activeChat.chat.push(newMessageData)
  }
  const response = { newMessageData, id: obj.contact.id }

  // @ts-ignore
  if (isNewChat) response.chat = activeChat
  reorderChats(
    data.chats,
    data.chats.findIndex(i => i.id === response.id),
    0
  )

  return [201, { response }]
})