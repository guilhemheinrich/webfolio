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
            //TODO remove file
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

            let path = "";
            //* Preprocessing file upload
            switch (picture_role) {
                case "main":
                    path = ["experience", project_slug, `main.png`].join("/");
                    break;
                case "markdown":
                    path = [
                        "experience",
                        project_slug,
                        "content",
                        fileName,
                    ].join("/");
                    break;
                default:
                    break;
            }

            // Upload if there is one, and set the proper path
            const { data: data_storage, error: error_storage } =
                await authenticatedClient.storage
                    .from("public")
                    .upload(path, file);
            if (error_storage) throw error_storage;

            const { publicUrl } = authenticatedClient.storage
                .from("public")
                .getPublicUrl(path).data;

            //* Postprocessing file upload
            // Dans le cas de l'upload d'une image principale, on met à jour le lien public
            if (picture_role === "main") {
                const {
                    data: webfolio_experience_data,
                    error: webfolio_experience_error,
                } = await authenticatedClient
                    .from("webfolio_experience")
                    .update({ picture: publicUrl })
                    .eq("slug", project_slug);
                if (webfolio_experience_error) throw webfolio_experience_error;
            }

            console.log(
                JSON.stringify(
                    authenticatedClient.storage
                        .from("public")
                        .getPublicUrl(path).data,
                ),
            );

            return new Response(JSON.stringify({ publicUrl: publicUrl }), {
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
