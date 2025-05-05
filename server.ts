import { supabase } from "./lib/supabase";

type Task = {
  id?: number;
  created_at?: string;
  title: string;
  description: string;
  updated_at?: string;
  userId?: string;
};

export const getTasks = async (): Promise<{
  data: Task[] | null;
  error: Error | null;
}> => {
  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    console.error("Error fetching tasks:", error);
    return { data: null, error };
  }

  console.log("Fetched tasks:", data);

  return { data, error: null };
};

export const createTask = async (task: Task) => {
  const { error } = await supabase.from("tasks").insert({
    title: task.title,
    description: task.description,
  });

  if (error) {
    console.error("Error creating task:", error);
    return { error };
  }
  console.log("Task created successfully");
};
