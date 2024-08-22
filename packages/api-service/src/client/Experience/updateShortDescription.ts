import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const updateExperienceShortDescription = (
    supabase: SupabaseTypedClient,
) =>
    new ApiCall(
        async (parameters: {
            experience_slug: string;
            content: string;
            lang: "fr" | "en";
        }) => {
            console.log(
                "Into updateShortDescription with parameters",
                parameters,
            );
            const {
                data: upsert_short_description_data,
                error: upsert_short_description_error,
            } = await supabase.rpc("upsert_short_description", {
                query_experience_slug: parameters.experience_slug,
                language_tag: parameters.lang,
                new_content: parameters.content,
            });
            if (upsert_short_description_error)
                throw upsert_short_description_error;

            return true;
        },
    );

// Utiliser le type helper pour obtenir le type `Input` de `FetchExperience`
export type UpdateShortDescriptionInputType = ExtractInputType<
    ReturnType<typeof updateExperienceShortDescription>
>;
export type UpdateShortDescriptionOutputType = ExtractOutputType<
    ReturnType<typeof updateExperienceShortDescription>
>;
