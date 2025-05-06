import React from "react";
import { Status } from "@/types";

type Props = {
  status: Status;
};

const TaskStatus = (props: Props) => {
  const { status } = props;

  const statusStyle =
    status === "Open"
      ? "bg-red-700 text-white"
      : status === "In Progress"
      ? "bg-fuchsia-700 text-white"
      : "bg-green-600 text-white";
  return (
    <span
      className={`inline-flex items-center min-w-[70px] justify-center gap-1 h-fit rounded-full border-transparent px-2 py-[2px] text-[10px] font-medium border  ${statusStyle} `}
    >
      {status}
    </span>
  );
};

export default TaskStatus;
