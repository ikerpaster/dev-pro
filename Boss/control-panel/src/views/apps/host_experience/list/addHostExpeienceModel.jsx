// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Tab Content Imports
// import DialogTabDetails from 'src/views/pages/dialog-examples/create-app-tabs/DialogTabDetails'
// import DialogTabBilling from 'src/views/pages/dialog-examples/create-app-tabs/DialogTabBilling'
// import DialogTabDatabase from 'src/views/pages/dialog-examples/create-app-tabs/DialogTabDatabase'
// import DialogTabFramework from 'src/views/pages/dialog-examples/create-app-tabs/DialogTabFramework'
import BasicInfo from './Tabs/BasicInfo'
// import Calender from './Tabs/Calender'

// import Location from './Tabs/Location'
import Inclussion from './Tabs/Inclussion'
import Activies from './Tabs/Activies'
 
 
// import Photos from './Tabs/Photos'
import Medials from './Tabs/Medials'
import Location from './Tabs/Location'
// import { Diversity1 } from '@mui/icons-material'
// import Medials from '../../rooms/list/Tabs/Medials'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const TabLabel = props => {
  const { icon, title, subtitle, active } = props

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3.5,
            ...(active ? { color: 'common.white', backgroundColor: 'primary.main' } : { color: 'text.primary' })
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant='body2'>{title}</Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled', textTransform: 'none' }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}
const tabsArr = ['detailsTab','CalendarTab','PhotosTab', 'LocationTab','ActivitiesTab','inclussionsTab', 'preparationTab','submitTab']
// const tabsArr = ['basic_infoTab','PhotosTab','LocationTab','ActivitiesTab','inclussionsTab','preparationTab','submitTab'];

