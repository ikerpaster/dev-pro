// ** MUI Imports
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import AddProList from './addProModel'
import { ExitToAppOutlined, ImportExportOutlined, PrintOutlined } from '@mui/icons-material'

const TableHeaderProList = props => {
  // ** Props
 

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
     
      

        <Grid  sx={{ mb: 2 }} >
   <AddProList />
        </Grid>

     
    </Box>
  )
}

export default TableHeaderProList
