import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { UploadFileInput, UploadFileOutput } from "supabase-types";
import { SupabaseTypedClient } from "../../supabase";

export const uploadMarkdownFile = (supabase: SupabaseTypedClient) =>
    new ApiCall(async (parameters: { experience_slug: string; file: File }) => {
        const formData = new FormData();
        formData.set("file", parameters.file);
        formData.set("project_slug", parameters.experience_slug);
        formData.set("picture_role", "markdown");
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

export type UploadMarkdownFileInputType = ExtractInputType<
    ReturnType<typeof uploadMarkdownFile>
>;
export type UploadMarkdownFileOutputType = ExtractOutputType<
    ReturnType<typeof uploadMarkdownFile>
>;
