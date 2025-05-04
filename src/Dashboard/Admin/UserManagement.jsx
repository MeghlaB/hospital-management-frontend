import React from 'react'
import useAxiosSequire from '../../Hooks/UseAxiosSequir'
import { useQuery } from '@tanstack/react-query'

function UserManagement() {
    const axiosSequire = useAxiosSequire()
    const { data: users = [] } = useQuery({
      queryKey: ['doctors'],
      queryFn: async () => {
        const res = await axiosSequire.get('/users-Admin')
        // console.log(res.data)
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
              
                <th>Email</th>
                <th>Image</th>
           
              </tr>
            </thead>
            <tbody>
              {/* doctors rows */}
              {
                users.map((user, index) => (
                  <tr key={user._id}>

                    <th>{index + 1}</th>
                    <td>
                        <img src={user?.photo}
                        className='w-10 h-10 rounded-full'
                        
                        >

                        </img>
                    </td>
                    <td>{user?.name}</td>
    
                    <td>{user?.email}</td>
                    
                   
                    
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default UserManagement
