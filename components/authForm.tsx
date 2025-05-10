import React, { useState } from "react";
import { signUpNewUser } from "@/server";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

const AuthForm = () => {
  const [signUp, setSignUp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      signupEmail: "",
      signupPassword: "",
      confirmPassword: "",
      loginEmail: "",
      loginPassword: "",
    },
    mode: "onChange",
  });
  const [authVal, setAuthVals] = useState({
    email: "",
    password: "",
  });

  console.log(errors);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setAuthVals((prevState) => ({ ...prevState, [name]: value }));
  };

  // const handleSignUp = async () => {
  //   const res = await signUpNewUser(authVal.email, authVal.password);

  //   await redirect("/dashboard");

  //   console.log(res);
  // };

  return (
    <div>
      {!signUp && (
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div>
            <input
              {...register("loginEmail", { required: "This is required." })}
              type="text"
              placeholder="Email"
              className=" w-full h-10 bg-gray-300 rounded p-2"
              onChange={handleChange}
            />
            <p className="text-red-600 font-light text-[12px] mt-1">
              {errors.loginEmail && errors.loginEmail?.message}
            </p>
          </div>
          <div>
            <input
              {...register("loginPassword", {
                required: "This is required.",
                minLength: {
                  value: 6,
                  message: "Min length is 6",
                },
              })}
              type="text"
              placeholder="Password"
              className=" w-full h-10 bg-gray-300 rounded p-2"
              onChange={handleChange}
            />
            <p className="text-red-600 font-light text-[12px] mt-1">
              {errors.loginPassword && errors.loginPassword?.message}
            </p>
          </div>
          <div className="flex gap-4 w-full mt-2 ">
            <button
              type="submit"
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
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div>
            <input
              {...register("signupEmail", { required: "This is required." })}
              type="text"
              placeholder="Email"
              className=" w-full h-10 bg-gray-300 rounded p-2"
              onChange={handleChange}
            />
            <p className="text-red-600 font-light text-[12px] mt-1">
              {errors.signupEmail && errors.signupEmail?.message}
            </p>
          </div>
          <div>
            <input
              {...register("signupPassword", {
                required: "This is required.",
                minLength: {
                  value: 6,
                  message: "Min length is 6",
                },
              })}
              type="text"
              placeholder="Password"
              className=" w-full h-10 bg-gray-300 rounded p-2"
              onChange={handleChange}
            />
            <p className="text-red-600 font-light text-[12px] mt-1">
              {errors.signupPassword && errors.signupPassword?.message}
            </p>
          </div>
          <div>
            <input
              {...register("confirmPassword", {
                required: "This is required",
                minLength: {
                  value: 6,
                  message: "Min length is 6",
                },
              })}
              type="text"
              placeholder="Confirm Password"
              className=" w-full h-10 bg-gray-300 rounded p-2"
              onChange={handleChange}
            />
            <p className="text-red-600 font-light text-[12px] mt-1">
              {errors.confirmPassword && errors.confirmPassword?.message}
            </p>
          </div>
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
