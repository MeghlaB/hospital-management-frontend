import axios from 'axios'


const axiosPublic= axios.create({
    baseURL:"http://localhost:5000",
    // baseURL:"https://hospital-server-peach.vercel.app"
})

function UseAxiosPublic() {
  return axiosPublic
}

export default UseAxiosPublic
