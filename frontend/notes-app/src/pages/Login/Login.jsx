import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link , useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axioslnstance';



function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState(null);

const navigate = useNavigate();

 const handleLogin = async (e) => {
   e.preventDefault();


    
      if(!validateEmail(email)) {
       setError("please enter valid email address.");
       return;
       }

       if(!password) {

        setError("please enter password.");
        return;
       }
       
       setError("");

       //Login api call [backend]

        try {

          const response = await axiosInstance.post("/login", {
            email: email,
            password: password,
          });

          //Handle success
            
          if(response.data && response.data.accessToken){

            localStorage.setItem("token", response.data.accessToken);
            navigate("/dashboard");
          }

        } catch (error) {
            
            //Handle error

            if(error.response && error.response.data && error.response.data.message){
              setError(error.response.data.message);
            }else{
              setError("Something went wrong. Please try again later.");
            }
        }

       
 };

  return (
   <>
    <Navbar/>
         <div className='flex items-center justify-center mt-28'>
          <div className='py-10 bg-white border rounded w-96 px-7'>
            
            <form onSubmit={handleLogin}>
              <h4 className='text-2xl mb-7'>Login</h4>

              <input
               type="text" 
               placeholder='Email'
               className='input-box'
               value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              
              <PasswordInput
               value={password}
               onChange={(e) => setPassword(e.target.value)}
              />

                {error && <p className='pb-1 text-xs text-red-500'>{error}</p>}  

              <button type='submit' className='btn-primary'>
                Login

              </button>

              <p className='mt-4 text-sm text-center'>
                Not registers yet{" "}
                <Link to="/signup" className='font-medium underline text-primary'>
                Create an Account
                </Link>
              </p>
            </form>
          </div>
          </div>  
  

   </>
  )
}

export default Login