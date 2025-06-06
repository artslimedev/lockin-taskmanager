"use client";

import { createClient } from "@/utils/supabase/client";

export async function loginWithPass(email: string, password: string) {
  try {
    const supabase = createClient();
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      console.error('Login error:', error);
      throw error;
    }

    if (!data.session) {
      throw new Error('No session returned');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function signupWithPass(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  return data;
}
