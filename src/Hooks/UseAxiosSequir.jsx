import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UseAuth from '../Hooks/UseAuth'

const axiosSequire= axios.create({
    baseURL:"http://localhost:5000",
    // baseURL:"https://hospital-server-peach.vercel.app"
})

function useAxiosSequire() {
  const navigate = useNavigate()
  const {logOut} =UseAuth()
  // Add a request interceptor
  axiosSequire.interceptors.request.use(function(config){
    const token = localStorage.getItem('access-token')
    console.log('Request stopped by interceptors' ,token)
    config.headers.authorization = `Bearer ${token}`
 return config
  },function(error){
    
    // Do something with request error
    return Promise.reject(error)
  })

// Add a response interceptor (401 and 403 status)

axiosSequire.interceptors.response.use(function(response){
  return response
},async (error)=>{
  const status = error.response.status
  console.log('status code by interceptor',status)
  if(status === 401 || status === 403 ){
await logOut()
navigate('/login')

  }
  return Promise.reject(error)
})



  return axiosSequire
}

export default useAxiosSequire