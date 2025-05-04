import { useEffect, useRef, useState } from 'react';
import UseAuth from './UseAuth';
import Swal from 'sweetalert2';

export default function AvatarDropdown() {
    const{user} = UseAuth()
    // console.log(user)
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);
  const items = ['Profile', 'Dashboard', 'Settings', 'Log Out'];
 // handlelogout
//   const handlelogout =()=>{
//     logOut()
//     .then(() => {
//       Swal.fire({
//         title: "Are you sure?",
//         text: "User Logout",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!"
//       }).then((result) => {
//         if (result.isConfirmed) {
//           Swal.fire({
//             title: "Deleted!",
//             text: "Sign-out successful..",
//             icon: "success"
//           });
//         }
//       });
//       // Sign-out successful.
//     }).catch((error) => {
//       console.log(error.message)
//       // An error happened.
//     });
//   }


  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) { 
        setOpen(false)
      }
    };
    document.addEventListener('mousedown', close);
    return () => {
      document.removeEventListener('mousedown', close)
    }
  }, []);

  return (
      <div ref={dropDownRef} className="relative mx-auto w-fit text-black">
          <button onClick={() => setOpen((prev) => !prev)}>
              <img width={40} height={40} className="size-10 rounded-full bg-slate-500 object-cover duration-500 hover:scale-x-[98%] hover:opacity-80" src={user?.photoURL} alt="avatar drop down navigate ui"/>
          </button>
          <ul className={`${open ? 'visible duration-300' : 'invisible'} absolute right-0 top-12 z-50 w-fit rounded-sm bg-slate-200 shadow-md`}>
              {items.map((item, idx) => (
                <li key={idx} className={`rounded-sm px-6 py-2 ${open ? 'opacity-100 duration-300' : 'opacity-0'}  ${item  === 'Log Out' ? 'text-red-500 hover:bg-red-600 hover:text-white' : 'hover:bg-slate-300'}`}>
                  {item}
                </li>
              ))}
          </ul>
      </div>
    );
}
