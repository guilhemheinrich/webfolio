import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const createOneSection = (supabase: SupabaseTypedClient) =>
    new ApiCall(
        async (parameters: {
            section_slug: string;
            language_code: "fr" | "en";
            content: string;
        }) => {
            const {
                data: webfolio_section_data,
                error: webfolio_section_error,
            } = await supabase
                .from("webfolio_section")
                .insert({
                    section_slug: parameters.section_slug,
                    language_code: parameters.language_code,
                    content: parameters.content,
                })
                .select();
            if (webfolio_section_error) throw webfolio_section_error;
            return webfolio_section_data;
        },
    );
