"use client";
import Button from "@/components/button";
import Task from "@/components/task";
import TaskForm from "@/components/taskForm";
import { getTasks } from "@/server";
import { useState, useEffect } from "react";

interface Task {
  id?: number;
  title: string;
  description: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [taskForm, setTaskForm] = useState(false);

  const handleFetch = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskForm = () => {
    console.log("this is running");
    setTaskForm(!taskForm);
  };

  useEffect(() => {
    handleFetch();
  }, [taskForm]);

  return (
    <div className="flex flex-col h-full p-8">
      <h1 className="text-4xl mb-5">Dashboard</h1>
      <div className="flex gap-4 mb-20">
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
                  <Task task={task as Task} />
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
