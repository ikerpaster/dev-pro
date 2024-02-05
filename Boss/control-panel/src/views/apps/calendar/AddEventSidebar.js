// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Pricing from '../rooms/list/Tabs/Pricing'
import PriceRules from '../rooms/list/Tabs/PriceRules'
import { addDays, differenceInDays } from 'date-fns'

const capitalize = string => string && string[0].toUpperCase() + string.slice(1)

const defaultState = {
  url: '',
  title: '',
  guests: [],
  allDay: true,
  description: '',
  endDate: new Date(),
  calendar: 'Business',
  startDate: new Date()
}

const AddEventSidebar = props => {
  // ** Props
  const {
    pricingInfo, setPricingInfo,
    pricingRulesInfo,setPricingRulesInfo,
    setShowPricing,
    store,
    dispatch,
    addEvent,
    updateEvent,
    drawerWidth,
    calendarApi,
    deleteEvent,
    handleSelectEvent,
    addEventSidebarOpen,
    handleAddEventSidebarToggle
  } = props

  // ** States
  const [values, setValues] = useState(defaultState)

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } })

  const handleSidebarClose = async () => {
    setShowPricing(false);
    setValues(defaultState)
    clearErrors()
    dispatch(handleSelectEvent(null))
    handleAddEventSidebarToggle()
  }

  const onSubmit = data => {

    // console.log("values of the events:: ", values);
   

    const modifiedEvent = {
      url: values.url,
      display: 'block',
      title: data.title,
      end: values.endDate,
      allDay: values.allDay,
      start: values.startDate,
      extendedProps: {
        calendar: capitalize(values.calendar),
        guests: values.guests && values.guests.length ? values.guests : undefined,
        description: values.description.length ? values.description : undefined
      }
    }
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      dispatch(addEvent(modifiedEvent))
      setShowPricing(false)
    } else {
      dispatch(updateEvent({ id: store.selectedEvent.id, ...modifiedEvent }))
    }
    calendarApi.refetchEvents()
    handleSidebarClose()
  }

  const handleDeleteEvent = () => {
    if (store.selectedEvent) {
      dispatch(deleteEvent(store.selectedEvent.id))
    }

    // calendarApi.getEventById(store.selectedEvent.id).remove()
    handleSidebarClose()
  }

  const handleStartDate = date => {
    if (date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
    }
  }

  const resetToStoredValues = useCallback(() => {
    if (store.selectedEvent !== null) {
      const event = store.selectedEvent
      setValue('title', event.title || '')
      setValues({
        url: event.url || '',
        title: event.title || '',
        allDay: event.allDay,
        guests: event.extendedProps.guests || [],
        description: event.extendedProps.description || '',
        calendar: event.extendedProps.calendar || 'Business',
        endDate: event.end !== null ? event.end : event.start,
        startDate: event.start !== null ? event.start : new Date()
      })
    }
  }, [setValue, store.selectedEvent])

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '')
    setValues(defaultState)
  }, [setValue])
  useEffect(() => {
    if (store.selectedEvent !== null) {
      resetToStoredValues()
    } else {
      resetToEmptyValues()
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent])

  const PickersComponent = forwardRef(({ ...props }, ref) => {
 
    return (
      <TextField
      // value={pricingInfo.nightPrice}
      // onChange={(e) => setPricingInfo({ ...pricingInfo, nightPrice: ref })}
      size='small'
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    )
  })

 

  const RenderSidebarFooter = () => {
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToEmptyValues}>
            Reset
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Update
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToStoredValues}>
            Reset
          </Button>
        </Fragment>
      )
    }
  }

 

  const [daysDifference, setDaysDifference] = useState(differenceInDays(values.endDate, values.startDate));

  useEffect(() => {
    // Update the end date when daysDifference changes
    const newEndDate = addDays(values.startDate, daysDifference);
    setValues((prevValues) => ({ ...prevValues, endDate: newEndDate }));
    setPricingInfo((prevInfo) => ({ ...prevInfo, availableMaxDate: newEndDate }));
  }, [daysDifference, values.startDate]);

  const handleEndDateChange = (date) => {
    setValues({ ...values, endDate: new Date(date) });
    setPricingInfo((prevInfo) => ({ ...prevInfo, availableMaxDate: date }));

    // Calculate and update daysDifference
    const newDaysDifference = differenceInDays(new Date(date), values.startDate);
    setDaysDifference(newDaysDifference);
  };


 
  return (
    <div
    className='w-full bg-red-500x'
      // anchor='right'
      open={addEventSidebarOpen}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      // sx={{ '& .MuiDrawer-paper': { position: 'absolute',  width: ['100%', drawerWidth] } }}
      // className='z-50 '
    >
 
      <Box
        className='sidebar-header'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          // backgroundColor: 'background.default',
          p: theme => theme.spacing(3, 3.255, 3, 5.255)
        }}
      >
         {/* <div className="">Pricing</div> */}
        <div className='text-lg font-bold '>
          {store.selectedEvent !== null && store.selectedEvent.title.length ? 'Pricing Rules' : 'Add Rules'}
        </div>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {store.selectedEvent !== null && store.selectedEvent.title.length ? (
            <IconButton
              size='small'
              onClick={handleDeleteEvent}
              sx={{ color: 'text.primary', mr: store.selectedEvent !== null ? 1 : 0 }}
            >
              <Icon icon='mdi:delete-outline' fontSize={20} />
            </IconButton>
          ) : null}
          <IconButton size='small' onClick={handleSidebarClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
      </Box>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(5, 6) }}>
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className=''>
       
          <div className='grid grid-cols-2 gap-2'>

