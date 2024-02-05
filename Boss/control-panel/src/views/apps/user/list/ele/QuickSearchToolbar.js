// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { GridToolbarFilterButton } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const QuickSearchToolbarr = props => {
  return (
    <>
 
    <div className='w-full h-fit bg-violet-400x flex justify-end px-3'>

<div className='-mt-12 bg-transparentx w-fit bg-red-400x px-2 z-50 '>
      <GridToolbarFilterButton />
</div>
    </div>
 
    </>
   
  )
}

export default QuickSearchToolbarr
