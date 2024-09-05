import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { UploadFileInput, UploadFileOutput } from "supabase-types";
import { SupabaseTypedClient } from "../../supabase";

export const uploadSectionMarkdownFile = (supabase: SupabaseTypedClient) =>
    new ApiCall(async (parameters: { section_slug: string; file: File }) => {
        const formData = new FormData();
        formData.set("file", parameters.file);
        formData.set("category_slug", parameters.section_slug);
        formData.set("file_role", "section_markdown");
        const payload = {
            body: formData,
        };

        const { data, error } = (await supabase.functions.invoke(
            "upload-file",
            payload,
        )) as {
            data: UploadFileOutput;
            error: any;
        };

        return data;
    });

export type UploadSectionMarkdownFileInputType = ExtractInputType<
    ReturnType<typeof uploadSectionMarkdownFile>
>;
export type UploadSectionMarkdownFileOutputType = ExtractOutputType<
    ReturnType<typeof uploadSectionMarkdownFile>
>;
