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
import Location from './Tabs/Location'
import Amenities from './Tabs/Amenities'
import Medials from './Tabs/Medials'
import useSWR from 'swr'
import Submit from './Tabs/Submit'
import toast from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'
import PRE_RENTAL from './Pre-rentals'


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

// 'ProperyDetailsTab',
const tabsArr = [
  'BasicInfoTab',
  'LocationInfoTab',
  'AmenitiesTab',
  'PHOTOSTab',
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
 
const AddRENTALmodel = ({purpose,data}) => {
  // ** States
  const [show, setShow] = useState(false)
  const [activeTab, setActiveTab] = useState('BasicInfoTab')
  const [continueB, setContinueB] = useState(1);
  const [previewB, setPreviewB] = useState(1);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedFurnishing, setSelectedFurnishing] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings

console.log("THIS IS DATA AKAGA:::", data);

  // NEW VISITOR 

  const [amenitiesInfo, setAmenitiesInfo] = useState({});
  console.log("AKA Amenity:: ",amenitiesInfo);

  // fetch property  
  let urlProperty = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/properties/all`;
  const { data: dataProperty, isLoading: isLoadingProperty, error: ErrorProperty } = useSWR(
    urlProperty,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );
  //  console.log("Property Name:: ",dataProperty);


  // fetch property Type
  let urlProType = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/propert-type/all`;
  const { data: dataProType, isLoading: isLoadingProType, error: ErrorProType } = useSWR(
    urlProType,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );
  // console.log("Property Type:: ",dataProType);



  // fetch BED Type 
  let urlAdmn = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/users/linemanagers`;

  const { data:AdminsData, isLoading, error:Error } = useSWR(
    urlAdmn,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );

 
  // console.log("BED Type:: ",dataBed);


  // fetch Amenity 
  let urlAmenity = `${process.env.NEXT_PUBLIC_WEB_URL}/admin/amenities-category/all`;
  const { data: dataAmenity, isLoading: isLoadingAmenity, error: ErrorAmenity } = useSWR(
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
  const { data: dataRoomType, isLoading: isLoadingRoomType, error: ErrorRoomType } = useSWR(
    urlRoomType,
    fetcher,
    {
      revalidateOnFocus: true, // Enable real-time revalidation
      fallback: <div>Loading...</div>,
    }
  );
 
  

  const [basicInfo, setBasicInfo] = useState({
    listingName: data?.basicInfo?.listingName || '',
    buildingNo: data?.basicInfo?.buildingNo || '',
    propertyFloorNo: data?.basicInfo?.propertyFloorNo || 0,
    unitNo: data?.basicInfo?.unitNo || 0,
    description:  data?.basicInfo?.description ||'',
    permitNo:  data?.basicInfo?.permitNo || 0,
    bedrooms:  data?.basicInfo?.bedrooms || 0,
    bathrooms:  data?.basicInfo?.bathrooms || 0,
    roomType:  data?.basicInfo?.roomType || '',
    ownshipStatus:  data?.basicInfo?.ownshipStatus || '',
    listingOwner:  data?.basicInfo?.listingOwner || '',
    completionStatus:  data?.basicInfo?.completionStatus || '',
    price:  data?.basicInfo?.price || 0,
    squareFit: data?.basicInfo?.squareFit || 0,
    ocupationStatus:  data?.basicInfo?.ocupationStatus || ''
  });

  const [rentInfo, setRentInfo] = useState({
    rentalFrequency: data?.rentInfo?.rentalFrequency || '',
    contractPeriod: data?.rentInfo?.contractPeriod || '',
    vocatingNoticePeriod: data?.rentInfo?.vocatingNoticePeriod || '',
    maintenanceFee: data?.rentInfo?.maintenanceFee || '',
    paidBy: data?.rentInfo?.paidBy || '',
  });

  const [saleInfo, setSaleInfo] = useState({
    financingAvailable: data?.saleInfo?.financingAvailable || '',
    financingInstitutionName: data?.saleInfo?.financingInstitutionName || '',
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
      mapUrl:  data?.locationInfo?.mapAddress?.mapUrl || '',
    },
  });
 
  const [mediaData, setMediaData] = useState({
    VIDEO_DOC: [],
    PHOTO_DOC: [],
    videoUrl: [''],
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
          // disabled={activeTab === 'BasicInfoTab' ? true : false}
          onClick={() => {
            activeTab === 'BasicInfoTab' ? setContinueB(4) : setActiveTab(prevTab);
          }}
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
       {purpose === 'add' ? 'Add Rentals': 'Edit'} 
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
              
              {purpose === 'add' ? 'Add New Rental': 'Edit Rental'} 
            </Typography>

          </Box>

          {continueB !== 5 ?
            (
              <PRE_RENTAL
                selectedPurpose={selectedPurpose}
                setSelectedPurpose={setSelectedPurpose} selectedFurnishing={selectedFurnishing} setSelectedFurnishing={setSelectedFurnishing} selectedType={selectedType} setSelectedType={setSelectedType}
                continueB={continueB}
                setContinueB={setContinueB}
                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                previewB={previewB} setPreviewB={setPreviewB}
              />

            ) :
            // }
            // {continueB === 3 && 
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
                  
                  {/* <Tab
                    disableRipple
                    value='ProperyDetailsTab'
                    label={
                      <TabLabel
                        title='Propery Details'
                        subtitle='Enter Details'
                        icon={<Icon icon='mdi:clipboard-outline' />}
                        active={activeTab === 'ProperyDetailsTab'}
                      />
                    }
                  />  */}




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




                </TabList>
                <TabPanel value='BasicInfoTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                  <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>


                    <BasicInfo
                      selectedPurpose={selectedPurpose}
                      basicInfo={basicInfo}
                      setBasicInfo={setBasicInfo}
                      rentInfo={rentInfo}
                      setRentInfo={setRentInfo}
                      saleInfo={saleInfo}
                      setSaleInfo={setSaleInfo}
                      data_roomType={dataRoomType}
                      data_host={AdminsData}
                    />
                  </div>
                  {renderTabFooter()}
                </TabPanel>


                {/* <TabPanel value='ProperyDetailsTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                  <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>


                    <BasicInfo
                      selectedPurpose={selectedPurpose}
                      basicInfo={basicInfo}
                      setBasicInfo={setBasicInfo}
                      rentInfo={rentInfo}
                      setRentInfo={setRentInfo}
                      saleInfo={saleInfo}
                      setSaleInfo={setSaleInfo}
                      data_roomType={dataRoomType}
                      data_host={AdminsData}
                    />
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
                    <Amenities data={data} purpose={purpose} amenitiesInfo={amenitiesInfo} setAmenitiesInfo={setAmenitiesInfo} data_amenity={dataAmenity} />
                  </div>
                  {renderTabFooter()}
                </TabPanel>






                {/* <TabPanel value='PricingTab' sx={{ flexGrow: 1, p: '0 !important' }}>
             <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <Pricing pricingInfo={pricingInfo} setPricingInfo={setPricingInfo} />
                </div>
                {renderTabFooter()}
               
              </TabPanel> */}
                {/* 
              <TabPanel value='PriceRuleTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <PriceRules pricingRulesInfo={pricingRulesInfo} setPricingRulesInfo={setPricingRulesInfo} />
                </div>
                {renderTabFooter()}
              </TabPanel> */}

                {/* <TabPanel value='AvailableRuleTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <AvailableRUles availableRules={availableRules} setAvailableRules={setAvailableRules} />
                </div>
                {renderTabFooter()}
              </TabPanel> */}




                {/*  
              <TabPanel value='CheckiQuideTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <CheckinProcedure checkInProcedure={checkInProcedure} setCheckInProcedure={setCheckInProcedure} />
                 
                </div>
                {renderTabFooter()}
              </TabPanel> */}

                <TabPanel value='submitTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                  <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto menu'>
                    <Box sx={{ textAlign: '' }}>
                      <Typography variant='h6'>Submit All Info</Typography>

                      <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                        <Submit
                          basicInfo={basicInfo}
                          locationInfo={locationInfo}
                          amenitiesInfo={amenitiesInfo}
                          mediaData={mediaData}
                          rentInfo={rentInfo}
                          saleInfo={saleInfo}
                          selectedPurpose={selectedPurpose} selectedFurnishing={selectedFurnishing} selectedType={selectedType} selectedCategory={selectedCategory}
                        />
                      </div>
                    </Box>
                  </div>
                  {renderTabFooter()}
                </TabPanel>

              </TabContext>
            </Box>
          }
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddRENTALmodel

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