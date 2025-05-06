"use client";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  onClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  name: string;
  className?: string;
  loading?: boolean;
};

const Button = ({ onClick, type, name, className, loading }: Props) => {
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
      {loading ? (
        <AiOutlineLoading className="animate-spin text-amber-50" />
      ) : (
        name
      )}
    </button>
  );
};

export default Button;
