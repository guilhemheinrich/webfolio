export interface UploadFileInput {
    file: File;
    project_slug: string;
    picture_role: "main" | "markdown";
}

export interface UploadFileOutput {
    publicUrl: string;
}
