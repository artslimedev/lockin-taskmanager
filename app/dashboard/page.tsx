"use client";
import Button from "@/components/button";
import TaskComponent from "@/components/task";
import TaskForm from "@/components/taskForm";
import { getTasks } from "@/server";
import { useState, useEffect } from "react";
import { Task } from "@/types";

const statusOrder = {
  Open: 0,
  "In Progress": 1,
  Completed: 2,
};

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
    await handleFetch();
  };

  useEffect(() => {
    handleFetch();
  }, [taskForm, isEditing]);

  return (
    <div className="flex flex-col h-full py-8 px-2 sm:px-4">
      <h1 className="text-4xl mb-5">Dashboard</h1>
      <div className="flex gap-4 mb-10">
        {!taskForm && <Button onClick={handleFetch} name="Fetch Tasks" />}
        <Button
          onClick={handleTaskForm}
          name={!taskForm ? "Add Task" : "Cancel"}
        />
      </div>
      {!taskForm ? (
        <div className="w-full h-dvh">
          {!tasks || tasks.length === 0 ? (
            <div className="flex justify-center items-center h-full rounded-md">
              <p className="text-gray-500 text-4xl font-bold">
                No tasks available. Create one!
              </p>
            </div>
          ) : (
            <ul className="flex flex-wrap gap-2 sm:gap-4 justify-start w-full">
              {[...tasks]
                .sort((a, b) => {
                  const statusDiff =
                    statusOrder[a.status as keyof typeof statusOrder] -
                    statusOrder[b.status as keyof typeof statusOrder];

                  return (
                    statusDiff ||
                    b.created_at?.localeCompare(a.created_at || "") ||
                    0
                  );
                })
                .map((task) => (
                  <li
                    key={task.id}
                    className="w-[calc(100%-1rem)] sm:w-auto sm:flex-[1_1_288px] sm:min-w-[288px] sm:max-w-[320px]"
                  >
                    <TaskComponent task={task} handleTask={handleTask} />
                  </li>
                ))}
            </ul>
          )}
        </div>
      ) : (
        <TaskForm formTitle="Add Task" handleTaskForm={handleTaskForm} />
      )}
    </div>
  );
};

export default Dashboard;
