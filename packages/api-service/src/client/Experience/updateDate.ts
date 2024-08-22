import ApiCall, { ExtractInputType, ExtractOutputType } from "../../ApiCall";
import { SupabaseTypedClient } from "../../supabase";

export const updateExperienceDate = (supabase: SupabaseTypedClient) =>
    new ApiCall(
        async (parameters: {
            experience_slug: string;
            start_date?: string;
            end_date?: string;
        }) => {
            const {
                data: webfolio_experience_data,
                error: webfolio_experience_error,
            } = await supabase.from("webfolio_experience").upsert({
                slug: parameters.experience_slug,
                start_date: parameters.start_date,
                end_date: parameters.end_date,
            });
            if (webfolio_experience_error) throw webfolio_experience_error;
            return webfolio_experience_data;
        },
    );

export type UpdateDateInputType = ExtractInputType<
    ReturnType<typeof updateExperienceDate>
>;
export type UpdateDateOutputType = ExtractOutputType<
    ReturnType<typeof updateExperienceDate>
>;
