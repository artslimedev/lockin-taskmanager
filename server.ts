import { supabase } from "./lib/supabase";

type Task = {
  id?: number;
  created_at?: string;
  title: string;
  description: string;
  status: string;
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

  return { data, error: null };
};

// export const getTask = async (
//   id: number | undefined
// ): Promise<{
//   data: Task | null;
//   error: Error | null;
// }> => {
//   const { data, error } = await supabase.from("tasks").select().eq("id", id);

//   if (error) {
//     console.error("Error fetching tasks:", error);
//     return { data: null, error };
//   }

//   console.log("Fetched tasks:", data);

//   return { data, error: null };
// };

export const createTask = async (task: Task) => {
  const { error } = await supabase.from("tasks").insert({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  if (error) {
    console.error("Error creating task:", error);
    return { error };
  }
  console.log("Task created successfully");
};

export const editTask = async (
  task: Task
): Promise<{
  data: Task | null;
  error: Error | null;
}> => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        title: task.title,
        description: task.description,
        status: task.status,
      })
      .eq("id", task.id)
      .select()
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    return { data, error: null };
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Unknown error occurred");
    return { data: null, error };
  }
};
