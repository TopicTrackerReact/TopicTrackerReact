"use client"

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '@/_redux/features/authSlice';


export const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  interface Ref {
    current: {
      value: any
    } | string
  }
  const emailRef = useRef('')
  const firstRef = useRef('')
  const lastRef = useRef('')
  const passRef = useRef('')


  const handleSignUp = async () => {
    const email: string = emailRef.current.value
    const firstName: string = firstRef.current.value
    const lastName: string = lastRef.current.value
    const password: string = passRef.current.value

    const signUpResponse = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    })

    const { response } = await signUpResponse.json();
    console.log(response)
    if (response === 'Email Already Exists') {
      window.alert(response)
    } else if (response === "Sign Up Successful") {
      router.push('/home');
      dispatch(login());
    }
  }
  return (
    <div className="flex flex-col bg-slate-100 justify-around p-12 drop-shadow-xl rounded-lg">
      <h1 className="self-center text-lg">Get Started</h1>
      <label>Email</label>
      <input required={true} ref={emailRef} type='email' className="input h-8 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200" />
      <div className="flex justify-between my-3">
        <span className="flex flex-col">
          <label>First Name</label>
          <input required={true} ref={firstRef} className="input h-8 mr-2 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200" />
        </span>
        <span className="flex flex-col">
          <label>Last Name </label>
          <input required={true} ref={lastRef} className="input h-8 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200" />
        </span>
      </div>
      <label>Password</label>
      <input required={true} type='password' ref={passRef} className="input h-8 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200" />
      <button className="btn bg-gray-300 hover:bg-gray-400 mt-8" onClick={handleSignUp}>Sign Up</button>
      <h1 className='my-5 self-center'>Already have an account? <Link className="hover:underline text-blue-600" href={'/login'}>Log In</Link></h1>
    </div>
  )
}