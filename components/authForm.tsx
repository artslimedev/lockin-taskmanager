import React, { useState } from "react";
import { signUpNewUser } from "@/server";
import { redirect } from "next/navigation";

const AuthForm = () => {
  const [signUp, setSignUp] = useState(false);
  const [authVal, setAuthVals] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setAuthVals((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignUp = async () => {
    const res = await signUpNewUser(authVal.email, authVal.password);

    // await redirect("/dashboard");

    console.log(res);
  };

  return (
    <div>
      {!signUp && (
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            className=" w-full h-10 bg-gray-300 rounded p-2"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Password"
            className=" w-full h-10 bg-gray-300 rounded p-2"
            onChange={handleChange}
          />
          <div className="flex gap-4 w-full mt-2 ">
            <button
              type="button"
              className="bg-indigo-900 hover:bg-indigo-400 text-white w-1/2 rounded-md py-2"
            >
              Login
            </button>
            <button
              type="button"
              className="bg-indigo-900 hover:bg-indigo-400 text-white w-1/2 rounded-md py-2"
              onClick={() => setSignUp(!signUp)}
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
      {signUp && (
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Email"
            className=" w-full h-10 bg-gray-300 rounded p-2"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Password"
            className=" w-full h-10 bg-gray-300 rounded p-2"
            onChange={handleChange}
          />
          <div className="flex gap-4 w-full mt-2 ">
            <button
              type="submit"
              className="bg-indigo-900 hover:bg-indigo-400 text-white w-1/2 rounded-md py-2"
            >
              Sign Up
            </button>
            <button
              type="button"
              className="bg-indigo-900 hover:bg-indigo-400 text-white w-1/2 rounded-md py-2"
              onClick={() => {
                setSignUp(!signUp);
              }}
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthForm;
