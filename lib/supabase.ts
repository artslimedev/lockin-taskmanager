import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_DB_URL ?? "",
  process.env.NEXT_PUBLIC_DB_ANON_KEY ?? ""
);
