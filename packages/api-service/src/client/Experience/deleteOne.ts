import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const deleteOneExperience = (supabase: SupabaseTypedClient) =>
    new ApiCall(async (parameters: { experience_slug: string }) => {
        const {
            data: webfolio_experience_slug,
            error: webfolio_experience_error,
        } = await supabase
            .from("webfolio_experience")
            .delete()
            .eq("slug", parameters.experience_slug)
            .select("slug");
        if (webfolio_experience_error) throw webfolio_experience_error;
        return webfolio_experience_slug;
    });
