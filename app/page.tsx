"use client";
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
            <div className="flex flex-col gap-y-4 pt-4">
              <p className="text-5xl md:text-4xl text-white w-full font-medium  font-serif">
                Your Goals Won’t Wait.
              </p>
              <p className="hidden sm:flex text-lg text-white font-medium font-serif">
                Keep track of projects and daily tasks
              </p>
            </div>
          </div>
          <div className="h-full w-full bg-white p-4 pt-8 md:p-12 md:pt-8 rounded-t-2xl">
            <AuthForm id="auth-form" />
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
