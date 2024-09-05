import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { UploadFileOutput } from "supabase-types";
import { SupabaseTypedClient } from "../../supabase";

export const uploadSectionMainPicture = (supabase: SupabaseTypedClient) =>
    new ApiCall(async (parameters: { section_slug: string; file: File }) => {
        const formData = new FormData();
        formData.set("file", parameters.file);
        formData.set("category_slug", parameters.section_slug);
        formData.set("file_role", "section_main");
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

export type UploadSectionMainPictureInputType = ExtractInputType<
    ReturnType<typeof uploadSectionMainPicture>
>;
export type UploadSectionMainPictureOutputType = ExtractOutputType<
    ReturnType<typeof uploadSectionMainPicture>
>;
