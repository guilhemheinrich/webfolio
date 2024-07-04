import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { supabase } from "../../supabase";

export const updateExperienceTitle = new ApiCall(
    async (parameters: {
        experience_slug: string;
        title: string;
        lang: "fr" | "en";
    }) => {
        const { data: upsert_title_data, error: upsert_title_error } =
            await supabase.rpc("upsert_title", {
                query_experience_slug: parameters.experience_slug,
                new_content: parameters.title,
                language_tag: parameters.lang,
            });
        if (upsert_title_error) throw upsert_title_error;

        return upsert_title_data;
    },
);

// Utiliser le type helper pour obtenir le type `Input` de `FetchExperience`
export type FetchExperienceInputType = ExtractInputType<
    typeof updateExperienceTitle
>;
export type FetchExperienceOutputType = ExtractOutputType<
    typeof updateExperienceTitle
>;
