import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_APP_SUPA_URL,
  import.meta.env.VITE_APP_SUPA_ANON
);
