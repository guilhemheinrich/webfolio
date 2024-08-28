<template>
  <q-card style="border-left-color: red; border-left-width: 4px" hidden>
    <q-card-section>
      <RelativeOverlay position="right">
        <template #overlay v-if="editionStore.editable">
          <q-btn
            class="tw-maxw-[200px] tw-mx-4 tw-w-[15vw]"
            @click="dialogTitleVisible = true"
            color="warning"
          >
            Edit Title
          </q-btn>

          <q-dialog v-model="dialogTitleVisible">
            <div class="tw-w-[700px]">
              <TextInput
                :initial_content="experience.title"
                field_label="Title"
                @form-validated="onValidateTitle"
                @cancel="dialogTitleVisible = false"
              ></TextInput>
            </div>
          </q-dialog>
        </template>
        <template #foreground>
          <h2 class="">
            {{ experience.title }}
          </h2>
        </template>
      </RelativeOverlay>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <RelativeOverlay position="top-right">
        <template #overlay v-if="editionStore.editable">
          <q-btn
            class="tw-maxw-[200px] tw-mx-4 tw-w-[15vw]"
            @click="dialogShortDescriptionVisible = true"
            color="warning"
          >
            Edit Short Description
          </q-btn>

          <q-dialog v-model="dialogShortDescriptionVisible">
            <div class="tw-w-[700px]">
              <TextInput
                :initial_content="experience.short_description"
                :input-props="{ type: 'textarea' }"
                field_label="Short Description"
                @form-validated="onValidateShortDescription"
                @cancel="dialogShortDescriptionVisible = false"
              ></TextInput>
            </div>
          </q-dialog>
        </template>
        <template #foreground>
          <p class="short-description">
            {{ experience.short_description ?? '' }}
          </p>
        </template>
      </RelativeOverlay>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat :to="['experience', experience.slug].join('/')"
        >Voir plus</q-btn
      >
    </q-card-actions>
  </q-card>

  <q-card>
    <div class="row">
      <q-card-section
        class="col-6 q-pa-none border-radius-inherit"
        style="height: 400px"
      >
        <q-img
          class="border-radius-inherit tw-h-full tw-rounded-r-none"
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          spinner-color="white"
          fit="cover"
        >
          <div class="absolute-bottom text-subtitle1 text-center">Caption</div>
        </q-img>
      </q-card-section>
      <q-card-section class="col-6 q-pa-none">
        <div class="column tw-overflow-hidden">
          <div class="row items-center q-pa-sm">
            <p class="col-2">Date</p>

            <h2 class="col-10 relative-position">
              {{ experience.title }}
            </h2>
          </div>
          <div v-if="editionStore.editable" class="absolute-top-right q-ma-sm">
            <q-btn
              class="tw-mx-4 tw-w-[8vw]"
              @click="dialogTitleVisible = true"
              color="warning"
            >
              Edit Title
            </q-btn>

            <q-dialog v-model="dialogTitleVisible">
              <div class="tw-w-[700px]">
                <TextInput
                  :initial_content="experience.title"
                  field_label="Title"
                  @form-validated="onValidateTitle"
                  @cancel="dialogTitleVisible = false"
                ></TextInput>
              </div>
            </q-dialog>
          </div>
          <q-separator />

          <div class="relative-position q-pa-sm">
            <p class="short-description">
              {{ experience.short_description ?? '' }}
            </p>
            <div class="absolute-top-right q-ma-sm">
              <q-btn
                class="tw-maxw-[200px] tw-mx-4 tw-w-[13vw]"
                @click="dialogShortDescriptionVisible = true"
                color="warning"
              >
                Edit Short Description
              </q-btn>

              <q-dialog v-model="dialogShortDescriptionVisible">
                <div class="tw-w-[700px]">
                  <TextInput
                    :initial_content="experience.short_description"
                    :input-props="{ type: 'textarea' }"
                    field_label="Short Description"
                    @form-validated="onValidateShortDescription"
                    @cancel="dialogShortDescriptionVisible = false"
                  ></TextInput>
                </div>
              </q-dialog>
            </div>
          </div>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ComputedExperienceType, useExperiences } from '../../home/composables';
import {
  updateExperienceShortDescription,
  updateExperienceTitle,
} from 'api-service';
import { supabase } from 'src/modules/supabase';
import { useEditionStore } from 'src/stores/edition';
import RelativeOverlay from 'src/modules/UI/components/RelativeOverlay.vue';
import TextInput from 'src/modules/UI/components/form/TextInput.vue';
const props = defineProps<{
  experience: ComputedExperienceType;
}>();

const editionStore = useEditionStore();

const { refetch } = useExperiences();

const dialogTitleVisible = ref(false);
const onValidateTitle = async (value: string) => {
  if (props.experience === undefined) return;
  console.log('Validating');
  dialogTitleVisible.value = false;
  const success = await updateExperienceTitle(supabase).call({
    experience_slug: props.experience.slug,
    content: value,
    lang: 'fr',
  });
  refetch();

  if (success) console.log('Successfully run update');
};

const dialogShortDescriptionVisible = ref(false);
const onValidateShortDescription = async (value: string) => {
  if (props.experience === undefined) return;
  console.log('Validating');
  dialogShortDescriptionVisible.value = false;
  const success = await updateExperienceShortDescription(supabase).call({
    experience_slug: props.experience.slug,
    content: value,
    lang: 'fr',
  });
  refetch();
  if (success) console.log('Successfully run update');
};
</script>

<style scoped></style>
