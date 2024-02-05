'use client'
// ** React Imports

import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
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

import useSWR from 'swr'

import USER_ROLE from './UserRole'
import PersonalInfo from './Tabs/PersonalInfo'
import EmploymentInfo from './Tabs/EmploymentInfo'
import EducationInfo from './Tabs/EducationInfo'
import AdditionalNotes from './Tabs/AdditionalNotes'
import BillingDetails from './Tabs/BillingDetails'
import LegalInfo from './Tabs/LegalInfo'
import Submit from './Tabs/Submit'
// import Submit from './Tabs/Submit'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const TabLabel = props => {
  const { icon, title, subtitle, active  ,isAdmin, isCustomer, isHost} = props

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}
      //  className={`${active ? 'text-white bg-violet-500 w-full' : ''}`}
       
       >

        <Avatar
          variant='rounded'
         
          sx={{
            mr: 3.5,
            ...(active ? { color: 'common.white', backgroundColor: 'primary.main' } : { color: 'text.primary' })
          }}
        >
          {icon}
        </Avatar>
        <Box
        //  sx={{ textAlign: 'left' }}
        sx={{
          textAlign:'left',
          mr: 3.5,
          // ...(active ? { color: 'common.white', backgroundColor: 'primary.main' } : { color: 'text.primary' })
        }}
        >
          <Typography variant='body2'>{title}</Typography>
          <Typography variant='caption'
          // sx={{
          //   mr: 3.5,
          //   ...(active ? { color: 'common.white', backgroundColor: 'primary.main' } : { color: 'text.primary' })
          // }}
          sx={{ color: 'text.disabled', textTransform: 'none' }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}


const tabsArrAdmin = [
  'BasicInfoTab',
  'PersonalInfoTab', 
  'EmploymentInfoTab',
  'LegalInfoTab',
  'EducationInfoTab', 
  'AdditionNotesTab',
  'BillingTab',
  'submitTab'
];

const tabsArrUser = [
  'BasicInfoTab',
  'PersonalInfoTab', 
  'submitTab'
];


const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};



const AddUserModel = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [activeTab, setActiveTab] = useState('BasicInfoTab')

  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings

 
          //  NEW COMMER NOW 
  const [formData, setFormData] = useState({
    VIDEO_DOC: [],
      PHOTO_DOC: [],
    username: '',
    firstName: '',
    nickName: '',
    lastName: '',
    phone: '',
    mobile: '',
    profile: null,
    country: '',
    state:'',
    city: '',
    address1:'',
    address2:'',
    zipCode:'',
    email: '',
    password: '',
    retypedPassword: '',
    role: 'isAdmin',
    status: 'active',
    documentIDs: [],
    documentIDsE: [],
    department: '',
    position: '',
    workMobile: '',
    telephone: '',
    branch: '',
    workLocation: '',
    joiningDate: '',
    contract: '',
    employeeType: '',
    workPermitNo: '',
    workPermitExpiry: '',
    visaNo: '',
    visaExpiry: '',
    emiratesIdNo: '',
    passportNo: '',
    passportExpiry: '',
    lineManager: '',
    nationality: '',
    gender: '',
    language: [],
    maritalStatus: '',
    dateOfBirth: null,
    placeOfBirth: '',
    numOfChildren: '',
    homeAddress: '',
    academicLevel: '',
    fieldOfStudy: '',
    school: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    notes: '',
    address1: '',
    address2: '',
    isActive:false,
    isVerified:false,

    cardNumber:'',
    cardHolderName:'',
    expirationMonth:'',
    expirationYear:'',
    cvv:'',
    isCardSaved:false,


    accountName:'',
    accountNumber:'',
    bankName:'',
    swiftNumber:'',
    ibanNumber:'',
    countryBank:'',
    ibanNumberConfirm:'',
 



  });


  const statusOptions = ['isActive', 'isNotActive'];
  const roleOptions = [
    { value: 'isAdmin', label: 'Super Admin' },
    { value: 'isClient', label: 'Customer' },
    { value: 'isAgent', label: 'Hoster' },
  ];



  const handleFileChange = (event, type) => {
    const files = event.target.files;

    if (type === 'profile') {
      setFormData({ ...formData, profile: files[0] });
    } else if (type === 'documentIDs') {
      setFormData({ ...formData, documentIDs: [...formData.documentIDs, ...files] });
    } else if (type === 'documentIDsE') {
      setFormData({ ...formData, documentIDsE: [...formData.documentIDsE, ...files] });
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, profile: null });
  };

  const handleRemoveDocument = (index) => {
    const updatedDocuments = formData.documentIDs.filter((_, i) => i !== index);
    setFormData({ ...formData, documentIDs: updatedDocuments });
  };

  const handleRemoveDocumentE = (index) => {  

    const updatedDocuments = formData.documentIDsE.filter((_, i) => i !== index);
    setFormData({ ...formData, documentIDsE: updatedDocuments });

  };

 

  let months = [];

  for (let month = 1; month <= 12; month+=1) {
    months.push({ value: month, label: month });
  }

  const years = [];

  for (let x = 2023; x <= 2040; x++) {
    years.push({ value: x, label: x });
  }
  
 
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
 
