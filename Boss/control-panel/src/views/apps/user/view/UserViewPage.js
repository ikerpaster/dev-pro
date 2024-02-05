// ** MUI Imports
import Grid from '@mui/material/Grid'

 
const UserView = ({ tab, invoiceData }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        {/* <UserViewLeft /> */}
        <div className='w-full bg-red-400 h-screen'> profile </div>
      </Grid>
      
    </Grid>
  )
}

export default UserView
