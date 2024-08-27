import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const FetchSections = (supabase: SupabaseTypedClient) =>
    new ApiCall(async (parameters: { language_code: "fr" | "en" }) => {
        const { data: webfolio_section_data, error: webfolio_section_error } =
            await supabase
                .from("webfolio_section")
                .select()
                .eq("language_code", parameters.language_code);
        if (webfolio_section_error) throw webfolio_section_error;
        return webfolio_section_data;
    });

// Utiliser le type helper pour obtenir le type `Input` de `FetchSections`
export type FetchSectionsInputType = ExtractInputType<
    ReturnType<typeof FetchSections>
>;
export type FetchSectionsOutputType = ExtractOutputType<
    ReturnType<typeof FetchSections>
>;
