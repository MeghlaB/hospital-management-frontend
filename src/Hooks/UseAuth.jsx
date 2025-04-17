import React, { useContext } from 'react'
import { AuthContext } from '../Providers/AuthProvider'

function UseAuth() {
    const auth = useContext(AuthContext)
    console.log(auth)
  return auth
}

export default UseAuth
