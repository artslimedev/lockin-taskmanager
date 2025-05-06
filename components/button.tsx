"use client";
import React from "react";

type Props = {
  onClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  name: string;
  className?: string;
};

const Button = ({ onClick, type, name, className }: Props) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      type={type || "button"}
      onClick={handleClick}
      className={`${
        className ||
        "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      }`}
    >
      {name}
    </button>
  );
};

export default Button;
