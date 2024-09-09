import { supabase } from 'src/modules/supabase';
import { uploadExperienceMarkdownFile } from 'api-service';

export const saveExperienceMarkdownFile = (experience_slug: string) => {
  return async (file: File) => {
    const fileOutput = await uploadExperienceMarkdownFile(supabase).call({
      experience_slug: experience_slug,
      file: file,
    });
    return fileOutput.publicUrl;
  };
};
