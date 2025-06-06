"use client";
import { loginWithPass, signupWithPass } from "@/lib/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  signupEmail?: string;
  signupPassword?: string;
  confirmPassword?: string;
  loginEmail?: string;
  loginPassword?: string;
};

type Props = {
  id: string;
};

const AuthForm = (props: Props) => {
  const { id } = props;
  const router = useRouter();
  const [signUp, setSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setIsSubmitting(true);
      const { user, session } = await signupWithPass(
        signupEmail ?? "",
        signupPassword ?? ""
      );

      if (user && session) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onLogin: SubmitHandler<FormValues> = async (form) => {
    const { loginEmail, loginPassword } = form;
    try {
      setIsSubmitting(true);

      if (!loginEmail || !loginPassword) {
        throw new Error("Email and password are required");
      }

      const response = await loginWithPass(loginEmail, loginPassword);

      if (!response || !response.user || !response.session) {
        throw new Error("Invalid login response");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-4" data-testid={id}>
      <h2 className="text-2xl font-bold" data-testid="form-heading">
        {signUp ? "Sign Up" : "Login"}
      </h2>
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
              data-testid="submit-login"
              disabled={isSubmitting}
              className="bg-indigo-900 hover:bg-indigo-400 text-white w-1/2 rounded-md py-2"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              data-testid="toggle-signup"
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
              disabled={isSubmitting}
              data-testid="submit-signup"
              className="bg-indigo-900 hover:bg-indigo-400 text-white w-1/2 rounded-md py-2"
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
            <button
              type="button"
              data-testid="toggle-login"
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
      {error && (
        <div className="text-red-500 text-sm mt-2" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default AuthForm;
