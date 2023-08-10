'use client'

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateUser } from "@/_redux/slices/authSlice";

export default function Logout() {

  const router = useRouter();
  const dispatch = useDispatch();

  const loggingOut = async () => {

    const fetchResponse = await fetch('/api/auth/logout');
    const response = await fetchResponse.json();

    router.push('/login');
    dispatch(updateUser(''));
  }

  return (
    <div className="min-h-screen min-w-full">
      <div className="flex flex-col items-center m-auto">
        <h1>Are you sure you want to log out?</h1>
        <button className="btn" onClick={loggingOut}>
          Logout
        </button>
      </div>
    </div>
  )

}