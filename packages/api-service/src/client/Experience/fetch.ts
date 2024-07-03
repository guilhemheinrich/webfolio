import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { supabase } from "../../supabase";

export const FetchExperiences = new ApiCall(async (parameters: object = {}) => {
    const { data: webfolio_experience_data, error: webfolio_experience_error } =
        await supabase.from("webfolio_experience").select(`
                *
                , webfolio_experience_description(*)
                , webfolio_experience_title(*)`);
    if (webfolio_experience_error) throw webfolio_experience_error;
    return webfolio_experience_data;
});

// Utiliser le type helper pour obtenir le type `Input` de `FetchExperience`
export type FetchExperienceInputType = ExtractInputType<
    typeof FetchExperiences
>;
export type FetchExperienceOutputType = ExtractOutputType<
    typeof FetchExperiences
>;
