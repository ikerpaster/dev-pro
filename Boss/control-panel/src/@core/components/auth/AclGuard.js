// ** React Imports
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { buildAbilityFor } from 'src/configs/acl'
import NotAuthorized from 'src/pages/401'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useAuth } from 'src/hooks/useAuth'
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'

const AclGuard = props => {
  const auth = useAuth()
  const router = useRouter()
  let ability 
}

export default AclGuard