const handleFileDrop = (event, type) => {
  event.preventDefault();
  const files = event.dataTransfer.files;

  if (type === 'PHOTO_DOC') {
    setFormData({ ...formData, PHOTO_DOC: [...formData.PHOTO_DOC, ...files] });
  }

  if (type === 'VIDEO_DOC') {
    setFormData({ ...formData, VIDEO_DOC: [...formData.VIDEO_DOC, ...files] });
  }

 
};

 

  const handleClose = () => {
    setShow(false)
    setActiveTab('BasicInfoTab')
  }
  const nextArrow = direction === 'ltr' ? 'mdi:arrow-right' : 'mdi:arrow-left'
  const previousArrow = direction === 'ltr' ? 'mdi:arrow-left' : 'mdi:arrow-right'

  const renderTabFooter = () => {
    let prevTab;
    let nextTab;
    if(selectedUserType === 'isAdmin'){
      prevTab = tabsArrAdmin[tabsArrAdmin.indexOf(activeTab) - 1]
      nextTab = tabsArrAdmin[tabsArrAdmin.indexOf(activeTab) + 1]
    }

    if(selectedUserType !== 'isAdmin'){
      prevTab = tabsArrUser[tabsArrUser.indexOf(activeTab) - 1]
      nextTab = tabsArrUser[tabsArrUser.indexOf(activeTab) + 1]
    }
    // tabsArrAdmin,tabsArrUser
    // {selectedUserType === 'isAdmin' && (

    return (
      <Box sx={{ mt: 8.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* <Button
          variant='outlined'
          color='secondary'
          disabled={activeTab === 'BasicInfoTab'}
          onClick={() => setActiveTab(prevTab)}
          startIcon={<Icon icon={previousArrow} />}
        >
          Previous
        </Button> */}
        {/* <Button
  variant='outlined'
  color='secondary'
  // disabled={activeTab === 'BasicInfoTab'}
  onClick={() => { 
    setActiveTab(prevTab)
    if (activeTab === 'BasicInfoTab') {
      alert('Clicked!');
    }
  }}
  startIcon={<Icon icon={previousArrow} />}
>
  Previous
</Button> */}

<Button
  variant='outlined'
  color='secondary'
  // disabled={activeTab === 'BasicInfoTab' ? true : false}
  onClick={() => {
    activeTab === 'BasicInfoTab' ? setContinueB(prev => !prev) : setActiveTab(prevTab);
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

  const [userTypeSelected,setUserTypeSelected] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);
    const [continueB, setContinueB] = useState(false);

 
  return (
   
     <>
      <div className=''>
      <div  onClick={() => setShow(true)} 
       className='py-2  bg-violet-400  px-3 rounded-lg text-white cursor-pointer hover:bg-violet-300 transform transition ease-in-out duration-500 '>
          Add User
        </div>
      </div>
       
   
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
             Add User {selectedUserType}
            </Typography>
     
          </Box>

{!continueB ?

<USER_ROLE 
  selectedUserType={selectedUserType}
   setSelectedUserType={setSelectedUserType} 
   continueB={continueB} 
   setContinueB={setContinueB}

    />

:
           <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }} >
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
                  
                  disableRipple
                  value='PersonalInfoTab'
                  label={
                    <TabLabel
                      title='Personal Info'
                      active={activeTab === 'PersonalInfoTab'}
                      subtitle='Select Database'
                      icon={<Icon icon='mdi:chart-donut' />}
                   
                    />
                  }
                />

{/* <Tab
                  disableRipple
                  value='submitTab'
                  label={
                    <TabLabel
                      title='Submit1'
                      active={activeTab === 'submitTab'}
                      subtitle='short info here'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                /> */}

   
   {selectedUserType === 'isAdmin' && (
    
    <Tab
 
 disableRipple
 value='EmploymentInfoTab'
 label={
   <TabLabel
     title='Employment Info'
     active={activeTab === 'EmploymentInfoTab'}
     subtitle='short info her123e'
     icon={<Icon icon='mdi:credit-card-outline' />}
     sx={{ color: 'red' }} // Change the text color here
   />
 }
/>
)}


{selectedUserType === 'isAdmin' && (
    <Tab
                  disableRipple
                  value='LegalInfoTab'
                  label={
                    <TabLabel
                      title='Legal Info'
                      active={activeTab === 'LegalInfoTab'}
                      subtitle='short info here'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />

                )}

                
{selectedUserType === 'isAdmin' && (
    

<Tab
                 disableRipple
                 value='EducationInfoTab'
                 label={
                   <TabLabel
                     title='Education Info'
                     active={activeTab === 'EducationInfoTab'}
                     subtitle='short info here'
                     icon={<Icon icon='mdi:credit-card-outline' />}
                   />
                 }
               />
    )}




{selectedUserType === 'isAdmin' && (
<Tab
                  disableRipple
                  value='AdditionNotesTab'
                  label={
                    <TabLabel
                      title='Addition Notes'
                      active={activeTab === 'AdditionNotesTab'}
                      subtitle='Photos & Videos'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />
                )}

{selectedUserType === 'isAdmin' && (
<Tab
                  disableRipple
                  value='BillingTab'
                  label={
                    <TabLabel
                      title='Billing Details'
                      active={activeTab === 'BillingTab'}
                      subtitle='short info here'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />
                )}
 

<Tab
                  disableRipple
                  value='submitTab'
                  label={
                    <TabLabel
                      title='Preview'
                      active={activeTab === 'submitTab'}
                      subtitle='short info here'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />

 
              </TabList>
              <TabPanel value='BasicInfoTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>

                
                <BasicInfo  
                formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} statusOptions={statusOptions} roleOptions={roleOptions} handleFileChange={handleFileChange} handleRemoveImage={handleRemoveImage} handleRemoveDocument={handleRemoveDocument} handleFileDrop={handleFileDrop}

          />
          </div>
                {renderTabFooter()}
              </TabPanel>
             
              <TabPanel value='PersonalInfoTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <PersonalInfo formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} />
            
                </div>
                {renderTabFooter()}
              </TabPanel>


     
              
              {selectedUserType === 'isAdmin' && (
              <TabPanel value='EmploymentInfoTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <EmploymentInfo formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} />
                </div>
                {renderTabFooter()}
              </TabPanel>
              )}
              
              {selectedUserType === 'isAdmin' && (
              <TabPanel value='LegalInfoTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
              <LegalInfo 
 formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} handleFileDrop={handleFileDrop} handleFileChange={handleFileChange} handleRemoveDocument={handleRemoveDocument}
 />
                </div>
                {renderTabFooter()}
              </TabPanel>
              )}
 
 {selectedUserType === 'isAdmin' && (
              <TabPanel value='EducationInfoTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
              <EducationInfo 
    formData={formData} handleInputChange={handleInputChange} handleFileDrop={handleFileDrop} handleFileChange={handleFileChange} handleRemoveDocumentE={handleRemoveDocumentE}
                  />
                </div>
                {renderTabFooter()}
              </TabPanel>
 )}
             


 

             {selectedUserType === 'isAdmin' && (
              <TabPanel value='AdditionNotesTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
              <AdditionalNotes 
    formData={formData} handleInputChange={handleInputChange} 
                  />
                  </div>
                {renderTabFooter()}
              </TabPanel>
             )}

{selectedUserType === 'isAdmin' && (
             <TabPanel value='BillingTab' sx={{ flexGrow: 1, p: '0 !important' }}>
             <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                <BillingDetails formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} months={months} years={years}  />
                </div>
                {renderTabFooter()}
               
              </TabPanel>
)}

{selectedUserType === 'isAdmin' && (
              <TabPanel value='PriceRuleTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                {/* <PriceRules pricingRulesInfo={pricingRulesInfo} setPricingRulesInfo={setPricingRulesInfo} /> */}
                </div>
                {renderTabFooter()}
              </TabPanel>
)}

{selectedUserType === 'isAdmin' && (
              <TabPanel value='AvailableRuleTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500x h-[calc(100vh-20rem)] relative overflow-y-auto overflow-x-hidden menu'>
                {/* <AvailableRUles availableRules={availableRules} setAvailableRules={setAvailableRules} /> */}
                </div>
                {renderTabFooter()}
              </TabPanel>
)}
 

              <TabPanel value='submitTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div className='w-full bg-red-500 h-[calc(100vh-20rem)] relative overflow-y-auto menu'>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h6'>Submit All Info</Typography>
                <Submit formData={formData} />
            
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

export default AddUserModel

// Dates 
{/* <DatePickerWrapper>
     

<DatePicker
    selected={formData?.joiningDate}
 
    id='picker-open-date'
    onChange={handleDateChangeJ}
    name="joiningDate"
     dateFormat="dd/MM/yyyy" // Set the desired date format here
     maxDate={new Date()} // Restrict selection to dates up to today
     customInput={<PickersComponent label='Joining Date' />} 
     className='w-full'
   />
       </DatePickerWrapper> */}