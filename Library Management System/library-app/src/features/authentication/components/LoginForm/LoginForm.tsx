import React,{useRef,useState} from 'react';

import './LoginForm.css'
import axios from 'axios';

export const LoginForm:React.FC = ()=> {

    const [error,setError]= useState<boolean>(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLoginUser = async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(emailRef && emailRef.current && passwordRef && passwordRef.current){
            try {
                const req = await axios.post('http://localhost:8000/auth/login',{
                    email:emailRef.current.value,
                    password:passwordRef.current.value
                });

                setError(false);
                console.log(req.data.user);
            } catch (e) {
                
            }
        }
    }

     return(
        <form className='login form'>
            <h2>Please Login</h2>
            {error? <p className='login-form-error'>Username or Password is incorrect</p>: <></>}
            
            <div className='login-form-input-group'>
                <h6>Email</h6>
                <input className='login-form-input' placeholder='email' name='email' required ref={emailRef}/>
            </div>

            <div className='login-form-input-group'>
                <h6>Password</h6>
                <input className='login-form-input' placeholder='password' name='password' type='password' required ref={passwordRef}/>
            </div>

            <button className='login-form-submit' onClick={handleLoginUser}>Login</button>
            <p>
                Don't Have an account?
                <span className='login-form-register'>Create one here!</span>
            </p>

        </form>
     )
}