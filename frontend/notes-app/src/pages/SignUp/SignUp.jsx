import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput';
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper';


function SignUp() {

      const [name,setName] = useState("");
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [error,setError] = useState(null);


  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError("please enter name.");
      return;
    }

    if(!validateEmail(email)){
      setError("please enter valid email address.");
      return;
    }

    if(!password){
      setError("please enter password.");
      return;
    }

    setError("")

    //SignUp api call

  };
  return (
    <>
    <Navbar />
         <div className='flex items-center justify-center mt-28'>
          <div className='py-10 bg-white border rounded w-96 px-7'>
            <form onSubmit={handleSignUp}>
              <h4 className='text-2xl mb-7'>SignUp</h4>

              <input
               type="text" 
               placeholder='Name'
               className='input-box'
               value={name}
               onChange={(e) => setName(e.target.value)}
                />

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
                  Create Account
                </button>

              <p className='mt-4 text-sm text-center'>
               Already have an Account?{" "}
              <Link to="/login" className='font-medium underline text-primary'>
               Login
               </Link>
              </p>
              
            </form>
         </div>
        </div>
    </>
  )
}

export default SignUp