// ** MUI Imports
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import AddAmenities from './addAmenitiesModell'

const TableHeaderAmenities = props => {
  // ** Props
  const { handleFilter, toggle, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Button
        sx={{ mr: 4, mb: 2 }}
        color='secondary'
        variant='outlined'
        startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
      >
        Export
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search User'
          onChange={e => handleFilter(e.target.value)}
        />

        <Grid  sx={{ mb: 2 }} >
   <AddAmenities />
        </Grid>

      </Box>
    </Box>
  )
}

export default TableHeaderAmenities