import { createClient } from "./utils/supabase/client";

type Task = {
  id?: number;
  created_at?: string;
  title: string;
  description: string;
  status: string;
  updated_at?: string;
  userId?: string;
};

export async function signUpNewUser(userEmail: string, pw: string) {
  const supabase = await createClient();

  if (!supabase) {
    throw new Error("Failed to initialize Supabase client");
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: pw,
    });
    console.log("signup new user server.ts data", data);
    console.log("signup new user server.ts error", error);
  } catch (error) {
    console.log(error);
  }
}

export const getTasks = async (): Promise<{
  data: Task[] | null;
  error: Error | null;
}> => {
  const supabase = await createClient();
  if (!supabase) {
    return {
      data: null,
      error: new Error("Failed to initialize Supabase client"),
    };
  }
  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    console.error("Error fetching tasks:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

export const createTask = async (task: Task) => {
  const supabase = await createClient();
  if (!supabase) {
    return { error: new Error("Failed to initialize Supabase client") };
  }
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
  const supabase = await createClient();
  if (!supabase) {
    return {
      data: null,
      error: new Error("Failed to initialize Supabase client"),
    };
  }
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

export const deleteTask = async (
  id: number | undefined
): Promise<{
  data: Task | null;
  error: Error | null;
}> => {
  const supabase = await createClient();
  if (!supabase) {
    return {
      data: null,
      error: new Error("Failed to initialize Supabase client"),
    };
  }
  const { data, error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    console.error("Error deleting task:", error);
    return { data: null, error };
  }

  console.log("Task deleted successfully");
  return { data, error: null };
};
