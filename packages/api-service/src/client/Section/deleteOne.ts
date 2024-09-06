import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const deleteOneSection = (supabase: SupabaseTypedClient) =>
    new ApiCall(async (parameters: { section_slug: string }) => {
        const { data: webfolio_section_slug, error: webfolio_section_error } =
            await supabase
                .from("webfolio_section")
                .delete()
                .eq("slug", parameters.section_slug)
                .select("slug");
        if (webfolio_section_error) throw webfolio_section_error;
        return webfolio_section_slug;
    });
