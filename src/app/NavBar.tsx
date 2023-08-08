import Link from "next/link";

export const NavBar = () => {



  return (
    <div className="min-h-[30vh]">
      <h1 className="text-4xl text-center p-5">
        Topic Tracker
      </h1>
      <div className="flex justify-around items-center w-1/3 m-auto">
        <Link href={'/home'}>Home</Link>
        <Link href={'/signup'}>Sign Up</Link>
      </div>
    </div>
  )
}