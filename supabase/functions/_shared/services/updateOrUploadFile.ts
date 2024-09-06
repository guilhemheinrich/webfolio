import { Database } from "../types/supabase.ts";
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

export async function updateOrUploadFile(
    supabaseClient: SupabaseClient<Database>,
    path: string[],
    file: File,
) {
    const searchPath = path.slice(0, -1);

    const { data, error } = await supabaseClient.storage
        .from("public_webfolio")
        .list("", {
            search: searchPath.join("/"), // Rechercher dans le répertoire cible
        });

    if (error) throw error;
    const targetPath = path.join("/");
    let data_storage;
    if (data) {
        const { data, error: error_storage } = await supabaseClient.storage
            .from("public_webfolio")
            .update(targetPath, file);
        if (error_storage) throw error_storage;
        data_storage = data;
    } else {
        const { data, error: error_storage } = await supabaseClient.storage
            .from("public_webfolio")
            .upload(targetPath, file);
        if (error_storage) throw error_storage;
        data_storage = data;
    }

    const { publicUrl } = supabaseClient.storage
        .from("public_webfolio")
        .getPublicUrl(targetPath).data;

    return { data_storage, publicUrl };
}
