import axios from 'axios'


const axiosPublic= axios.create({
    baseURL:"https://hospital-server-peach.vercel.app",
    // baseURL:"http://localhost:5000",
    withCredentials:true,
  
})

function UseAxiosPublic() {
  return axiosPublic
}

export default UseAxiosPublic
