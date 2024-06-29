import { FetchExperiences, FetchExperienceOutputType } from 'api-service';
import { useQuery } from '@tanstack/vue-query';
import { getLanguage } from 'shared-utilities';

export type ComputedExperienceType = Omit<
  FetchExperienceOutputType[number],
  'webfolio_experience_description' | 'webfolio_experience_title'
> & {
  title: string;
  description: string;
};

export const useExperiences = () =>
  useQuery({
    queryKey: ['experiences', 'fr'],
    placeholderData: [],
    queryFn: async () => {
      const experiencesData = await FetchExperiences.call();
      return experiencesData.map((experience) => {
        const {
          webfolio_experience_description,
          webfolio_experience_title,
          ...clean_experience
        } = experience;
        const description = getLanguage(webfolio_experience_description, 'fr');
        const title = getLanguage(webfolio_experience_title, 'fr');
        console.log(description);
        return {
          ...clean_experience,
          title,
          description,
        };
      });
    },
  });
