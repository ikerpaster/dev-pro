const navigation = () => {
  return [

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
          title: 'Roles',
          path: '/apps/roles'
        },
        {
          title: 'Permissions',
          path: ''
        }
      ]
    },

    {
      title: 'Property',
      icon: 'mdi:file-document-outline',
      children: [
        {
          title: 'Properties',
          path: '/apps/property/list'
        },

        {
          title: 'Property Type',
          path: '/apps/property/type'
        },
        
      ]
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
        {
          title: 'Bed Type',
          path: '/apps/rooms/bed'
        },
        {
          title: 'Room Type',
          path: '/apps/rooms/type'
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
      title: 'Host Experience',
      icon: 'mdi:file-document-outline',
      children: [
        {
          title: 'H-E List',
          path: '/apps/host_experiences',
        },
        {
          title: 'H-E Reviews',
          path: '/apps/host_experiences/reviews'
        },

        
        {
          title: 'H-E Cities',
          path: '/apps/host_experiences/cities'
        },

        {
          title: 'H-E Categories',
          path: '/apps/host_experiences/categories'
        },
        {
          title: 'H-E Provide Items',
          path: '/apps/host_experiences/items'
        },

        {
          title: 'H-E Reservations',
          path: '/apps/host_experiences/reservations'
        },

        {
          title: 'H-E Inquiries',
          path: '/apps/host_experiences/inquiries'
        },
       

        
      ]
    },

    {
      title: 'Help',
      icon: 'mdi:email-outline',
      path: ''
    },

  
 
  ]
}

export default navigation
