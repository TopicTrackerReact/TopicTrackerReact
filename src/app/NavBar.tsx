'use client'

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/_redux/store/store";


export default function NavBar() {

  // const cookie = cookies().get('tta-session');
  // console.log('cookie: ', cookie);
  // revalidatePath('/:')

  const user = useSelector((state: RootState) => state.auth.userId);
  console.log(user);

  return (
    <div className="min-h-[20vh]">
      <h1 className="text-4xl text-center p-5">
        Topic Tracker
      </h1>
      <div className="flex justify-around items-center w-1/4 gap-3 m-auto">
        <Link className="btn" href={'/home'}>Home</Link>
        <Link className="btn" href={'/flashcards'}>Study</Link>
        {/* {cookie ? (
          < Link className="btn" href={'/logout'}>Logout</Link>
        ) : (
          <Link className="btn" href={'/login'}>Login</Link>
        )} */}
        <Link className="btn" href={user ? '/logout' : '/login'}>{user ? 'Logout' : 'Login'}</Link>
      </div>
    </div >
  )
}