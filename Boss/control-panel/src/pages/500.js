// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
 
// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(15),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}))

const Error500 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h1' sx={{ mb: 2.5 }}>
            500
          </Typography>
          <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.5rem !important' }}>
            Internal server error 👨🏻‍💻
          </Typography>
          <Typography variant='body2'>Oops, something went wrong!</Typography>
        </BoxWrapper>
 
        <Button href='/apps/dashboard/' component={Link} variant='contained' sx={{ px: 5.5, mt:10 }}>
          Back to Home
        </Button>
      </Box>
    
    </Box>
  )
}
Error500.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error500
