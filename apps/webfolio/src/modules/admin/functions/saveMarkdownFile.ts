import { supabase } from 'src/modules/supabase';
import { uploadMarkdownFile } from 'api-service';

export const saveMarkdownFile = (experience_slug: string) => {
  return async (file: File) => {
    console.log(file);
    const fileOutput = await uploadMarkdownFile(supabase).call({
      experience_slug: experience_slug,
      file: file,
    });
    return fileOutput.publicUrl;
  };
};
