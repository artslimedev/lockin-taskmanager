import React from "react";

type Props = {
  task: {
    id?: number;
    title: string;
    description: string;
  };
};

const Task = (props: Props) => {
  const { task } = props;
  return (
    <div className="flex flex-col h-50 w-80 bg-indigo-400 p-4 rounded-md">
      <h3 className="mb-2 font-bold text-lg">{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
