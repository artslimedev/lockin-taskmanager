"use client";
import { useState, useEffect } from "react";
import { getSupabaseClient } from "@/lib/supabase"; // Your updated supabase client import
import Button from "@/components/button"; // Button component
import TaskComponent from "@/components/task"; // Task component
import { Task } from "@/types"; // Task type
import TaskForm from "@/components/taskForm";

const statusOrder = {
  Open: 0,
  "In Progress": 1,
  Closed: 2,
};

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [taskForm, setTaskForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchTasks = async () => {
    try {
      const supabase = getSupabaseClient(); // Get the Supabase client

      // Check if supabase is initialized on the client side
      if (!supabase) {
        console.error("Supabase client is not initialized!");
        return;
      }

      const { data, error } = await supabase.from("tasks").select("*"); // Fetch tasks

      if (error) {
        console.error("Error fetching tasks:", error);
        return;
      }

      setTasks(data as Task[]); // Set tasks state with the fetched data
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskForm = () => {
    setTaskForm(!taskForm);
  };

  const handleTask = async () => {
    setIsEditing(!isEditing);
    await fetchTasks(); // Refetch tasks after editing
  };

  useEffect(() => {
    fetchTasks(); // Call fetchTasks on component mount
  }, [taskForm, isEditing]); // Dependency array includes taskForm and isEditing

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] py-4 px-2 sm:px-4 min-w-[280px] bg-indigo-900">
      <h1 className="text-4xl mb-5 text-white">Dashboard</h1>
      <div className="flex gap-4 mb-10">
        {!taskForm && (
          <Button
            onClick={fetchTasks} // Button to refetch tasks
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
                      handleFetch={fetchTasks} // Pass fetchTasks to child components
                    />
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
