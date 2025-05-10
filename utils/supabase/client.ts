import { createBrowserClient } from "@supabase/ssr";
import { createClient as CreateNewClient } from "@supabase/supabase-js";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_DB_URL!,
    process.env.NEXT_PUBLIC_DB_ANON_KEY!
  );
export const createAdminClient = () =>
  CreateNewClient(
    process.env.NEXT_PUBLIC_DB_URL!,
    process.env.NEXT_PUBLIC_DB_SRK!
  );
