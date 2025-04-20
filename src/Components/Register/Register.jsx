
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

function Register() {
  const axiosPublic = UseAxiosPublic()
  const { createUser , updateUserprofile,GoogleLogin } = UseAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // user regsiter
    createUser(data?.email, data?.password)
    .then((result) => {
      const loggedUser = result.user;
      updateUserprofile (data.name , data.photo)
      .then(()=>{
        console.log('user profile info')
        const userInfo={
          name:data.name,
          email:data.email,
          photo:data.photo,
          status:'active',
          role:'user'
        }
        console.log(userInfo)
      // Create User in the database
      axiosPublic.post('/users',userInfo)
      .then(res=>{
        if(res.data.insertedId){
          console.log('user added to the database')
          reset()
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Create Account Succesfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");

        }
      })
      .catch((err)=>{
        console.log(err)
      })
      })
      
     
      console.log(loggedUser);
    });
  };

  // Google sign in with user
  const handleGoogleSign = ()=>{
    GoogleLogin()
    .then(res=>{
      console.log(res.user)
      const userInfo = {
        email:res.user?.email,
        name:res.user?.displayName,
        photo:res.user?.photoURL
      }
      axiosPublic.post('/users',userInfo)
      .then(res=>{
        if(res.data.insertedId){
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Create Account Succesfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
       
        navigate('/')
      })
     
    })
  }



  return (
    <div>
      <div className="mx-auto w-full max-w-md space-y-4 rounded-lg  bg-white p-10 shadow-lg mt-35">
        <h1 className="text-3xl font-semibold">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* name */}
          <div className="space-y-2 text-sm text-zinc-800 ">
            <label htmlFor="username_2" className="block font-medium">
              Name*
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
              id="username_2"
              placeholder="Enter name"
              {...register("name", { required: true })}
              name="name"
              type="text"
            />
            {/* Error Messages */}
            {errors.name && (
              <span className="text-red-600 text-[14px]">Name is required</span>
            )}
          </div>
          {/*photoUrl */}
          <div className="space-y-2 text-sm text-zinc-800 ">
            <label htmlFor="username_2" className="block font-medium">
              Photo*
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
              id="username_2"
              placeholder="Enter Photo-Url"
              {...register("photo", { required: true })}
              name="photo"
              type="url"
            />
            {/* Error Messages */}
            {errors.photo && (
              <span className="text-red-600 text-[14px]">Photourl is required</span>
            )}
          </div>
          {/* email */}
          <div className="space-y-2 text-sm text-zinc-800 ">
            <label htmlFor="username_2" className="block font-medium">
              Email*
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
              id="username_2"
              placeholder="Enter email"
              {...register("email", { required: true })}
              name="email"
              type="text"
            />
            {/* Error Messages */}
            {errors.email && (
              <span className="text-red-600 text-[14px]">
                Email is required
              </span>
            )}
          </div>
          {/* password */}
          <div className="space-y-2 text-sm text-zinc-800 ">
            <label htmlFor="password_2" className="block font-medium">
              Password*
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
              id="password_2"
              placeholder="Enter password"
              name="password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: {
                  value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W)(?!.* )/,
                },
              })}
            />
            {/* Error Messages */}
            {errors.password?.type === "required" && (
              <span className="text-red-600 text-[14px]">
                {" "}
                Password must be 6 characters*
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-600 text-[14px]">
                {" "}
                Password must be less 20 characters*
              </span>
            )}

            {errors.password?.type === "pattern" && (
              <span className="text-red-600 text-[14px]">
                {" "}
                Password must contain at least 1 uppercase, 1 lowercase, 1
                number & be 6 characters long*
              </span>
            )}
          </div>
          <input
            className="w-full rounded-md  bg-teal-600 hover:bg-teal-700 px-4 py-2 text-white transition-colors  "
            type="submit"
            value={"Sigin Up"}
          />
          {/* <button className="w-full rounded-md  bg-teal-600 hover:bg-teal-700 px-4 py-2 text-white transition-colors  ">
           SignUp
          </button> */}
        </form>
        <p className="text-center text-sm text-zinc-800 ">
          have an account?
          <Link to="/login" className="font-semibold underline">
            Signin
          </Link>
        </p>
        <div className="my-8 flex items-center">
          <hr className="flex-1 border-gray-400" />
          <div className="mx-4 text-gray-400">OR</div>
          <hr className="flex-1 border-gray-400" />
        </div>
        {/* Social icons */}
        <div className="flex justify-center space-x-4 *:border hover:*:bg-zinc-400/20 *:dark:border-zinc-700">
          <button onClick={handleGoogleSign} aria-label="Log in with Google" className="rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="size-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
          <button aria-label="Log in with Twitter" className="rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="size-5 fill-current"
            >
              <path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"></path>
            </svg>
          </button>
          <button aria-label="Log in with GitHub" className="rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="size-5 fill-current"
            >
              <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
