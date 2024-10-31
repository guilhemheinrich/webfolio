import { type DefineComponent } from 'vue';

declare module 'vue3-markdown' {
  // Déclarez les types ici si vous en connaissez.
  // Si vous ne connaissez pas les types exacts, vous pouvez utiliser `any` comme type générique.
  export const VMarkdownView: DefineComponent;
  export const VMarkdownEditor: DefineComponent;
}
