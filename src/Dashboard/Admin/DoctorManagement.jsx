import React from 'react'
import useAxiosSequire from '../../Hooks/UseAxiosSequir'
import { useQuery } from '@tanstack/react-query'

function DoctorManagement() {
  const axiosSequire = useAxiosSequire()
  const { data: doctors = [] } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const res = await axiosSequire.get('/doctors')
      console.log(res.data)
      return res.data
    }
  })

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
            
              <th>Name</th>
              <th>Specialization</th>
              <th>Email</th>
              <th>Status</th>
              <th>Fees</th>
            </tr>
          </thead>
          <tbody>
            {/* doctors rows */}
            {
              doctors.map((doctor, index) => (
                <tr key={doctor._id}>
                  <th>{index + 1}</th>
                  <td>{doctor?.name}</td>
                  <td>{doctor?.specialization}</td>
                  <td>{doctor?.email}</td>
                  <td>{doctor?.status}</td>
                  <td>{doctor?.fee || 'N/A'}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DoctorManagement
