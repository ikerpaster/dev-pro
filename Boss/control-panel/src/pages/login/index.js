
'use client'
// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
 
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
 
import { CurrentUserContext } from 'src/@core/context/CurrentUserContext'
import { useRouter } from 'next/navigation'

import useSWR from 'swr';

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

 

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};


const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

 

  // console.log("RESULTOSS ONE:: ", data);
  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
 
    formState: { errors }
  } = useForm({
   
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })



  const router = useRouter();
  const {isAuthenticated,currentUser, login, error, success} = useContext(CurrentUserContext);
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };


  useEffect(() => {
    // Redirect if isAuthenticated is true
    if (isAuthenticated && currentUser !==null) {
      router.push('/apps/dashboard');
    }
  }, [isAuthenticated, router]);

 
  return (
    <Box className='content-center bg-violet-900'>
    
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
 
            boxShadow: '2xl',
            borderRadius: 'lg',

            // animation: 'rotateAnimation 2s linear infinite', // Change to a different animation
            // '&:hover': {
            //   boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.5)',
            //   animation: 'none',
            // },
            // '@keyframes rotateAnimation': {
            //   '0%': {
            //     transform: 'rotate(0deg)',
            //   },
            //   '100%': {
            //     transform: 'rotate(360deg)',
            //   },
            // },


            // animation: 'bounceAnimation 1s infinite',
            // transition: 'animation 0.1s', // Add a transition for smooth effect
            // '&:hover': {
            //   animation: 'none', // Stop animation on hover
            // },
            // '@keyframes bounceAnimation': {
            //   '0%, 20%, 50%, 80%, 100%': {
            //     transform: 'translateY(0)',
            //   },
            //   '40%': {
            //     transform: 'translateY(-20px)',
            //   },
            //   '60%': {
            //     transform: 'translateY(-10px)',
            //   },
            // },


            animation: 'pulseAnimation 1.5s infinite', // Pulse animation
            '&:hover': {
              boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.5)',
              animation: 'none',
            },
            '@keyframes pulseAnimation': {
              '0%': {
                transform: 'scale(1)',
              },
              '50%': {
                transform: 'scale(1.1)',
              },
              '100%': {
                transform: 'scale(1)',
              },
            },

          }}

          
          className="shadow-2xl shadow-white rounded-lg"
        >
          <BoxWrapper>
          {/* 👋🏻 */}
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>{`Welcome to ${themeConfig.templateName}! `}</TypographyStyled>
            <center>  <Typography variant='body2'>Pleas SIgnIn to yr control Panel</Typography> </center> 
            </Box>
        
            <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username or Email address
            </label>
            <input
              id="username"
              className="form-input w-full py-2 px-3 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              required
              placeholder="John Doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              className="form-input w-full py-2 px-3 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
              type="password"
              required
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input id="remember" type="checkbox" className="form-checkbox" />
              <span className="ml-2">Remember me</span>
            </label>
            <Link href="/page-contact">
              <span className="text-xs text-gray-600 hover:text-gray-800">Forgot Password</span>
            </Link>
          </div>
          <button className="btn btn-primary w-full py-2 rounded-md font-semibold" type="submit" name="login">
            Login
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
        </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
      {/* <FooterIllustrationsV1 /> */}
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage



// {error && <p className="text-red-600 text-sm">{error}</p>}
// {success && <p className="text-green-600 text-sm">{success}</p>}
