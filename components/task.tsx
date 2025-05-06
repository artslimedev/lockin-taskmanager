import React, { useState } from "react";
import TaskStatus from "./taskStatus";
import Button from "./button";
import { createTask } from "@/server";
import type { Task } from "@/types";
// import Link from "next/link";

type Props = {
  task: Task;
  handleTask: () => void;
};

const Task = (props: Props) => {
  const { task } = props;
  const [editCard, setEditCard] = useState(false);
  const [formValues, setFormValues] = useState<Task>({
    title: "",
    description: "",
    status: "Open",
  });

  const handleTaskForm = () => {
    setEditCard(!editCard);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editCard) {
      console.log("editing form");
    }
    console.log("submitting form");
    if (formValues.title) {
      await createTask({
        title: formValues.title,
        description: formValues.description,
        status: formValues.status,
      });
    }
    setFormValues({
      title: "",
      description: "",
      status: "Open",
    });
    handleTaskForm();
    console.log("success");
  };

  return (
    <div
      className={`flex h-50 w-80 bg-blue-200 ${
        !editCard && "hover:bg-blue-400"
      } p-4 rounded-md`}
    >
      {/* <Link href="/task/:id"> */}
      {!editCard ? (
        <div className="flex flex-col w-full justify-between">
          <div className="flex w-full justify-between">
            <span className="mb-2 font-bold text-lg">{task.title}</span>
            <TaskStatus status={task.status} />
          </div>
          <p>{task.description}</p>
          <div>
            <Button name="Edit" onClick={handleTaskForm} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <h3 className="font-semibold mb-1">Edit</h3>
          <form
            id="cardForm"
            name="cardForm"
            className="flex flex-col gap-2 w-full justify-between h-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                value={formValues.title || task.title}
                onChange={handleChange}
                placeholder="Title"
                className="border rounded-sm p-1 text-[12px]"
              />
              <textarea
                placeholder="description"
                value={formValues.description || task.description}
                onChange={handleChange}
                className="border rounded-sm p-1 text-[12px]"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleTaskForm}
                className="px-4 py-2 bg-black hover:bg-gray-500 text-white rounded"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      )}
      {/* </Link> */}
    </div>
  );
};

export default Task;
