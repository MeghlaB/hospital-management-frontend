import axios from 'axios'


const axiosPublic= axios.create({

    // baseURL:"https://hospita-management-server.onrender.com",
    baseURL:"https://hospita-management-server.onrender.com",
    // baseURL:"http://localhost:5000",
    withCredentials:true,
  
})

function UseAxiosPublic() {
  return axiosPublic
}

export default UseAxiosPublic
