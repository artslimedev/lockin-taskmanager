"use client";
import {
  createBrowserClient,
  createBrowserClient as createNewClient,
} from "@supabase/ssr";
import { type SupabaseClient } from "@supabase/supabase-js";

export const createClient = (): SupabaseClient => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_DB_URL!,
    process.env.NEXT_PUBLIC_DB_ANON_KEY!
  );
};

export const createAdminClient = () =>
  createNewClient(
    process.env.NEXT_PUBLIC_DB_URL!,
    process.env.NEXT_PUBLIC_DB_SRK!
  );
