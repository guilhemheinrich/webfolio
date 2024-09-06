import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const updateSectionContent = (supabase: SupabaseTypedClient) =>
    new ApiCall(
        async (parameters: {
            section_slug: string;
            content: string;
            lang: "fr" | "en";
        }) => {
            console.log(
                "Into updateSectionContent with parameters",
                parameters,
            );
            const { data: upsert_content_data, error: upsert_content_error } =
                await supabase.rpc("upsert_content", {
                    query_section_slug: parameters.section_slug,
                    language_tag: parameters.lang,
                    new_content: parameters.content,
                });
            if (upsert_content_error) throw upsert_content_error;

            return true;
        },
    );

// Utiliser le type helper pour obtenir le type `Input` de `FetchExperience`
export type updateSectionContentInputType = ExtractInputType<
    ReturnType<typeof updateSectionContent>
>;
export type updateSectionContentOutputType = ExtractOutputType<
    ReturnType<typeof updateSectionContent>
>;
