// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { corsHeaders } from "../_shared/cors.ts";
import { checkHeaderAndGetAdminClient } from "../_shared/services/auth/getAuthenticatedSupabaseClient.ts";
import { zfd } from "npm:zod-form-data";
import { z } from "npm:zod";

const schema = zfd.formData({
    file: zfd.file(),
    project_slug: zfd.text(),
    picture_role: zfd.text(z.union([z.literal("main"), z.literal("markdown")])),
});

Deno.serve(async (req) => {
    console.log("In update-profil-pic");

    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    if (req.method !== "POST") {
        return new Response("Méthode non supportée", {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 405,
        });
    }
    try {
        // Create a Supabase client with the Auth context of the logged in user.
        const authenticatedClient = checkHeaderAndGetAdminClient(req);

        // Parse le FormData de la requête
        const { file, project_slug, picture_role } = schema.parse(
            await req.formData(),
        );

        // Delete if empty
        if (!file) {
            // remove file
            return new Response(JSON.stringify(true), {
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
                status: 200,
            });
        } else {
            // build storage path

            // Obtenir la taille du fichier
            const fileSize = file.size; // La taille en octets

            // Obtenir l'extension du fichier
            const fileName = file.name;
            const fileExtension = fileName.split(".").pop();

            console.log(`Taille du fichier : ${fileSize} octets`);
            console.log(`Extension du fichier : ${fileExtension}`);

            if (picture_role === "main") {
                const path = [project_slug, `main.png`].join("/");
                // Upload if there is one, and set the proper path
                const { data: data_storage, error: error_storage } =
                    await authenticatedClient.storage
                        .from("public")
                        .upload(<string>path, file);
                if (error_storage) throw error_storage;
                console.log(
                    JSON.stringify(
                        authenticatedClient.storage
                            .from("public")
                            .getPublicUrl(path).data,
                    ),
                );
            }

            return new Response(JSON.stringify(true), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            });
        }
    } catch (error) {
        console.error(error);
        return new Response(error, {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
