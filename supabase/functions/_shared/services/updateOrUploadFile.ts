import { Database } from "../types/supabase.ts";
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

export async function updateOrUploadFile(
    supabaseClient: SupabaseClient<Database>,
    path: string[],
    file: File,
) {
    const searchPath = path.slice(0, -1);
    console.log(searchPath);
    const { data, error } = await supabaseClient.storage
        .from("public_webfolio")
        .list(searchPath.join("/"));

    if (error) throw error;
    const targetPath = path.join("/");
    let data_storage;
    if (Array.isArray(data) && data.some((file) => file.name === file.name)) {
        console.log("Updating", targetPath);
        const { data, error: error_storage } = await supabaseClient.storage
            .from("public_webfolio")
            .update(targetPath, file);
        if (error_storage)
            throw { type: "storage_error", error: error_storage };
        data_storage = data;
    } else {
        console.log("Uploading", targetPath);
        const { data, error: error_storage } = await supabaseClient.storage
            .from("public_webfolio")
            .upload(targetPath, file);
        if (error_storage)
            throw { type: "storage_error", error: error_storage };
        data_storage = data;
    }

    const { publicUrl } = supabaseClient.storage
        .from("public_webfolio")
        .getPublicUrl(targetPath).data;

    return { data_storage, publicUrl };
}
