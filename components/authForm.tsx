"use client";
import { signup, login } from "@/app/action";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

type FormValues = {
  signupEmail?: string;
  signupPassword?: string;
  confirmPassword?: string;
  loginEmail?: string;
  loginPassword?: string;
};

const AuthForm = () => {
  const router = useRouter();
  const [signUp, setSignUp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      signupEmail: "",
      signupPassword: "",
      confirmPassword: "",
      loginEmail: "",
      loginPassword: "",
    },
    mode: "onChange",
    shouldUnregister: true,
  });

  const onSignUp: SubmitHandler<FormValues> = async (form) => {
    const { signupEmail, signupPassword } = form;
    try {
      const { user, session } = await signup({
        email: signupEmail ?? "",
        password: signupPassword ?? "",
      });
      await new Promise((resolve) => setTimeout(resolve, 200));
      router.refresh();
    } catch (error) {
      console.log("onSubmit error:", error);
    }
  };

  const onLogin: SubmitHandler<FormValues> = async (form) => {
    const { loginEmail, loginPassword } = form;
    try {
      await login({
        email: loginEmail ?? "",
        password: loginPassword ?? "",
      });
      await new Promise((resolve) => setTimeout(resolve, 200));
      router.refresh();
    } catch (error) {
      console.log("onSubmit error:", error);
    }
  };

  return (
    <div>
      {!signUp && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onLogin)}>
          <div>
            <input
              {...register("loginEmail", { required: "This is required." })}
              type="text"
              placeholder="Email"
              className=" w-full h-10 bg-gray-300 rounded p-2"
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
              type="password"
              placeholder="Password"
              className=" w-full h-10 bg-gray-300 rounded p-2"
              autoComplete="current-password"
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSignUp)}>
          <div>
            <input
              {...register("signupEmail", { required: "This is required." })}
              type="text"
              placeholder="Email"
              className=" w-full h-10 bg-gray-300 rounded p-2"
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
              type="password"
              placeholder="Password"
              className=" w-full h-10 bg-gray-300 rounded p-2"
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
                validate: (value) =>
                  value === getValues().signupPassword ||
                  "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm Password"
              className=" w-full h-10 bg-gray-300 rounded p-2"
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
