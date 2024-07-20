import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";
// import { Database } from "../../types/supabase.ts";
import { Database } from "../../types/supabase.ts";
import { jwtDecode } from "npm:jwt-decode";
export function checkHeaderAndGetAdminClient(request: Request) {
    console.log("Authorization header");
    console.log(request.headers.get("Authorization"));
    console.log(request.headers.get("apiKey"));
    console.log(jwtDecode(request.headers.get("Authorization") as string));
    const jwt_payload = jwtDecode(
        request.headers.get("Authorization") as string,
    ) as { role: string };
    if (jwt_payload.role !== "service_role")
        throw {
            code: 403,
            message: `The provided key doesn't carry enough credential for this operation`,
        };
    const supabaseClient = createClient<Database>(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        // This way your row-level-security (RLS) policies are applied.
        {
            global: {
                headers: {
                    Authorization: request.headers.get("Authorization")!,
                },
            },
        },
    );
    return supabaseClient;
}
