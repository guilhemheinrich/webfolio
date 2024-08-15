<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <div class="tw-w-[700px]">
      <q-card>
        <q-card-section>
          This action will delete the entire experience {{ experience_slug }}.
          Are you sure ?</q-card-section
        >
        <q-card-actions align="around">
          <q-btn color="secondary" @click="onDialogCancel()">
            Nop, my bad
          </q-btn>
          <q-btn color="primary" @click="onDeleteExperience(experience_slug)">
            Yes, delete !
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { deleteOneExperience } from 'api-service/src/client/Experience/deleteOne';
import { useDialogPluginComponent } from 'quasar';
import { supabase } from 'src/modules/supabase';

defineProps<{
  experience_slug: string;
}>();

defineEmits(useDialogPluginComponent.emits);
const { dialogRef, onDialogHide, onDialogCancel, onDialogOK } =
  useDialogPluginComponent();

const onDeleteExperience = async (experience_slug: string) => {
  const success = await deleteOneExperience(supabase).call({
    experience_slug: experience_slug,
  });
  if (success) {
    console.log('Successfully deleted experience', experience_slug);
    onDialogOK();
  } else {
    onDialogCancel();
  }
};
</script>

<style scoped></style>
