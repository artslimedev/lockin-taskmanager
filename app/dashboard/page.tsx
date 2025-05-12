"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Button from "@/components/button";
import TaskComponent from "@/components/task";
import { Task } from "@/types";
import TaskForm from "@/components/taskForm";
import { User } from "@supabase/supabase-js";

const statusOrder = {
  Open: 0,
  "In Progress": 1,
  Closed: 2,
};

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [taskForm, setTaskForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  console.log(userInfo);

  const fetchTasks = async () => {
    try {
      const supabase = await createClient();

      if (!supabase) {
        console.error("Supabase client is not initialized!");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");
      const { id } = user;

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("userId", id);

      if (error) {
        console.error("Error fetching tasks:", error);
        return;
      }
      setUserInfo(user);
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
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [taskForm, isEditing]);

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] py-4 px-2 sm:px-4 min-w-[280px] bg-indigo-900">
      <h1 className="text-4xl mb-5 text-white">Dashboard</h1>
      <div className="flex gap-4 mb-10">
        {!taskForm && (
          <Button
            onClick={fetchTasks}
            name="Fetch Tasks"
            className="bg-[#efe6fd] hover:bg-white px-4 py-2 rounded font-bold"
          />
        )}
        <Button
          onClick={handleTaskForm}
          name={!taskForm ? "Add Task" : "Cancel"}
          className="bg-[#efe6fd] hover:bg-white px-4 py-2 rounded font-bold"
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

                  if (statusDiff === 0) {
                    return (b.updated_at || "").localeCompare(
                      a.updated_at || ""
                    );
                  }

                  return statusDiff;
                })
                .map((task) => (
                  <li
                    key={task.id}
                    className="w-full sm:w-auto sm:flex-[1_1_288px] min-w-[255px] sm:min-w-[288px] sm:max-w-[320px]"
                  >
                    <TaskComponent
                      task={task}
                      handleTask={handleTask}
                      handleFetch={fetchTasks}
                    />
                  </li>
                ))}
            </ul>
          )}
        </div>
      ) : userInfo ? (
        <TaskForm
          formTitle="Add Task"
          handleTaskForm={handleTaskForm}
          userInfo={userInfo}
        />
      ) : null}
    </div>
  );
};

export default Dashboard;
