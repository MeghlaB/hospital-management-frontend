import React from 'react'
import UseAxiosPublic from '../../Hooks/UseAxiosPublic'
import { useQuery } from '@tanstack/react-query'

function DoctorList() {
  const axiosPublic = UseAxiosPublic()

  const { isLoading, error, isError, data: doctors = [] } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const res = await axiosPublic.get('/doctors')
      return res.data
    },
  })

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Loading doctors...</p>
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Error fetching doctors: {error.message}
      </p>
    )
  }

  return (
    <div className="mt-8 px-4">
      <h1 className="text-xl font-bold mb-4">Doctor List</h1>
      <ul className="space-y-2">
        {doctors.map((doctor) => (
          <li key={doctor._id} className="p-4 bg-white shadow rounded">
            <img src={`/${doctor.image}`}  className="text-lg font-semibold"></img>
            <p className="text-gray-600">{doctor.specialty}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DoctorList
