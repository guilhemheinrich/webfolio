<template>
  <div v-if="experiences" class="tw-w-full">
    <q-list class="tw-flex tw-flex-col tw-items-center">
      <div class="tw-relative tw-w-[800px] !tw-max-w-[80vw]">
        <div>
          <q-btn
            v-if="editionStore.editable"
            class="tw-absolute tw-h-[45px]"
            style="transform: translateX(-100%)"
            @click="redirectToNewExperienceModal"
          >
            Add Experience
          </q-btn>
        </div>
        <q-expansion-item
          v-for="(experience, index) in experiences"
          :key="index"
          icon="explore"
          :label="experience.title"
          class="gt-sm tw-inline"
        >
          <!-- <ExperienceDisplayer v-bind:experience="experience" ></ExperienceDisplayer> -->
          <q-card style="border-left-color: red; border-left-width: 4px">
            <q-card-section>
              <VMarkdownView
                mode="lihgt"
                :content="experience.description"
              ></VMarkdownView>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat :to="['experience', experience.slug].join('/')"
                >Voir plus</q-btn
              >
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </div>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { useEditionStore } from 'src/stores/edition';
import { useExperiences } from '../composables';
import { VMarkdownView } from 'vue3-markdown';
import TextInput from 'src/modules/UI/components/form/TextInput.vue';
import 'vue3-markdown/dist/style.css';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import NewExperienceModal from 'src/modules/experience/components/NewExperienceModal.vue';
const $ = useQuasar();
const { data: experiences, refetch } = useExperiences();
const editionStore = useEditionStore();

const dialogNewExperienceVisible = ref(false);
const onValidateNewModal = async (value: string) => {
  console.log('Validating');
  dialogNewExperienceVisible.value = false;
  // const success = await updateExperienceTitle(supabase).call({
  //   experience_slug: experience.value.slug,
  //   content: value,
  //   lang: 'fr',
  // });
  // if (success) console.log('Successfully run update');
  refetch();
  return;
};

const redirectToNewExperienceModal = () => {
  $.dialog({
    component: NewExperienceModal,
    componentProps: {},
  });
};
</script>

<style scoped></style>
