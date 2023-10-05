"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/_redux/features/authSlice";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const email = useRef("");
  const password = useRef("");

  const loggingIn = async () => {
    const newEmail = email.current.value;

    const fetchResponse = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newEmail,
        password: password.current.value,
      }),
    });
    const { msg } = await fetchResponse.json();

    console.log(msg);

    if (msg === "Successful Login!") {
      dispatch(login(newEmail));
      router.push("/home");
    } else if (msg === "Incorrect Password") alert("Wrong Password");
    else alert("Email does not exist");
  };

  return (
    <div className="flex items-center justify-around min-h-[70vh] dark:text-white">
      <div className="flex flex-col bg-zinc-100 dark:bg-zinc-700 p-12 gap-2 drop-shadow-xl m-auto rounded-lg mt-[12rem]">
        <h1 className="self-center text-lg">Log In</h1>
        <section className="flex flex-col">
          <label>Email</label>
          <input
            required={true}
            type="email"
            ref={email}
            className="input h-8 bg-zinc-300 dark:bg-zinc-500 hover:bg-zinc-400 dark:hover:bg-zinc-400 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-zinc-300 dark:focus:bg-zinc-500 focus:scale-105 focus:transition duration-200"
          />
        </section>
        <section className="flex flex-col">
          <label>Password</label>
          <input
            required={true}
            ref={password}
            type="password"
            className="input h-8 bg-zinc-300 dark:bg-zinc-500 hover:bg-zinc-400 dark:hover:bg-zinc-400 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-zinc-300 dark:focus:bg-zinc-500 focus:scale-105 focus:transition duration-200"
          />
        </section>
        <button
          className="btn bg-zinc-300 dark:bg-zinc-500 hover:bg-zinc-400 dark:hover:bg-zinc-400 dark:text-white mt-8 border-none"
          onClick={loggingIn}
        >
          Sign In
        </button>
        <h1 className="my-5 text-center">
          No account?{" "}
          <Link
            className="hover:underline text-blue-600 dark:text-blue-300"
            href={"/signup"}
          >
            Sign Up
          </Link>
        </h1>
      </div>
    </div>
  );
}
