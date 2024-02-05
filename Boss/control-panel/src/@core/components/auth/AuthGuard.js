 
const AuthGuard = props => {
  const { children, fallback } = props
 
  return <>{children}</>
}

export default AuthGuard
