import React, { useState } from "react";
import TaskStatus from "./taskStatus";
import Button from "./button";
import { deleteTask, editTask } from "@/server";
import type { Task } from "@/types";
import CardForm from "./cardForm";

type Props = {
  task: Task;
  handleTask: () => void;
  handleFetch: () => void;
};

const Task = ({ task, handleTask, handleFetch }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editCard, setEditCard] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const toggleEdit = () => setEditCard((prev) => !prev);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const isTaskChanged = (a: Task, b: Task) =>
    a.title !== b.title ||
    a.description !== b.description ||
    a.status !== b.status;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isTaskChanged(editedTask, task)) {
      try {
        const { data, error } = await editTask({
          ...task,
          ...editedTask,
        });

        if (error) {
          console.error("Error updating task:", error.message);
          return;
        }

        if (data) {
          setEditedTask(data as Task);
          setEditCard(false);
          handleTask();
        }
      } catch (error) {
        console.error(
          "Error occurred while updating task:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    } else {
      console.log("No changes detected, task not updated.");
      setEditCard(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(!isLoading);
      const res = await deleteTask(task.id);
      setIsLoading(!isLoading);
      if (!res.error) {
        await handleFetch();
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex h-48 w-full bg-[#efe6fd] ${
        !editCard && "hover:bg-white"
      } p-2 rounded-md`}
    >
      {!editCard ? (
        <div className="flex flex-col gap-y-2 w-full p-0.5 ">
          <div className="flex w-full justify-between">
            <span className="font-bold text-lg truncate max-w-[70%]">
              {editedTask.title}
            </span>
            <TaskStatus status={editedTask.status} />
          </div>
          <p className="overflow-y-auto max-h-24 break-words text-sm">
            {editedTask.description}
          </p>
          <div className="flex w-full gap-x-1.5 mt-auto">
            <Button
              name="Edit"
              onClick={toggleEdit}
              className="flex justify-center items-center px-2 py-0.5 min-w-[48px] w-[25%] bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
            />
            <Button
              name="Delete"
              onClick={handleDelete}
              className="flex justify-center items-center px-2 py-0.5 min-w-[48px] w-[25%] bg-red-700 hover:bg-red-800 text-white rounded-lg text-sm"
              loading={isLoading}
            />
          </div>
        </div>
      ) : (
        <CardForm
          editedTask={editedTask}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          toggleEdit={toggleEdit}
        />
      )}
    </div>
  );
};

export default Task;
