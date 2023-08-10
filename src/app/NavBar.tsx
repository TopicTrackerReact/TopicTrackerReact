'use client'

import Link from "next/link";
import useAuthStatus from "@/_redux/features/authHook";

export default function NavBar() {

  const isAuthenticated = useAuthStatus();
  console.log('auth status: ', isAuthenticated);

  return (
    <div className="min-h-[20vh]">
      <h1 className="text-4xl text-center p-5">
        Topic Tracker
      </h1>
      <div className="flex justify-around items-center w-1/4 gap-3 m-auto">
        <Link className="btn" href={'/home'}>Home</Link>
        <Link className="btn" href={'/flashcards'}>Study</Link>
        <Link className="btn" href={isAuthenticated ? '/logout' : '/login'}>{isAuthenticated ? 'Logout' : 'Login'}</Link>
      </div>
    </div >
  )
}