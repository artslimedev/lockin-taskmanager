// lib/supabase.ts
import { createClient } from "@supabase/supabase-js"; // Client-side supabase

// Create and return the Supabase client instance for Client-side
export const getSupabaseClient = () => {
  if (typeof window !== "undefined") {
    return createClient(
      process.env.NEXT_PUBLIC_DB_URL!,
      process.env.NEXT_PUBLIC_DB_ANON_KEY!
    );
  }
  return null;
};