<FormControl fullWidth sx={{ mb: 6 }}>
 
  

  <Controller
  name='title'
  control={control}
  rules={{ required: true }}
  render={({ field: { value, onChange } }) => (
    <TextField
      size='small'
      label='Price'
      value={value}
      onChange={(e) => {
        onChange(e);
        setPricingInfo((prevInfo) => ({ ...prevInfo, nightPrice: e.target.value }));
      }}
      error={Boolean(errors.title)}
    />
  )}
/>



  {errors.title && (
    <FormHelperText sx={{ color: 'error.main' }} id='event-title-error'>
      This field is required
    </FormHelperText>
  )}
</FormControl>

 

<TextField
        type='number'
        size='small'
        label="Number of Days"
        value={daysDifference}
        onChange={(e) => setDaysDifference(e.target.value)}
      />


</div>
 
             <div className='grid grid-cols-2 gap-2 items-center'>

<Box sx={{ mb: 6 }}>
  <DatePicker
    selectsStart
    id='event-start-date'
    endDate={values.endDate}
    selected={values.startDate}
    startDate={values.startDate}
    showTimeSelect={!values.allDay}
    dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
    customInput={<PickersComponent label='Start Date' registername='startDate' />}
    onChange={(date) => {
      const newStartDate = new Date(date);
      setValues({ ...values, startDate: newStartDate });
      setPricingInfo((prevInfo) => ({ ...prevInfo, startDate: newStartDate, availableMinDate: date }));
    }}
    onSelect={handleStartDate}
  />
</Box>

 


<Box sx={{ mb: 6 }}>
        <DatePicker
          selectsEnd
          id='event-end-date'
          endDate={values.endDate}
          selected={values.endDate}
          minDate={values.startDate}
          startDate={values.startDate}
          showTimeSelect={!values.allDay}
          dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
          customInput={<PickersComponent label='End Date' registername='endDate' />}
          onChange={handleEndDateChange}
        />
      </Box>

 
             </div>
           
 
    <Pricing pricingInfo={pricingInfo} setPricingInfo={setPricingInfo} />

    {/* price rules  */}
    <PriceRules pricingRulesInfo={pricingRulesInfo} setPricingRulesInfo={setPricingRulesInfo} />


            <Box sx={{ display: 'flex', py:'15px', mx:'auto', alignItems: 'center' }} className="w-fit mx-auto">
              <RenderSidebarFooter />
            </Box>
          </form>
        </DatePickerWrapper>
      </Box>
    </div>
  )
}

export default AddEventSidebar
