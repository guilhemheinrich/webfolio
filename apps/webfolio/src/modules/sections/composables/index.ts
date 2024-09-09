import {
  createOneSection,
  FetchSections,
  updateSectionContent,
} from 'api-service';
import { useQuery } from '@tanstack/vue-query';
import { supabase } from 'src/modules/supabase';
import { getLanguage } from 'shared-utilities';
import { ComputedSectionType } from '../model';
import { ref, watch } from 'vue';

export const useQuerySection = (slug: string) => {
  const hasInitialized = ref(false);
  const query = useQuery({
    queryKey: ['sections', slug, 'fr'],
    queryFn: async () => {
      const sectionsData = await FetchSections(supabase).call();
      const targetSection = sectionsData
        .map((section) => {
          const { webfolio_section_content, ...clean_section } = section;
          const content = getLanguage(webfolio_section_content, 'fr');

          return {
            ...clean_section,
            content,
          } as ComputedSectionType;
        })
        .find((section) => section.slug === slug);
      console.log('targetSection', targetSection);
      return targetSection;
    },
  });

  // Utilisation de `watch` pour détecter les changements sur les données de la query
  watch(
    () => query.data,
    async (data) => {
      console.log('data.value', data.value);
      // Si aucune section n'est trouvée et que l'initialisation n'a pas été faite
      if (!data.value && !hasInitialized.value) {
        hasInitialized.value = true; // Marque que l'initialisation a été faite une fois
        // Crée la section sur le backend
        await createOneSection(supabase).call({
          section_slug: slug,
        });
      }
    },
  );

  return query;
};

export function useSection(slug: string) {
  const { data: section, refetch } = useQuerySection(slug);

  // Fonction pour valider et mettre à jour le contenu d'une section
  const onValidate = async (value: string) => {
    if (!section.value) {
      console.warn('Section not found, cannot validate');
      return;
    }
    try {
      const success = await updateSectionContent(supabase).call({
        section_slug: section.value.slug,
        content: value,
        lang: 'fr',
      });

      if (success) {
        console.log(`Successfully updated section: ${slug}`);
        refetch(); // Refetch les sections après la mise à jour
      }
    } catch (error) {
      console.error(`Failed to update section with slug ${slug}`, error);
    }
  };

  return {
    section,
    refetch,
    onValidate,
  };
}
