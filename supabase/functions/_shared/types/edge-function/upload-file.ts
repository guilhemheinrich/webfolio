export interface UploadFileInput {
    file: File;
    category_slug: string;
    file_role: "logo_main" | "experience_main" | "experience_markdown";
}

export interface UploadFileOutput {
    publicUrl: string;
}
