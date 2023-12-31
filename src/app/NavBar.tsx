"use client";

import Link from "next/link";
import useAuthStatus from "@/_redux/features/authHook";

export default function NavBar() {
  // AUTHHOOK CHECKS FOR SESSION AND UPDATES REDUX STATE
  const isAuthenticated = useAuthStatus();
  console.log("auth status: ", isAuthenticated);

  return (
    <div className="fixed w-screen dark:text-white">
      <h1 className="text-4xl text-center p-5 fixed hover:scale-105 transition duration-300 ease-in-out">
        <Link className="drop-shadow-md" href={"/"}>
          Timely
        </Link>
      </h1>
      <div className="flex justify-around items-center min-w-[30rem] w-1/4 gap-3 m-auto text-xl mt-6 sm:justify-between ">
        <Link
          className="hover:scale-110 transition duration-300 ease-in-out drop-shadow-md"
          href={"/home"}
        >
          Home
        </Link>
        <Link
          className="hover:scale-110 transition duration-300 ease-in-out drop-shadow-md"
          href={"/flashcards"}
        >
          Study
        </Link>
        <Link
          className="hover:scale-110 transition duration-300 ease-in-out drop-shadow-md"
          href={isAuthenticated ? "/logout" : "/login"}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </Link>
      </div>
    </div>
  );
}
