import axios from 'axios'


const axiosSequire= axios.create({
    baseURL:"http://localhost:5000",
    // baseURL:"https://hospital-server-peach.vercel.app"
})

function useAxiosSequire() {
  return axiosSequire
}

export default useAxiosSequire