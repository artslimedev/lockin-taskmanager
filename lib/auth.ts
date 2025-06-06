"use client";

import { createClient } from "@/utils/supabase/client";

export async function loginWithPass(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function signupWithPass(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  return data;
}
