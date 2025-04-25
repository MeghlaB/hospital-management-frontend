import axios from 'axios'


const axiosSequire= axios.create({
    baseURL:"http://localhost:5000"
})

function useAxiosSequire() {
  return axiosSequire
}

export default useAxiosSequire