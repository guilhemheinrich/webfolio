import { FetchSections } from 'api-service';
import { useQuery } from '@tanstack/vue-query';
import { supabase } from 'src/modules/supabase';
import { getLanguage } from 'shared-utilities';
import { ComputedSectionType } from '../model';

export const useSections = () =>
  useQuery({
    queryKey: ['sections', 'fr'],
    placeholderData: [],
    queryFn: async () => {
      const sectionsData = await FetchSections(supabase).call();
      return sectionsData.map((section) => {
        const { webfolio_section_content, ...clean_section } = section;
        const content = getLanguage(webfolio_section_content, 'fr');

        return {
          ...clean_section,
          content,
        } as ComputedSectionType;
      });
    },
  });
