//

//
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

// Start of the component login:
const Login = () => {
  // State for toggling password visibility
  const [showPass, setShowPass] = useState(false);

  // the states of email and password :
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  // this is the route variable :
  const route = useRouter();

  useEffect(() => {
    //
    console.log(
      "this is the value of password  : ",
      password,
      "and this is the value of email : ",
      email
    );

    //
  }, [password, email]);

  // this is the funtion of handle the click button :
  const handleClickButton = () => {
    //
    console.log("hello from the click button ");

    // outside the cheak username and the password :

    console.log("this is the value of Cookies  : ", Cookies.get("userObject"));

    if (email == "brahim" && password == "123") {
      console.log("&&&&&&&&&&&& this is the correct code ");
      const userObject = JSON.stringify({ email, password });

      Cookies.set("userObject", userObject);

      // console.log("this is the stringy object : ", userObject);
      // localStorage.setItem("userObject", userObject);
      route.push("/admin");

      console.log(
        "this is the value of Cookies  : ",
        JSON.parse(Cookies.get("userObject"))
      );
    }
  };

  return (
    <div className="min-h-90vh w-100% bg-green-300 p-3">
      <form
        className="flex flex-col space-y-10 w-30% border border-black"
        onSubmit={(e) => {
          //
          e.preventDefault();
          //
        }}
      >
        {/* Email input */}
        <div className="flex justify-between w-90% px-3">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            className="h-8 px-2"
            placeholder="exemple@gmail.com"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        {/* Password input */}
        <div className="flex justify-between w-90% px-3 mb-10">
          <label htmlFor="password">Password:</label>
          <input
            type={showPass ? "text" : "password"}
            placeholder="password"
            name="password"
            className="h-8 px-2"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="bg-yellow-300 w-52 flex justify-center h-10 items-center m-auto"
          onClick={handleClickButton}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
