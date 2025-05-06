import React, { useState } from "react";
import TaskStatus from "./taskStatus";
import Button from "./button";
import { editTask } from "@/server";
import type { Task } from "@/types";
import CardForm from "./cardForm";

type Props = {
  task: Task;
  handleTask: () => void;
};

const Task = ({ task, handleTask }: Props) => {
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

  return (
    <div
      className={`flex h-50 w-full grow bg-blue-200 ${
        !editCard && "hover:bg-blue-400"
      } p-4 rounded-md`}
    >
      {!editCard ? (
        <div className="flex flex-col w-full justify-between">
          <div className="flex w-full justify-between">
            <span className="mb-2 font-bold text-lg">{editedTask.title}</span>
            <TaskStatus status={editedTask.status} />
          </div>
          <p>{editedTask.description}</p>
          <Button
            name="Edit"
            onClick={toggleEdit}
            className="px-2 py-2 min-w-[72px] w-1/4 bg-blue-500 hover:bg-blue-600 text-white rounded"
          />
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
