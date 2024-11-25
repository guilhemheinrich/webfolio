import { useConfig } from "@composables/configuration";
import { createClient } from "@supabase/supabase-js";
import { type Database } from "supabase-types";

export function useSupabase() {
    const Config = useConfig();
    return createClient<Database>(
        Config.SUPABASE_URL,
        Config.ADMIN ? Config.SUPABASE_SERVICE_KEY : Config.SUPABASE_ANON_KEY,
    );
}
