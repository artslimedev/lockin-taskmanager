"use client";
import Button from "@/components/button";
import TaskComponent from "@/components/task";
import TaskForm from "@/components/taskForm";
import { getTasks } from "@/server";
import { useState, useEffect } from "react";
import { Task } from "@/types";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [taskForm, setTaskForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleFetch = async () => {
    try {
      const { data, error } = await getTasks();
      if (error) {
        throw new Error(error.message);
      }
      setTasks(data as Task[]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskForm = () => {
    setTaskForm(!taskForm);
  };

  const handleTask = async () => {
    setIsEditing(!isEditing);
    await handleFetch(); // Refresh tasks after edit
  };

  // Fetch tasks on mount and when taskForm or isEditing changes
  useEffect(() => {
    handleFetch();
  }, [taskForm, isEditing]);

  return (
    <div className="flex flex-col h-full py-8 px-4">
      <h1 className="text-4xl mb-5">Dashboard</h1>
      <div className="flex gap-4 mb-10">
        {!taskForm && <Button onClick={handleFetch} name="Fetch Tasks" />}
        <Button
          onClick={handleTaskForm}
          name={!taskForm ? "Add Task" : "Cancel"}
        />
      </div>
      {!taskForm ? (
        <div className="w-full">
          <ul className="flex flex-wrap gap-4 justify-start">
            {tasks?.map((task) => (
              <li
                key={task.id}
                className="flex-[1_1_280px] min-w-[280px] max-w-[320px]"
              >
                <TaskComponent task={task} handleTask={handleTask} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <TaskForm formTitle="Add Task" handleTaskForm={handleTaskForm} />
      )}
    </div>
  );
};

export default Dashboard;
