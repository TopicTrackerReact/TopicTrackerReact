import Link from "next/link";

export const NavBar = () => {



  return (
    <div className="min-h-[20vh]">
      <h1 className="text-4xl text-center p-5">
        Topic Tracker
      </h1>
      <div className="flex justify-around items-center w-1/3 m-auto">
        <Link className="btn" href={'/home'}>Home</Link>
        <Link className="btn" href={'/signup'}>Sign Up</Link>
        <Link className="btn" href={'/login'}>Login</Link>
        <Link className="btn" href={'/logout'}>Logout</Link>
      </div>
    </div>
  )
}