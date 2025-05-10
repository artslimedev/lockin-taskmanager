// app/supabase.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Create and return the Supabase client instance
export const getSupabaseClient = async () => {
  const cookieStore = await cookies(); // Access cookies on the server side

  // Create Supabase client
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll(); // Get cookies from the request
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options); // Set cookies for the response
          });
        },
      },
    }
  );
};
