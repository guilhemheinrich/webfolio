// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { corsHeaders } from "../_shared/cors.ts";
import { checkHeaderAndGetAdminClient } from "../_shared/services/auth/getAuthenticatedSupabaseClient.ts";
import { zfd } from "npm:zod-form-data";
import { z } from "npm:zod";
import { updateOrUploadFile } from "../_shared/services/updateOrUploadFile.ts";

const schema = zfd.formData({
    file: zfd.file(),
    category_slug: zfd.text(), // Accoding to the file role, carry the slug of the attached resource
    file_role: zfd.text(
        z.union([
            z.literal("section_main"),
            z.literal("section_markdown"),
            z.literal("experience_main"),
            z.literal("experience_markdown"),
        ]),
    ),
});

// TODO Upload or update based already existing resource or not
// TODO refactor the function to handle path as category/id/file for each resource
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
        const { file, category_slug, file_role } = schema.parse(
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

            let path: string[] = [];
            //* Preprocessing file upload
            switch (file_role) {
                case "section_main":
                    path = ["section", category_slug, "main.png"];
                    break;
                case "section_markdown":
                    path = ["section", category_slug, "content", fileName];
                    break;
                case "experience_main":
                    path = ["experience", category_slug, "main.png"];
                    break;
                case "experience_markdown":
                    path = ["experience", category_slug, "content", fileName];
                    break;
                default:
                    break;
            }

            const { data_storage, publicUrl } = await updateOrUploadFile(
                authenticatedClient,
                path,
                file,
            );

            //* Postprocessing file upload
            // Dans le cas de l'upload d'une image principale, on met à jour le lien public

            switch (file_role) {
                case "section_main":
                    {
                        const {
                            data: webfolio_section_data,
                            error: webfolio_section_error,
                        } = await authenticatedClient
                            .from("webfolio_section")
                            .update({ picture: publicUrl })
                            .eq("slug", category_slug);
                        if (webfolio_section_error)
                            throw webfolio_section_error;
                    }
                    break;
                case "experience_main":
                    {
                        const {
                            data: webfolio_experience_data,
                            error: webfolio_experience_error,
                        } = await authenticatedClient
                            .from("webfolio_experience")
                            .update({ picture: publicUrl })
                            .eq("slug", category_slug);
                        if (webfolio_experience_error)
                            throw webfolio_experience_error;
                    }
                    break;

                default:
                    break;
            }

            console.log(publicUrl);

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
