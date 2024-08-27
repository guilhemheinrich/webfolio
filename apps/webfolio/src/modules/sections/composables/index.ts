import { FetchSections } from 'api-service';
import { useQuery } from '@tanstack/vue-query';
import { supabase } from 'src/modules/supabase';

export const useSections = () =>
  useQuery({
    queryKey: ['sections', 'fr'],
    placeholderData: [],
    queryFn: async () => {
      const sectionsData = await FetchSections(supabase).call({
        language_code: 'fr',
      });
      return sectionsData;
    },
  });
