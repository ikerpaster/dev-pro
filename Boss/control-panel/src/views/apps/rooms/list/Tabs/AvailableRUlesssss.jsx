

// import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
// import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
// import PickersComponent from 'src/views/forms/form-elements/pickers/PickersCustomInput';
import DatePicker from 'react-datepicker'
// import PickersComponent from 'src/views/apps/user/list/STEPS/ELE/PickersCustomInput';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { TrashIcon } from '@heroicons/react/24/solid';
import { Add } from '@mui/icons-material';
import PickersComponent from 'src/views/ele/PickersCustomInput';
// import PickersComponent from './ELE/PickersCustomInput';

const AvailableRUles = ({ availableRules, setAvailableRules }) => {
  const handleAddAvailableRule = () => {
    setAvailableRules([...availableRules, { minimumStay: '', maximumStay: '', selectDates: '' }]);
  };

 

  const handleRemoveAvailableRule = (index) => {
    if (availableRules.length === 1) return;
    const updatedRules = [...availableRules];
    updatedRules.splice(index, 1);
    setAvailableRules(updatedRules);
  };


  const handleUpdateAvailableRule = (index, field, value) => {
    const updatedRules = [...availableRules];
    updatedRules[index][field] = value;
    setAvailableRules(updatedRules);
  };



  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Step 9: Available Rules</h2>
      {availableRules.map((rule, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-300 rounded-md">

<div className='grid grid-cols-2 gap-2'>



<DatePickerWrapper  key={index}>
            <DatePicker
            
              id={`picker-open-date-${index}`}
              name="selectDates"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              customInput={<PickersComponent label='Select Dates' />}
              className='w-full'
              selected={rule.selectDates ? new Date(rule.selectDates) : null}
              onChange={(date) => {
                handleUpdateAvailableRule(index, 'selectDates', date);
              }}
              
            />
          </DatePickerWrapper>

    <TextField size="small" type='number' label="Price" placeholder='Price' />

</div>


          <div className="flex gap-2 mb-4 my-2">


            <Box>
              <TextField
                size='small'
                type='number'
                label='Minimum Stay'
                value={rule.minimumStay}
                onChange={(e) => handleUpdateAvailableRule(index, 'minimumStay', e.target.value)}
              />

            </Box>



            <Box>
              <TextField
                type='number'
                label='Maximum Stay'
                value={rule.maximumStay}
                onChange={(e) => handleUpdateAvailableRule(index, 'maximumStay', e.target.value)}
                size='small'
              />

            </Box>


          </div>




          {/* <DatePickerWrapper key={index} size='small'>
            <DatePicker
              id={`picker-open-date-${index}`} // Use unique ID for each DatePicker
              name="selectDates"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              customInput={<PickersComponent label='Select Dates' />}
              className='w-full'
              selected={rule.selectDates ? new Date(rule.selectDates) : null}
              onChange={(date) => {
                handleUpdateAvailableRule(index, 'selectDates', date);
              }}
              size='small'
            />
          </DatePickerWrapper> */}



          {availableRules.length > 1 && (
            <button
              className="bg-red-500 text-white px-4 py-1 rounded mt-1"
              onClick={() => handleRemoveAvailableRule(index)}
            >
              <TrashIcon className='h-5 w-5' />
            </button>
          )}
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleAddAvailableRule}>
        <Add />
      </button>
    </div>
  );
};

export default AvailableRUles;
