import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const FetchExperiences = (supabase: SupabaseTypedClient) =>
    new ApiCall(async (parameters: {} = {}) => {
        const {
            data: webfolio_experience_data,
            error: webfolio_experience_error,
        } = await supabase.from("webfolio_experience").select(`
                *
                , webfolio_experience_short_description(*)
                , webfolio_experience_description(*)
                , webfolio_experience_title(*)`);
        if (webfolio_experience_error) throw webfolio_experience_error;
        return webfolio_experience_data;
    });

// Utiliser le type helper pour obtenir le type `Input` de `FetchExperience`
export type FetchExperienceInputType = ExtractInputType<
    ReturnType<typeof FetchExperiences>
>;
export type FetchExperienceOutputType = ExtractOutputType<
    ReturnType<typeof FetchExperiences>
>;
