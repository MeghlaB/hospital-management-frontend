import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UseAuth from '../Hooks/UseAuth'
import { useEffect } from 'react'

const axiosSequire = axios.create({
  baseURL:"https://hospital-server-peach.vercel.app",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
})

function useAxiosSequire() {
  const navigate = useNavigate()
  const { logOut } = UseAuth()

  useEffect(() => {
    const requestInterceptor = axiosSequire.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token')
        if (token) {
          config.headers.authorization = `Bearer ${token}`
        }
        return config
      }, 
      (error) => Promise.reject(error)
    )

    const responseInterceptor = axiosSequire.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status
        if (status === 401 || status === 403) {
          await logOut()
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosSequire.interceptors.request.eject(requestInterceptor)
      axiosSequire.interceptors.response.eject(responseInterceptor)
    }
  }, [logOut, navigate])

  return axiosSequire
}

export default useAxiosSequire
