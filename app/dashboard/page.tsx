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
      const res = await getTasks();
      setTasks(res.data as Task[]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskForm = () => {
    console.log("this is running");
    setTaskForm(!taskForm);
  };

  const handleTask = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    handleFetch();
  }, [taskForm]);

  return (
    <div className="flex flex-col h-full p-8">
      <h1 className="text-4xl mb-5">Dashboard</h1>
      <div className="flex gap-4 mb-10">
        {!taskForm && <Button onClick={handleFetch} name="Fetch Tasks" />}
        <Button
          onClick={() => setTaskForm(!taskForm)}
          name={!taskForm ? "Add Task" : "Cancel"}
        />
      </div>
      {!taskForm ? (
        <div className="w-full items-center">
          <ul className="flex gap-4 flex-wrap">
            {tasks?.map((task: Task) => {
              return (
                <li key={task.id}>
                  <TaskComponent task={task as Task} handleTask={handleTask} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <TaskForm formTitle="Add Task" handleTaskForm={handleTaskForm} />
      )}
    </div>
  );
};

export default Dashboard;
