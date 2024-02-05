// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import ToggleButton from '@mui/material/ToggleButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import Prism from 'prismjs'
import toast from 'react-hot-toast'

// ** Hooks
import useClipboard from 'src/@core/hooks/useClipboard'

const CardSnippet = props => {
  // ** Props
  const { id, sx, code, title, children, className } = props

  // ** States
  const [showCode, setShowCode] = useState(false)
 
  // ** Hooks
  const clipboard = useClipboard()
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

 
  return (
    <Card
      className={className}
      sx={{ '& .MuiCardHeader-action': { lineHeight: 0.8 }, ...sx }}
      id={id || `card-snippet--${title.toLowerCase().replace(/ /g, '-')}`}
    >
      <CardHeader
        title={title}
      />
      <CardContent>{children}</CardContent>
      
    </Card>
  )
}

export default CardSnippet
