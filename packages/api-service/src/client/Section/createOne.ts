import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const createOneSection = (supabase: SupabaseTypedClient) =>
    new ApiCall(async (parameters: { section_slug: string }) => {
        const { data: webfolio_section_data, error: webfolio_section_error } =
            await supabase
                .from("webfolio_section")
                .insert({
                    slug: parameters.section_slug,
                })
                .select();
        if (webfolio_section_error) throw webfolio_section_error;
        return webfolio_section_data;
    });
