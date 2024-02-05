'use client'
// ** React Imports

import { useState, forwardRef, useEffect } from 'react'

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
 
import BasicInfo from './Tabs/BasicInfo'
import Descriptions from './Tabs/Descriptions'
import Location from './Tabs/Location'
import Photos from './Tabs/Photos'
import Amenities from './Tabs/Amenities'
import Video from './Tabs/Video'
import AvailableRUles from './Tabs/AvailableRUles'
// import Booking from './Tabs/Booking'
// import Terms from './Tabs/Terms'
import Medials from './Tabs/Medials'
import useSWR from 'swr'
import Submit from './Tabs/Submit'
import CheckinProcedure from './Tabs/CheckProcedure'
import toast from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'

 
// import Submit from './Tabs/Submit'

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

const tabsArr = [
  'BasicInfoTab',
  'LocationInfoTab',
  'AmenitiesTab',
  'PHOTOSTab', 
 'AvailableRuleTab',
 'CheckiQuideTab',
  'submitTab'
]


const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};



const AddRoomsModel = ({purpose,data}) => {
  // ** States
  const [show, setShow] = useState(false)
  const [activeTab, setActiveTab] = useState('BasicInfoTab')

  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings

 
  console.log("DATA To EDIT RECEIVEd::1 ",data);
  console.log("PURPOSE RECEIVED",purpose);

  // NEW VISITOR 
  
 
  
  // fetch property  
  let urlRoomCategory = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/room-category/all`;
  const { data:dataRoomCategory, isLoading:isLoadingRoomCAtegory, error:ErrorRoomCategory } = useSWR(
    urlRoomCategory,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );
//  console.log("Property Name:: ",dataProperty);


   // fetch property Type 
   let urlProType = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-type/all`;
   const { data:dataProType, isLoading:isLoadingProType, error:ErrorProType } = useSWR(
     urlProType,
     fetcher,
     {
       revalidateOnFocus: true, // Enable real-time revalidation
       fallback: <div>Loading...</div>,
     }
   );
  // console.log("Property Type:: ",dataProType);



   // fetch BED Type 
   let urlBedType = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/bed-type/all`;
   const { data:dataBed, isLoading:isLoadingBedType, error:ErrorBedType } = useSWR(
    urlBedType,
     fetcher,
     {
       revalidateOnFocus: true, // Enable real-time revalidation
       fallback: <div>Loading...</div>,
     }
   );
  // console.log("BED Type:: ",dataBed);


     // fetch Amenity 
     let urlAmenity = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/amenities-category/all`;
     const { data:dataAmenity, isLoading:isLoadingAmenity, error:ErrorAmenity } = useSWR(
      urlAmenity,
       fetcher,
       {
         revalidateOnFocus: true, // Enable real-time revalidation
         fallback: <div>Loading...</div>,
       }
     );
    // console.log("Amenity:: ",dataAmenity);

         // fetch ROom Type 
         let urlRoomType = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/room-type/all`;
         const { data:dataRoomType, isLoading:isLoadingRoomType, error:ErrorRoomType } = useSWR(
          urlRoomType,
           fetcher,
           {
             revalidateOnFocus: true, // Enable real-time revalidation
             fallback: <div>Loading...</div>,
           }
         );
        // console.log("Room Type:: ",dataRoomType);

  
const [bedsQuantity, setBedsQuantity] = useState(1);
const [bedsList, setBedsList] = useState([]); // Move bedsList state to the top-level component


const [amenitiesInfo, setAmenitiesInfo] = useState({});

// works but mistaken 
// const [amenitiesInfo, setAmenitiesInfo] = useState(() => {
//   const initialAmenities = {};
//   dataAmenity?.forEach((categoryData) => {
//     const category = categoryData?.name;
//     const existingAmenities = data?.amenitiesInfo?.amenities?.[category] || [];
//     initialAmenities[category] = {};
//     categoryData?.amenities?.forEach((amenity) => {
//       initialAmenities[category][amenity?.name] = existingAmenities.includes(amenity?.name);
//     });
//   });
//   return initialAmenities;
// });


// const [amenitiesInfo, setAmenitiesInfo] = useState(() => {
//   const initialAmenities = {};
//   dataAmenity?.forEach((categoryData) => {
//     const category = categoryData?.name;
//     const existingAmenities = data?.amenitiesInfo?.amenities?.[category] || {};
//     initialAmenities[category] = {};
//     categoryData?.amenities?.forEach((amenity) => {
//       initialAmenities[category][amenity?.name] = existingAmenities[amenity?.name] || false;
//     });
//   });
//   return initialAmenities;
// });

// const [amenitiesInfo, setAmenitiesInfo] = useState(() => {
//   const initialAmenities = {};
//   dataAmenity?.forEach((categoryData) => {
//     const category = categoryData?.name;
//     const existingAmenities = data?.amenitiesInfo?.amenities?.[category] || {};
//     initialAmenities[category] = existingAmenities;
//   });
//   return initialAmenities;
// });





const [basicInfo, setBasicInfo] = useState({
  listingName: data?.basicInfo?.listingName || '',
  bedrooms: data?.basicInfo?.bedrooms || '',
  bed: data?.basicInfo?.bed || [],
  bathrooms: data?.basicInfo?.bathrooms || 1,
  privateBathroom: data?.basicInfo?.privateBathroom || false,
  propertyName: data?.basicInfo?.propertyName || '',
  roomType: data?.basicInfo?.roomType || '',
  accommodates: data?.basicInfo?.accommodates || '',
});
 
const [locationInfo, setLocationInfo] = useState({
  city: data?.locationInfo?.city || '',
  country: data?.locationInfo?.country || '',
  addressLine1: data?.locationInfo?.addressLine1 || '',
  addressLine2: data?.locationInfo?.addressLine2 || '',
  cityTownDistrict: data?.locationInfo?.cityTownDistrict || '',
  stateProvinceCountyRegion: data?.locationInfo?.stateProvinceCountyRegion || '',
  zipPostalCode: data?.locationInfo?.zipPostalCode || '',
  mapAddress: {
    place: data?.locationInfo?.mapAddress?.place || '',
    mapUrl: data?.locationInfo?.mapAddress?.mapUrl || '',
  },
});

 
const [pricingInfo, setPricingInfo] = useState({
  nightPrice: '',
  bookingType: '',
  terms: '',
  cleaningFee:'',
  additionalGuestFee:'',
  guests:'',
  securityDeposit:'',
  weekendPrice:'',
});


const [pricingRulesInfo, setPricingRulesInfo] = useState({
  lengthOfStayDiscounts: data?.pricingRulesInfo?.lengthOfStayDiscounts || [{ nights: '', percentage: '' }],
  earlyBirdDiscounts: data?.pricingRulesInfo?.earlyBirdDiscounts || [{ days: '', percentage: '' }],
  lastMinDiscounts: data?.pricingRulesInfo?.lastMinDiscounts || [{ days: '', percentage: '' }],
});



const [availableRules, setAvailableRules] = useState([
  { minimumStay: '', maximumStay: '', selectDates: '' },
]);

const [checkInProcedure,setCheckInProcedure] = useState({
  checkin: data?.checkInProcedure?.checkin || '',
  checkout: data?.checkInProcedure?.checkout || '',
  space: data?.checkInProcedure?.space || '',
  guestAccess: data?.checkInProcedure?.guestAccess || '',
  interactionWithGuests: data?.checkInProcedure?.interactionWithGuests || '',
  notes: data?.checkInProcedure?.notes || '',
  houseRules: data?.checkInProcedure?.houseRules || '',
  overview: data?.checkInProcedure?.overview || '',
  gettingArround: data?.checkInProcedure?.gettingArround || '',
  summary: data?.checkInProcedure?.summary || '',
});
 

const [mediaData, setMediaData] = useState({
  VIDEO_DOC: data?.mediaData?.VIDEO_DOC || [],
  PHOTO_DOC: data?.mediaData?.PHOTO_DOC || [],
  videoUrl: data?.mediaData?.videoUrl || [''],
});

 

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


 

 
  const handleClick = () => {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          resolve('foo')
        } else {
          reject('fox')
        }
      }, 1000)
    })

    return toast.promise(myPromise, {
      loading: 'Loading',
      success: 'File uploaded successfully!',
      error: 'File exceeds the maximum size limit',
      position: 'bottom-right'
    }),
    { appearance: 'info', autoDismiss: true, placement: 'bottom-right' }
  }

 
 
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


 

const [showBedInput, setShowBedInput] = useState(false);
// ... other code ...

const handleAddBeds = (bedType) => {
  if (bedType && bedsQuantity > 0) {
    const existingBedIndex = bedsList.findIndex((bed) => bed.type === bedType);
    if (existingBedIndex !== -1) {
      // Bed type already exists, increase the quantity
      const updatedBeds = [...bedsList];
      updatedBeds[existingBedIndex].quantity += bedsQuantity;
      setBedsList(updatedBeds);
    } else {
      // Bed type does not exist, add it to the list
      setBedsList([...bedsList, { type: bedType, quantity: bedsQuantity }]);
    }

    setBedsQuantity(1); // Reset bed quantity to 1
    setShowBedInput(false); // Hide bed input fields after adding
  }
};

useEffect(() => {
  setBasicInfo((prevBasicInfo) => ({
    ...prevBasicInfo,
    bed: bedsList,
  }));
}, [bedsList]);



  const handleClose = () => {
    setShow(false)
    setActiveTab('BasicInfoTab')
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
          disabled={activeTab === 'BasicInfoTab'}
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

  return (
   
     <>
      {/* <div className='w-full bg-violet-100  text-right px-3 py-1'> */}
      <div onClick={() => setShow(true)}>
        {purpose ==='add' ? 'Add Room' : 'Edit'} 
        </div>
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
             Add New Room
            </Typography>
     
          </Box>
          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
              {/* <ToastContainer  position="top-center" className="z-50 absolute" /> */}
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
                  value='BasicInfoTab'
                  label={
                    <TabLabel
                      title='Basic Info'
                      subtitle='Enter Details'
                      icon={<Icon icon='mdi:clipboard-outline' />}
                      active={activeTab === 'BasicInfoTab'}
                    />
                  }
                />
              

<Tab
  value='LocationInfoTab'
  label={
    <TabLabel
      title='Location Info'
      active={activeTab === 'LocationInfoTab'}
      subtitle='short info her123e'
      icon={<Icon icon='mdi:credit-card-outline' />}
      sx={{ color: 'red' }} // Change the text color here
    />
  }
/>




<Tab
                  disableRipple
                  value='AmenitiesTab'
                  label={
                    <TabLabel
                      title='Amenities'
                      active={activeTab === 'AmenitiesTab'}
                      subtitle='short info here'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />


<Tab
                  disableRipple
                  value='PHOTOSTab'
                  label={
                    <TabLabel
                      title='Media'
                      active={activeTab === 'PHOTOSTab'}
                      subtitle='Photos & Videos'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />

 

<Tab
                  disableRipple
                  value='AvailableRuleTab'
                  label={
                    <TabLabel
                      title='Available Rules'
                      active={activeTab === 'AvailableRuleTab'}
                      subtitle='short info here'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />

<Tab
                  disableRipple
                  value='CheckiQuideTab'
                  label={
                    <TabLabel
                      title='Check in Procedure'
                      active={activeTab === 'CheckiQuideTab'}
                      subtitle='short info here'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />



              </TabList>
              <TabPanel value='BasicInfoTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>

                
                <BasicInfo basicInfo={basicInfo}
          setBasicInfo={setBasicInfo} 
          bedsQuantity={bedsQuantity}
          bedsList={bedsList}
          setBedsList={setBedsList}
          showBedInput={showBedInput}
          setShowBedInput={setShowBedInput}
          handleAddBeds={handleAddBeds}
          data_roomType={dataRoomType} 
          data_bedType={dataBed}
          data_roomCategory={dataRoomCategory}
          />
          </div>
                {renderTabFooter()}
              </TabPanel>
             
              {/* <TabPanel value='DescriptionTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <Descriptions descriptionInfo={descriptionInfo} setDescriptionInfo={setDescriptionInfo} />
                </div>
                {renderTabFooter()}
              </TabPanel> */}
              <TabPanel value='LocationInfoTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <Location locationInfo={locationInfo} setLocationInfo={setLocationInfo} />
                </div>
                {renderTabFooter()}
              </TabPanel>

              

              <TabPanel value='PHOTOSTab' sx={{ flexGrow: 1, p: '0 !important' }}>
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
 

              <TabPanel value='AmenitiesTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <Amenities amenitiesInfo={amenitiesInfo} purpose={purpose} setAmenitiesInfo={setAmenitiesInfo} data_amenity={dataAmenity} />
                </div>
                {renderTabFooter()}
              </TabPanel>

 


 

             {/* <TabPanel value='PricingTab' sx={{ flexGrow: 1, p: '0 !important' }}>
             <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <Pricing pricingInfo={pricingInfo} setPricingInfo={setPricingInfo} />
                </div>
                {renderTabFooter()}
               
              </TabPanel>

              <TabPanel value='PriceRuleTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <PriceRules pricingRulesInfo={pricingRulesInfo} setPricingRulesInfo={setPricingRulesInfo} />
                </div>
                {renderTabFooter()}
              </TabPanel> */}

              <TabPanel value='AvailableRuleTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-autox overflow-x-hidden overflow-y-hidden'>
                <AvailableRUles pricingInfo={pricingInfo} setPricingInfo={setPricingInfo} pricingRulesInfo={pricingRulesInfo} setPricingRulesInfo={setPricingRulesInfo} availableRules={availableRules} setAvailableRules={setAvailableRules} />
                </div>
                {renderTabFooter()} 
              </TabPanel>


              

 
              <TabPanel value='CheckiQuideTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <CheckinProcedure checkInProcedure={checkInProcedure} setCheckInProcedure={setCheckInProcedure} />
                 
                </div>
                {renderTabFooter()}
              </TabPanel>

              <TabPanel value='submitTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto menu'>
                <Box sx={{ textAlign: '' }}>
                  <Typography variant='h6'>Submit All Info</Typography>
                
                  <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <Submit 
                basicInfo={basicInfo} 
     
                locationInfo={locationInfo} 
                amenitiesInfo={amenitiesInfo} 
                pricingInfo={pricingInfo} 
                pricingRulesInfo={pricingRulesInfo} 
                availableRules={availableRules} 
                checkInProcedure={checkInProcedure}
                mediaData={mediaData}
                />
               </div>
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

export default AddRoomsModel

// Dates 
{/* <DatePickerWrapper>
     

<DatePicker
    selected={mediaData?.joiningDate}
 
    id='picker-open-date'
    onChange={handleDateChangeJ}
    name="joiningDate"
     dateFormat="dd/MM/yyyy" // Set the desired date format here
     maxDate={new Date()} // Restrict selection to dates up to today
     customInput={<PickersComponent label='Joining Date' />} 
     className='w-full'
   />
       </DatePickerWrapper> */}