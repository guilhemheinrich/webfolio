import { supabase } from 'src/modules/supabase';
import { uploadSectionMarkdownFile } from 'api-service';

export const saveSectionMarkdownFile = (section_slug: string) => {
  return async (file: File) => {
    console.log(file);
    const fileOutput = await uploadSectionMarkdownFile(supabase).call({
      section_slug: section_slug,
      file: file,
    });
    return fileOutput.publicUrl;
  };
};
