import { FetchExperienceOutputType, FetchExperiences } from 'api-service';
import { useQuery } from '@tanstack/vue-query';
import { getLanguage } from 'shared-utilities';
import { supabase } from 'src/modules/supabase';
export type ComputedExperienceType = Omit<
  FetchExperienceOutputType[number],
  | 'webfolio_experience_description'
  | 'webfolio_experience_title'
  | 'webfolio_experience_short_description'
> & {
  title: string;
  description: string;
  short_description: string;
};

export const useExperiences = () =>
  useQuery({
    queryKey: ['experiences', 'fr'],
    placeholderData: [],
    queryFn: async () => {
      const experiencesData = await FetchExperiences(supabase).call();
      return experiencesData.map((experience) => {
        const {
          webfolio_experience_short_description,
          webfolio_experience_description,
          webfolio_experience_title,
          ...clean_experience
        } = experience;
        const short_description = getLanguage(
          webfolio_experience_short_description,
          'fr',
        );
        const description = getLanguage(webfolio_experience_description, 'fr');
        const title = getLanguage(webfolio_experience_title, 'fr');
        console.log('description', description);
        return {
          ...clean_experience,
          title,
          short_description,
          description,
        };
      });
    },
  });
