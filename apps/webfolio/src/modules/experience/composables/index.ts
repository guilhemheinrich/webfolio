import { FetchExperiences } from 'api-service';
import { useQuery } from '@tanstack/vue-query';
import { getLanguage } from 'shared-utilities';
import { supabase } from 'src/modules/supabase';
import { ComputedExperienceType } from '../model';

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
        return {
          ...clean_experience,
          title,
          short_description,
          description,
        } as ComputedExperienceType;
      });
    },
  });
