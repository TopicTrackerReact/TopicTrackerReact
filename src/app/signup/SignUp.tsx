"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "@/_redux/features/authSlice";
import { emailValidator } from "./email";

export const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  interface Ref {
    current:
      | {
          value: any;
        }
      | string;
  }
  const emailRef = useRef("");
  const firstRef = useRef("");
  const lastRef = useRef("");
  const passRef = useRef("");

  const handleSignUp = async () => {
    const email: string = emailRef.current.value;
    const firstName: string = firstRef.current.value;
    const lastName: string = lastRef.current.value;
    const password: string = passRef.current.value;

    const status = emailValidator(email);
    if (!status) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
      return;
    }

    const signUpResponse = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const { response } = await signUpResponse.json();
    console.log(response);
    if (response === "Email Already Exists") {
      window.alert(response);
    } else if (response === "Sign Up Successful") {
      router.push("/home");
      dispatch(login(email));
    }
  };
  return (
    <div className="flex flex-col bg-zinc-100 dark:bg-zinc-700 dark:text-white justify-around p-12 drop-shadow-xl rounded-lg mt-[6rem]">
      <h1 className="self-center text-lg">Get Started</h1>
      <label>Email</label>
      <input
        required={true}
        ref={emailRef}
        type="email"
        className="input h-8 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200"
      />
      <div className="flex justify-between my-3">
        <span className="flex flex-col">
          <label>First Name</label>
          <input
            required={true}
            ref={firstRef}
            className="input h-8 mr-2 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200"
          />
        </span>
        <span className="flex flex-col">
          <label>Last Name </label>
          <input
            required={true}
            ref={lastRef}
            className="input h-8 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200"
          />
        </span>
      </div>
      <label>Password</label>
      <input
        required={true}
        type="password"
        ref={passRef}
        className="input h-8 bg-zinc-300 hover:bg-gray-300 hover:scale-105 hover:transition duration-200 drop-shadow focus:outline-none focus:bg-gray-300 focus:scale-105 focus:transition duration-200"
      />
      <button
        className="btn bg-gray-300 hover:bg-gray-400 mt-8"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
      <h1 className="my-5 self-center">
        Already have an account?{" "}
        <Link
          className="hover:underline text-blue-600 dark:text-blue-300"
          href={"/login"}
        >
          Log In
        </Link>
      </h1>
      {visible ? (
        <p id="error-tag" className="text-red-500 text-center mb-6">
          Invalid Email
        </p>
      ) : null}
    </div>
  );
};
