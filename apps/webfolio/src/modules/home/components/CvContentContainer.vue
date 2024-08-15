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
          <div v-for="(experience, index) in experiences" :key="index">
            <RelativeOverlay position="outside-top-right">
              <template #overlay v-if="editionStore.editable">
                <q-btn
                  class="tw-maxw-[200px] tw-mx-4 tw-w-[15vw]"
                  @click="onDeleteExperience(experience.slug)"
                >
                  Delete experience
                </q-btn>
              </template>
              <template #foreground>
                <q-expansion-item
                  icon="explore"
                  :label="experience.title"
                  class="gt-sm tw-inline"
                >
                  <q-card
                    style="border-left-color: red; border-left-width: 4px"
                  >
                    <q-card-section>
                      <VMarkdownView
                        mode="lihgt"
                        :content="experience.description"
                      ></VMarkdownView>
                    </q-card-section>
                    <q-card-actions align="right">
                      <q-btn
                        flat
                        :to="['experience', experience.slug].join('/')"
                        >Voir plus</q-btn
                      >
                    </q-card-actions>
                  </q-card>
                </q-expansion-item>
              </template>
            </RelativeOverlay>
          </div>
        </div>
      </div>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { useEditionStore } from 'src/stores/edition';
import { useExperiences } from '../composables';
import { VMarkdownView } from 'vue3-markdown';
import 'vue3-markdown/dist/style.css';
import { useQuasar } from 'quasar';
import NewExperienceModal from 'src/modules/experience/components/NewExperienceModal.vue';
import RelativeOverlay from 'src/modules/UI/components/RelativeOverlay.vue';
import DeleteExperienceModal from 'src/modules/experience/components/DeleteExperienceModal.vue';

const $ = useQuasar();
const { data: experiences, refetch } = useExperiences();
const editionStore = useEditionStore();
const redirectToNewExperienceModal = () => {
  $.dialog({
    component: NewExperienceModal,
    componentProps: {},
  });
};

const onDeleteExperience = async (experience_slug: string) => {
  $.dialog({
    component: DeleteExperienceModal,
    componentProps: { experience_slug: experience_slug },
  }).onOk(() => {
    refetch();
  });
};
</script>

<style scoped></style>
