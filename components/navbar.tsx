"use client";
import React, { useContext } from "react";
import { createClient } from "@/utils/supabase/client";
import Button from "./button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/UserContext";
import Avatar from "./Avatar";

const Navbar = () => {
  const { currentUser, currentSession, loading, error } = useAuthContext();
  const supabase = createClient();
  const router = useRouter();

  console.log(currentSession);

  const handleLogOut = async () => {
    console.log("Trying to logout...");
    const data = await supabase.auth.signOut();
    await new Promise((resolve) => setTimeout(resolve, 200));
    router.refresh();
    console.log("Unable to logout:", data);
  };

  return (
    <div className="sticky top-0 z-50 bg-white flex justify-between items-center py-2 px-4 h-12 w-full">
      <div>
        <Link href={"/"}>
          <p className="text-2xl font-bold">
            <span className="font-normal font-mono">LOCK</span>IN
          </p>
        </Link>
      </div>
      {currentSession ? (
        <div className="flex justify-center items-center gap-4">
          <Avatar />
          <button
            onClick={handleLogOut}
            type="button"
            className="bg-red-800 hover:bg-red-600 text-white text-xs px-1.5 py-1.5 rounded-md"
          >
            Logout
          </button>
        </div>
      ) : null}
      {/* <div className="flex gap-2 text-white">
        <Button
          onClick={() => console.log("login")}
          name={"Login"}
          className="bg-indigo-900 px-2 py-0.5 rounded-md"
        />
        <Button
          onClick={() => console.log("signup")}
          name={"Signup"}
          className="bg-indigo-900 p-2 rounded-md"
        />
      </div> */}
    </div>
  );
};

export default Navbar;
