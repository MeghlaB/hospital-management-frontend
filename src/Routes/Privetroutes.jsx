import React from 'react'
import UseAuth from '../Hooks/UseAuth'
import { Navigate } from 'react-router-dom'

function Privetroutes({children}) {
    const {user,isloading} = UseAuth()
    
    if(isloading){
        return <div className='flex items-center justify-center mt-24'>
            <span className=" loading loading-spinner loading-lg"></span>
        </div>
    }
    if(user){
        return children
    }
  return <Navigate to={'/login'}></Navigate>
}

export default Privetroutes
