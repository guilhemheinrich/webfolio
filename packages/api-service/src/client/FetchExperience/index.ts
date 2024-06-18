import ApiCall from '../../ApiCall';
import { supabase } from '../../supabase';

export const FetchExperience = new ApiCall(
    async (parameters: object = {}) => {
    const { data: webfolio_experience_data, error: webfolio_experience_error } =
        await supabase.from('webfolio_experience').select(`
                *
                , webfolio_experience_description(webfolio_text_traduction(*))
                , webfolio_experience_title(webfolio_text_traduction(*))`);
    if (webfolio_experience_error) throw webfolio_experience_error;
    return webfolio_experience_data;
});

FetchExperience.call()