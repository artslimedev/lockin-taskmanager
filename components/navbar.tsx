"use client";
import React from "react";
import Button from "./button";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-white flex justify-between items-center py-2 px-4 h-12">
      <div>
        <p className="text-2xl font-bold">Slime Guild</p>
      </div>
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
