"use client";

import Link from "next/link";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import Cookies from "js-cookie";
//

// start of the component login :
const Login = () => {
  // the state of the showPass toggle :
  const [showPass, setShowPass] = useState(false);

  const route = useRouter();

  //
  const [passwordVal, setPassword] = useState();
  const [emailVal, setEmail] = useState();

  const [cheakVal, setCheak] = useState(false);

  // const [userObject, setUserObject] = useState();
  const handleOnSubmit = async (e) => {
    //
    e.preventDefault();

    //

    // if (emailVal == "brahim" && passwordVal == "123") {
    //
    // setAutorize(true);
    const userObject = { email: emailVal, password: passwordVal };
    Cookies.set("tokenVal", JSON.stringify(userObject), { expires: 1 }); // Cookie expires in 1 day
    // Redirect to dashboard or perform other actions

    const response = await fetch("/api/cheakCookies");

    const result = await response.json();

    //

    console.log(
      "HHHHHH , this is the return value of cheakCookies route : ",
      result
    );

    if (result.cheak) {
      //
      const cheak = result.cheak;
      Cookies.set("cheak", cheak, { expires: 1 }); // Cookie expires in 1 day

      setCheak(true);

      //
    }

    //
    // }

    //
  };

  //
  const router = useRouter();

  useEffect(() => {
    console.log("this is the value of cheakValue : ", cheakVal);
    //

    cheakVal ? window.location.reload() : "";
    router.push("/admin");
  }, [cheakVal]);
  // the return of the component Login :
  return (
    <div className=" min-h-90vh w-100% bg-green-300 p-3  ">
      {" "}
      <form
        action=""
        className=" flex flex-col space-y-10 w-30%   border border-black"
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
      >
        {/* this div for email  */}
        <div className="flex justify-between w-90% px-3">
          <label htmlFor="email"> Email : </label>
          <input
            type="text"
            name="email"
            className=" h-8 px-2"
            placeholder=" exemple@gmail.com"
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
        </div>
        {/* this div for password  */}
        <div className="flex justify-between w-90% px-3 mb-10">
          <label htmlFor="password"> Password :</label>
          <input
            type={showPass ? "text" : "password"}
            placeholder="password"
            name="password"
            className=" h-8 px-2"
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </div>
        {/* submit input */}
        <button
          type="submit"
          className=" bg-yellow-300 w-52 flex justify-center h-10 items-center m-auto  "
          onClick={() => {
            // the function cheak the values of the input of email and the input of the passkey and base on the value change the value of the session :
            // cheakValueInput();
          }}
        >
          {" "}
          Login
        </button>
      </form>
      <div className="providersGoogleGithub flex flex-col space-y-4 mt-3">
        {/* option of login with email google account */}
        <button className=" singIn_google h-10 w-10% bg-blue-300">
          Sing In using GOOGLE
        </button>
        {/* option of login with github account   */}
        <button className=" singIn_github h-10 w-10% bg-blue-300">
          Sing In using Github
        </button>
      </div>
      {/* case you don't have account and you want to create account : (re-direct to register page )  */}
      <button className="">
        {" "}
        you don't have account ?{" "}
        <Link href="/register" className=" text-blue-500 ">
          {" "}
          Sing Up{" "}
        </Link>{" "}
      </button>
    </div>
  );
};

export default Login;
