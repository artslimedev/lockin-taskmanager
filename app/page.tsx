"use client";
import Image from "next/image";
import hero from "../public/hero.jpg";
import AuthForm from "@/components/authForm";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center bg-white w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${hero.src})` }}
    >
      <div className="flex items-center w-full h-full justify-end">
        <div className="flex flex-col  w-full md:min-w-[480px] md:w-1/3 h-full gap-8 bg-indigo-900 md:px-8  pt-4">
          <div className="flex flex-col gap-4 px-4 md:p-0 pt-8">
            <h2 className="text-5xl md:text-5xl text-white w-full font-bold font-serif">
              Welcome to the Guild
            </h2>
            <p className="hidden sm:flex text-lg text-white font-medium font-serif">
              Keep track of projects and daily tasks
            </p>
          </div>
          <div className="h-full w-full bg-white p-4 pt-8 md:p-12 rounded-t-2xl">
            {/* <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Email"
                className="border w-full h-10 bg-gray-100 rounded p-2"
              />
              <input
                type="text"
                placeholder="Password"
                className="border w-full h-10 bg-gray-100 rounded p-2"
              />
              <div className="flex gap-4 w-full ">
                <button
                  type="button"
                  className="bg-gray-100 hover:bg-indigo-400 text-black w-1/2 rounded py-2"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="bg-gray-100 hover:bg-indigo-400 text-black w-1/2 rounded py-2"
                >
                  Signup
                </button>
              </div>
            </form> */}
            <AuthForm />
            <div className="flex w-full flex-1/3 gap-x-1.5 items-center mt-8">
              <div className="bg-black h-0.5 w-full"></div>
              <span>Or</span>
              <div className="bg-black h-0.5 w-full"></div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