const AddHostExperienceModel = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [activeTab, setActiveTab] = useState('detailsTab')

  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings

  const [basicInfo, setBasicInfo] = useState({
    tourTitle: '',
    tagLine: '',
    category: '',
    // city: '',
    // language: '',
    time: '',
    grpSize: 0,
    pricePerGuest: 0,
    Bio: '',
    StartTime: '',
    EndTime: '',
    notes:'',
  });
  
  const [activities, setActivities] = useState({
    whatWeWillDo: '',
    alcohol: false,
    minAge: 12,
    kids: true,
    specialCertificate:'',
    aditionRequirement:'',
    preparationTime:'',
    flexible:true,
    cutoffTime:'',
    guestBring:[],
  });

  const [inclussion, setInclussion] = useState([
    {
      provideItem: '',
      itemName: '',
      additionalDetails: '',
    }
  ]);
  
 
 
  const [mediaData, setMediaData] = useState({
    VIDEO_DOC: [],
    PHOTO_DOC: [],
    videoUrl: [''],
  });

  const [locationInfo, setLocationInfo] = useState({
    city: '',
    country: '',
    addressLine1: '',
    addressLine2: '',
    cityTownDistrict: '',
    stateProvinceCountyRegion: '',
    zipPostalCode: '',
    mapAddress: {
      place: '',
      mapUrl: '',
    },
  });



  const handleClose = () => {
    setShow(false)
    setActiveTab('detailsTab')
  }
  const nextArrow = direction === 'ltr' ? 'mdi:arrow-right' : 'mdi:arrow-left'
  const previousArrow = direction === 'ltr' ? 'mdi:arrow-left' : 'mdi:arrow-right'

  const renderTabFooter = () => {
    const prevTab = tabsArr[tabsArr.indexOf(activeTab) - 1]
    const nextTab = tabsArr[tabsArr.indexOf(activeTab) + 1]

    return (
      <Box sx={{ mt: 8.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant='outlined'
          color='secondary'
          disabled={activeTab === 'detailsTab'}
          onClick={() => setActiveTab(prevTab)}
          startIcon={<Icon icon={previousArrow} />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={activeTab === 'submitTab' ? 'success' : 'primary'}
          endIcon={<Icon icon={activeTab === 'submitTab' ? 'mdi:check' : nextArrow} />}
          onClick={() => {
            if (activeTab !== 'submitTab') {
              setActiveTab(nextTab)
            } else {
              handleClose()
            }
          }}
        >
          {activeTab === 'submitTab' ? 'Submit' : 'Next'}
        </Button>
      </Box>
    )
  }

  const handleFileDrop = (event, type) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (type === 'PHOTO_DOC') {
      setMediaData({ ...mediaData, PHOTO_DOC: [...mediaData.PHOTO_DOC, ...files] });
    }

    if (type === 'VIDEO_DOC') {
      setMediaData({ ...mediaData, VIDEO_DOC: [...mediaData.VIDEO_DOC, ...files] });
    }
  };



  const handleFileChange = (event, type) => {
    const files = event.target.files;
    const updatedDocuments = [...mediaData[type]]; // Access the correct type

    const maxSizeForPhotos = 5000 * 1024; // 50KB for photos
    const maxSizeForVideos = 3000 * 1024; // 300KB for videos

    if (type === 'PHOTO_DOC') {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSizeInBytes = file.size;

        if (fileSizeInBytes <= maxSizeForPhotos) {
          updatedDocuments.push(file);
        } else {
          // Handle error or show message specific to photo size limit exceeded
          console.error(`Image size exceeded the maximum limit (${maxSizeForPhotos} bytes).`);
          handleClick();
          alert("Image size exceeded the maximum limit")
        }
      }
    }

    if (type === 'VIDEO_DOC') {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSizeInBytes = file.size;

        if (fileSizeInBytes <= maxSizeForVideos) {
          updatedDocuments.push(file);
        } else {
          // Handle error or show message specific to video size limit exceeded
          console.error(`Video size exceeded the maximum limit (${maxSizeForVideos} bytes).`);
          handleClick();
          alert("Video size exceeded the maximum limit");
          // You can add your logic here to display a message to the user
        }
      }
    }

    setMediaData({ ...mediaData, [type]: updatedDocuments });
  };


  const handleRemovePHOTO_DOC = (index) => {

    const updatedDocuments = mediaData.PHOTO_DOC.filter((_, i) => i !== index);
    setMediaData({ ...mediaData, PHOTO_DOC: updatedDocuments });

  };

  const handleRemoveVIDEO_DOC = (index) => {

    const updatedDocuments = mediaData.VIDEO_DOC.filter((_, i) => i !== index);
    setMediaData({ ...mediaData, VIDEO_DOC: updatedDocuments });

  };

  return (
   
     <>
      {/* <div className='w-full bg-violet-100  text-right px-3 py-1'> */}
      <div onClick={() => setShow(true)}>
          Add Tour
        </div>

        {/* <Button variant='contained' onClick={() => setShow(true)}>
          Add Host Experience 
        </Button>

        <Button variant='contained' onClick={() => setShow(true)}>
          Add Host Experience 
        </Button> */}
      {/* </div> */}
       
   
      <Dialog
        fullWidth
        open={show}
        scroll='body'
        maxWidth='md'
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pr: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pl: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(11)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              List Your Activity 
            </Typography>
            <Typography variant='body2'>Add Activity </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <TabContext value={activeTab}>
              <TabList
                orientation='vertical'
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                  border: 0,
                  minWidth: 200,
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTabs-flexContainer': {
                    alignItems: 'flex-start',
                    '& .MuiTab-root': {
                      width: '100%',
                      alignItems: 'flex-start'
                    }
                  }
                }}
              >
                <Tab
                  disableRipple
                  value='detailsTab'
                  label={
                    <TabLabel
                      title='Basic Info'
                      subtitle='Enter Details'
                      icon={<Icon icon='mdi:clipboard-outline' />}
                      active={activeTab === 'detailsTab'}
                    />
                  }
                />
{/*               
              <Tab
                  disableRipple
                  value='CalendarTab'
                  label={
                    <TabLabel
                      title='Calendar'
                      active={activeTab === 'CalendarTab'}
                      subtitle='Select Database'
                      icon={<Icon icon='mdi:chart-donut' />}
                    />
                  }
                /> */}

