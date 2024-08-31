import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { UploadFileOutput } from "supabase-types";
import { SupabaseTypedClient } from "../../supabase";

export const uploadMainPicture = (supabase: SupabaseTypedClient) =>
    new ApiCall(async (parameters: { experience_slug: string; file: File }) => {
        const formData = new FormData();
        formData.set("file", parameters.file);
        formData.set("project_slug", parameters.experience_slug);
        formData.set("picture_role", "main");
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

export type UploadMainPictureInputType = ExtractInputType<
    ReturnType<typeof uploadMainPicture>
>;
export type UploadMainPictureOutputType = ExtractOutputType<
    ReturnType<typeof uploadMainPicture>
>;
