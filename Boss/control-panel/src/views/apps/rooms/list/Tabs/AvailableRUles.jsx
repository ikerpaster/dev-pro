

// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { Add } from '@mui/icons-material';

import Calendar from 'src/views/apps/calendar/Calendar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'

// import PickersComponent from './ELE/PickersCustomInput';

// ** Actions
import {
  addEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
} from 'src/store/apps/calendar'

// ** CalendarColors
const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}


const AvailableRUles = ({ availableRules, setAvailableRules,pricingInfo, setPricingInfo,pricingRulesInfo,setPricingRulesInfo }) => {

  const [calendarApi, setCalendarApi] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)

  // ** Hooks
  const { settings } = useSettings()
  const dispatch = useDispatch()
  const store = useSelector(state => state.calendar)

  // ** Vars
  const leftSidebarWidth = 260
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('sm'))
  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars))
  }, [dispatch, store.selectedCalendars])
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)



  const handleAddAvailableRule = () => {
 
    setAvailableRules([...availableRules, { minimumStay: '', maximumStay: '', selectDates: '' }]);
  };

 const [showPricing,setShowPricing] = useState(false);

 const [selectedTb,setSelectedTab]= useState('photo');
  return (
    <div className="min-w-full bg-white p-4 rounded-lg shadow-md relative">
      <h2 className="text-lg font-bold mb-1">Pricing & Rules</h2>
    
      <div className='w-full  grid grid-cols-2  px-0 mb-1 bg-violet-400 rounded-lg'>
        <button onClick={()=>setShowPricing(false)} className={`${!showPricing ? 'bg-violet-800':'bg-violet-400'}  text-white py-2 rounded-tl-lg hover:bg-violet-800 transition transform ease-in-out duration-500 hover:shadow-2xl`}>Calendar</button>
        <button onClick={()=>setShowPricing(true)} className={`${showPricing ?'bg-violet-800':'bg-violet-400'}  text-white py-2 rounded-tr-lg hover:bg-violet-800 transition transform ease-in-out duration-500 hover:shadow-2xl`}> Pricing</button>
      </div>

        <div  className="mb-6 borderx border-gray-300  overflow-x-hidden menu h-[calc(100vh-24rem)]  ">
    

    

     
    <CalendarWrapper
      className='app-calendar'
      sx={{
        zIndex: 0,
        boxShadow: skin === 'bordered' ? 0 : 3,
        ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
      }}
    >

     
       {!showPricing ? 
      <Box
      className="h-fit -mt-20 px-3 m-4 overflow-hidden relative  bg-gray-100 shadow-xl rounded-lg mr-5  scale-y-75 text-xs"
        // sx={{
        //   px: 5,
        //   pt: 3.75,
        //   flexGrow: 1,
        //   borderRadius: 1,
        //   boxShadow: 'none',
        //   backgroundColor: 'background.paper',
        //   ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
        // }}
      >
     

         <Calendar
         setShowPricing={setShowPricing}
         store={store}
         dispatch={dispatch}
         direction={direction}
         updateEvent={updateEvent}
         calendarApi={calendarApi}
         calendarsColor={calendarsColor}
         setCalendarApi={setCalendarApi}
         handleSelectEvent={handleSelectEvent}
         handleLeftSidebarToggle={handleLeftSidebarToggle}
         handleAddEventSidebarToggle={handleAddEventSidebarToggle}
       />
    
       </Box>
       :
      
       <AddEventSidebar
       pricingInfo={pricingInfo} setPricingInfo={setPricingInfo}
       pricingRulesInfo={pricingRulesInfo} setPricingRulesInfo={setPricingRulesInfo}
       setShowPricing={setShowPricing}
       store={store}
       dispatch={dispatch}
       addEvent={addEvent}
       updateEvent={updateEvent}
       deleteEvent={deleteEvent}
       calendarApi={calendarApi}
       drawerWidth={addEventSidebarWidth}
       handleSelectEvent={handleSelectEvent}
       addEventSidebarOpen={addEventSidebarOpen}
       handleAddEventSidebarToggle={handleAddEventSidebarToggle}
     />
  
       }
     
    </CalendarWrapper>



        </div>
     
      {/* <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleAddAvailableRule}>
        <Add />
      </button> */}
    </div>
  );
};

export default AvailableRUles;
