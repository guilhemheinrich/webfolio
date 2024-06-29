import { defineStore, acceptHMRUpdate } from 'pinia';
import { Config } from 'src/modules/configuration';
import { Ref, computed, ref } from 'vue';

export const useEditionStore = defineStore('edition-store', () => {
  console.log('plop');
  console.log(Config.DEV);

  if (!sessionStorage.getItem('editionStore'))
    sessionStorage.setItem('editionStore', 'true');
  console.log('storage', sessionStorage.getItem('editionStore'));
  const editable: Ref<boolean> = ref(
    Boolean(
      JSON.parse(sessionStorage.getItem('editionStore') ?? '') ?? Config.DEV,
    ),
  );
  console.log('init edition store');
  // Define custom getters and setters
  const editableComputed = computed({
    get() {
      return editable.value;
    },
    set(value: boolean) {
      console.log('in here');
      if (!Config.DEV) return;
      editable.value = value; // Assure that nobody can swap to editable maliciously
      // Ajoutez ici toute logique que vous souhaitez exécuter lors de la définition de "editable"
      console.log(`editable a été défini à ${JSON.stringify(value)}`);
      sessionStorage.setItem('editionStore', JSON.stringify(value));
      console.log(
        'edited edition store',
        Boolean(JSON.parse(sessionStorage.getItem('editionStore') ?? '')),
      );
    },
  });
  return {
    editable: editableComputed,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditionStore, import.meta.hot));
}
