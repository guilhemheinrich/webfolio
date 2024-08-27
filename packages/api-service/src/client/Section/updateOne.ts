import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const updateSection = (supabase: SupabaseTypedClient) =>
    new ApiCall(
        async (parameters: {
            section_slug: string;
            content: string;
            lang: "fr" | "en";
        }) => {
            console.log("Into updateSection with parameters", parameters);
            const {
                data: update_webfolio_section_data,
                error: update_webfolio_section_error,
            } = await supabase
                .from("webfolio_section")
                .update({
                    content: parameters.content,
                })
                .eq("section_slug", parameters.section_slug)
                .eq("language_code", parameters.lang);
            if (update_webfolio_section_error)
                throw update_webfolio_section_error;

            return true;
        },
    );

export type UpdateSectionInputType = ExtractInputType<
    ReturnType<typeof updateSection>
>;
export type UpdateSectionOutputType = ExtractOutputType<
    ReturnType<typeof updateSection>
>;
