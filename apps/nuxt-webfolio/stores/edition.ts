import { defineStore, acceptHMRUpdate } from "pinia";
import { useConfig } from "@composables/configuration";
import { type Ref, computed, ref } from "vue";

export const useEditionStore = defineStore(
    "edition-store",
    (): { editable: boolean } => {
        const Config = useConfig();
        if (!process.env.CLIENT)
            return {
                editable: true,
            };
        if (!sessionStorage.getItem("editionStore"))
            sessionStorage.setItem("editionStore", "true");
        const editable: Ref<boolean> = ref(
            Boolean(
                JSON.parse(sessionStorage.getItem("editionStore") ?? "") ??
                    Config.ADMIN,
            ),
        );
        // Define custom getters and setters
        const editableComputed = computed({
            get() {
                return editable.value && Config.ADMIN;
            },
            set(value: boolean) {
                if (!Config.ADMIN) return;
                editable.value = value; // Assure that nobody can swap to editable maliciously
                // Ajoutez ici toute logique que vous souhaitez exécuter lors de la définition de "editable"
                sessionStorage.setItem("editionStore", JSON.stringify(value));
            },
        });
        return {
            editable: editableComputed as unknown as boolean,
        };
    },
);

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useEditionStore, import.meta.hot));
}
