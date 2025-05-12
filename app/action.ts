import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  if (!supabase) {
    throw new Error("Failed to initialize Supabase client");
  }

  const { data, error } = await supabase.auth.signUp({ email, password });
  const { user, session } = data;

  if (error || !session) {
    console.error("Signup error:", error);
    redirect("/error");
  }

  return { user, session };
}
