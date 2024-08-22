import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const updateExperienceDescription = (supabase: SupabaseTypedClient) =>
    new ApiCall(
        async (parameters: {
            experience_slug: string;
            content: string;
            lang: "fr" | "en";
        }) => {
            console.log("Into updateDescription with parameters", parameters);
            const {
                data: upsert_description_data,
                error: upsert_description_error,
            } = await supabase.rpc("upsert_description", {
                query_experience_slug: parameters.experience_slug,
                language_tag: parameters.lang,
                new_content: parameters.content,
            });
            if (upsert_description_error) throw upsert_description_error;

            return true;
        },
    );

// Utiliser le type helper pour obtenir le type `Input` de `FetchExperience`
export type UpdateDescriptionInputType = ExtractInputType<
    ReturnType<typeof updateExperienceDescription>
>;
export type UpdateDescriptionOutputType = ExtractOutputType<
    ReturnType<typeof updateExperienceDescription>
>;
