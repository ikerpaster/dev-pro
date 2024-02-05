'use client'
import { useContext } from "react"
import { CurrentUserContext } from "src/@core/context/CurrentUserContext"

const Home = () => {

  const {currentUser,isAuthenticated} = useContext(CurrentUserContext)
 
  return (
    <div className=""> 
    this is the home page so that i can verify is user is authenticated or not authernticated!!!
    
    <div className="">
      {isAuthenticated ? (<div> yes {currentUser?._id} </div>): (<div> not  </div>)}
    </div>
    </div>
  )
}

export default Home
