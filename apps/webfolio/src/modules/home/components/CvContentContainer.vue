<template>
  This is my CV
  <div>
    {{ experiences }}
  </div>
</template>

<script setup lang="ts">
import { FetchExperience } from 'api-service';
import { useQuery } from '@tanstack/vue-query';
import { getLanguage } from 'shared-utilities';

const { data: experiences, isFetching } = useQuery({
  queryKey: ['experience'],
  placeholderData: [],
  queryFn: async () => {
    const experiencesData = await FetchExperience.call();
    return experiencesData.map((experience) => {
      const {webfolio_experience_description, webfolio_experience_title, ...clean_experience} = experience
      const description = getLanguage(webfolio_experience_description, 'fr');
      const title = getLanguage(webfolio_experience_title, 'fr');
      console.log(description)
      return {
        ...clean_experience,
        title,
        description
      };
    });
  },
});
</script>

<style scoped></style>
