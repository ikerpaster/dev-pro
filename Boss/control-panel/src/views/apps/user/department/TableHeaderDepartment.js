// ** MUI Imports
import { ExitToAppOutlined, ImportExportOutlined, PrintOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import AddProType from 'src/views/apps/property/type/addProTypeModel'

const TableHeaderDepartment = props => {
  // ** Props
  const {handleAddBTN} = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className='flex  bg-violet-300 py-1 px-2 rounded-md  gap-3 text-white shadow-2xl shadow-violet-500'>
        <div className='TABLE_HEADER_ACTIONS'><ExitToAppOutlined /></div>
        <div className='TABLE_HEADER_ACTIONS'><ImportExportOutlined /></div>
        <div className='TABLE_HEADER_ACTIONS'><PrintOutlined /></div>
      </div>
 

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
       

        <Grid  sx={{ mb: 2 }} >
        {/* <AddProType /> */}
        <div className='py-2 bg-violet-300 px-3 rounded-lg text-white cursor-pointer shadow-2xl shadow-violet-500' onClick={handleAddBTN} >Add new Department </div>
        </Grid>
         
      
   

      </Box>
    </Box>
  )
}

export default TableHeaderDepartment
