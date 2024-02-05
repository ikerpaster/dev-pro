// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import CardSnippet from 'src/@core/components/card-snippet'

// ** Demo Components Imports
// import AccordionSimple from 'src/views/components/accordion/AccordionSimple'
// import AccordionActions from 'src/views/components/accordion/AccordionActions'
// import AccordionControlled from 'src/views/components/accordion/AccordionControlled'
// import AccordionCustomized from 'src/views/components/accordion/AccordionCustomized'

// ** Source code imports
// import * as source from 'src/views/components/accordion/AccordionSourceCode'
import { Button, FormControlLabel, Switch, TextField } from '@mui/material'
// import { Gif } from '@mui/icons-material'
import { Box } from '@mui/system'

const Accordion = () => {
  return (
    <Grid container spacing={6}>
   
    
   <Grid item xs={12} md={6} spacing={6}>
        <CardSnippet
          title='Frequently Asked Questions.'
          // code={{
          //   tsx: null,
          //   jsx: source.AccordionCustomizedJSXCode
          // }}
          sx={{
            boxShadow: 'none',
            backgroundColor: 'transparent',
            border: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography sx={{ mb: 4 }}>
            All FAQ List
          </Typography>
          {/* <AccordionCustomized /> */}
        </CardSnippet>
      </Grid>

 
      <Grid item xs={12} md={6} sx={{ background: 'white' }} className='rounded-xl'>
        <CardSnippet
          title='Add New FAQ'
          // code={{
          //   tsx: null,
          //   jsx: source.AccordionCustomizedJSXCode
          // }}
          sx={{
            boxShadow: 'none',
            backgroundColor: 'transparent',
            border: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography sx={{ mb: 4 }}>
          Provide answers to common queries with ease using our intuitive FAQ creation tool.
          </Typography>
         
         
          <Grid item sm={12} xs={12}>
              <TextField fullWidth   label='FAQ Question' placeholder='Type Question' />
            </Grid>
            <Grid item sm={12} xs={12} sx={{mt:10}}>
              <TextField fullWidth   label='FAQ Answer' placeholder='Type the Answer' />
            </Grid>


            <Box sx={{ mx: 'auto', textAlign: 'center' }}>
  <Button variant="contained" sx={{ mt: 5 }}>
    Submit
  </Button>
</Box>



        </CardSnippet>
      </Grid>
           
        
           
            
        </Grid>
    
  
  )
}

export default Accordion
