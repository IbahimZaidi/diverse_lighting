"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

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

  // the ref value :
  const emailValRef = useRef();

  // the ref value  :
  const passValRef = useRef();

  //

  // handlOnSubmit :
  const handleOnSubmit = async (e) => {
    //
    e.preventDefault();

    //

    console.log(
      "this is the value of emailVa and passwrodVal",
      emailVal,
      passwordVal
    );
    if (emailVal == "brahim" && passwordVal == "123") {
      //
      // setAutorize(true);
      const userObject = { email: emailVal, password: passwordVal };
      Cookies.set("userObject", JSON.stringify(userObject), { expires: 1 }); // Cookie expires in 1 day
      // Redirect to dashboard or perform other actions
      route.push("/admin");
    }

    //
  };
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
            ref={emailValRef}
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
            ref={passValRef}
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
    </div>
  );
};

export default Login;
