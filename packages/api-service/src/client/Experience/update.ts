import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { supabase } from "../../supabase";

export const updateExperienceTitle = new ApiCall(
    async (parameters: { title: string; lang: "fr" | "en" }) => {
        const {
            data: webfolio_experience_data,
            error: webfolio_experience_error,
        } = await supabase.from("webfolio_experience").select(`
                *
                , webfolio_experience_description(webfolio_text_traduction(*))
                , webfolio_experience_title(webfolio_text_traduction(*))`);
        if (webfolio_experience_error) throw webfolio_experience_error;
        return webfolio_experience_data;
    },
);

// Utiliser le type helper pour obtenir le type `Input` de `FetchExperience`
export type FetchExperienceInputType = ExtractInputType<
    typeof updateExperienceTitle
>;
export type FetchExperienceOutputType = ExtractOutputType<
    typeof updateExperienceTitle
>;