<Tab
                  disableRipple
                  value='PhotosTab'
                  label={
                    <TabLabel
                      title='Photos'
                      active={activeTab === 'PhotosTab'}
                      subtitle='Select Database'
                      icon={<Icon icon='mdi:chart-donut' />}
                    />
                  }
                />


                <Tab
                  disableRipple
                  value='LocationTab'
                  label={
                    <TabLabel
                      title='Location'
                      active={activeTab === 'LocationTab'}
                      subtitle='Location'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />

<Tab
                  disableRipple
                  value='ActivitiesTab'
                  label={
                    <TabLabel
                      title='Activities'
                      active={activeTab === 'ActivitiesTab'}
                      subtitle='Payment details'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />


<Tab
                  disableRipple
                  value='inclussionsTab'
                  label={
                    <TabLabel
                      title='inclussion'
                      active={activeTab === 'inclussionsTab'}
                      subtitle='Payment details'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />


{/* <Tab
                  disableRipple
                  value='preparationTab'
                  label={
                    <TabLabel
                      title='Preparation time'
                      active={activeTab === 'preparationTab'}
                      subtitle='Payment details'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                /> */}



                <Tab
                  disableRipple
                  value='submitTab'
                  label={
                    <TabLabel
                      title='Submit'
                      subtitle='Submit'
                      icon={<Icon icon='mdi:check' />}
                      active={activeTab === 'submitTab'}
                    />
                  }
                />
              </TabList>
              <TabPanel value='detailsTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relativex overflow-y-auto overflow-x-hidden menu'>
                <BasicInfo basicInfo={basicInfo} setBasicInfo={setBasicInfo} />
                </div>
                {renderTabFooter()}
              </TabPanel>

              <TabPanel value='PhotosTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                {/* <Photos formData={formData} setFormData={setFormData}   handleFileDrop={handleFileDrop} handleFileChange={handleFileChange} handleRemovePHOTO_DOC={handleRemovePHOTO_DOC} /> */}
                <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <Medials
                      handleFileDrop={handleFileDrop}
                      handleFileChange={handleFileChange}
                      handleRemovePHOTO_DOC={handleRemovePHOTO_DOC}
                      handleRemoveVIDEO_DOC={handleRemoveVIDEO_DOC}
                      mediaData={mediaData} setMediaData={setMediaData}
                    />
                 </div>
               {renderTabFooter()}
              </TabPanel>

             
              {/* basicInfo, setBasicInfo,activities, setActivities,inclussion, setInclussion,mediaData, setMediaData */}

              <TabPanel value='CalendarTab' sx={{ flexGrow: 1, p: '0 !important' }}>
             <div className=''>Calendar here</div>
             {/* <CalenderTab /> */}
             <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                 {renderTabFooter()}
                 </div>
              </TabPanel>
             
            

            

              <TabPanel value='LocationTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                  <Location locationInfo={locationInfo} setLocationInfo={setLocationInfo} />
                  </div>
                {renderTabFooter()}
              </TabPanel>

              

              <TabPanel value='inclussionsTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                   <Inclussion inclussion={inclussion} setInclussion={setInclussion} />
                   </div>
                {renderTabFooter()}
              </TabPanel>
 

              <TabPanel value='ActivitiesTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                  <Activies activities={activities} setActivities={setActivities} />
                  </div>
                {renderTabFooter()}
              </TabPanel>
 


              <TabPanel value='submitTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h6'>Submit All Info</Typography>
                  {/* <Typography variant='body2'>Submit to kickstart your project.</Typography> */}

                  <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                    {/* <img alt='submit-img' src={`/images/pages/create-app-dialog-illustration-${settings.mode}.png`} /> */}
                  </Box>
                </Box>
                </div>
                {renderTabFooter()}
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
      </Dialog>
   </>
  )
}

export default AddHostExperienceModel
