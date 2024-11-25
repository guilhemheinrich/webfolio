import { useSupabase } from "@composables/supabase";
import { uploadSectionMarkdownFile } from "api-service";

export const saveMarkdownFile = (section_slug: string) => {
    const supabase = useSupabase();
    return async (file: File) => {
        const fileOutput = await uploadSectionMarkdownFile(supabase).call({
            section_slug: section_slug,
            file: file,
        });
        return fileOutput.publicUrl;
    };
};
