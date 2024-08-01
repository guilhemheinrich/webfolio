import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const createOneExperience = (supabase: SupabaseTypedClient) =>
    new ApiCall(async (parameters: { experience_slug: string }) => {
        const {
            data: webfolio_experience_data,
            error: webfolio_experience_error,
        } = await supabase
            .from("webfolio_experience")
            .insert({
                slug: parameters.experience_slug,
            })
            .select();
        if (webfolio_experience_error) throw webfolio_experience_error;
        return webfolio_experience_data;
    });
