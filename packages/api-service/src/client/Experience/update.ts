import { SupabaseClient } from "@supabase/supabase-js";
import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";

export const updateExperienceTitle = (supabase: SupabaseClient) =>
  new ApiCall(
    async (parameters: {
      experience_slug: string;
      title: string;
      lang: "fr" | "en";
    }) => {
      console.log("Into updateExperienceTitle with parameters", parameters);
      const { data: upsert_title_data, error: upsert_title_error } =
        await supabase.rpc("upsert_title", {
          query_experience_slug: parameters.experience_slug,
          language_tag: parameters.lang,
          new_content: parameters.title,
        });
      if (upsert_title_error) throw upsert_title_error;

      return true;
    },
  );

// Utiliser le type helper pour obtenir le type `Input` de `FetchExperience`
export type updateExperienceTitleInputType = ExtractInputType<
  typeof updateExperienceTitle
>;
export type updateExperienceTitleOutputType = ExtractOutputType<
  typeof updateExperienceTitle
>;
