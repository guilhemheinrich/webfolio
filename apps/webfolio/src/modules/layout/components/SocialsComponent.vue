<template>
  <ul class="row tw-gap-2">
    <!-- Bouton GitHub -->
    <li v-if="Config.GITHUB_PROFIL">
      <a
        :href="Config.GITHUB_PROFIL"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <q-icon name="fa-brands fa-github" size="lg" />
      </a>
    </li>

    <!-- Bouton LinkedIn -->
    <li v-if="Config.LINKDIN_PROFIL">
      <a
        :href="Config.LINKDIN_PROFIL"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <q-icon name="fa-brands fa-linkedin" size="lg" />
      </a>
    </li>

    <!-- Bouton Facebook -->
    <li v-if="Config.FACEBOOK_PROFIL">
      <a
        :href="Config.FACEBOOK_PROFIL"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <q-icon name="fa-brands fa-facebook" size="lg" />
      </a>
    </li>

    <!-- Bouton Twitter -->
    <li v-if="Config.TWITTER_PROFIL">
      <a
        :href="Config.TWITTER_PROFIL"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <q-icon name="fa-brands fa-x-twitter" size="lg" />
      </a>
    </li>

    <!-- Bouton Email -->
    <li v-if="Config.CONTACT_MAIL">
      <a
        :href="`mailto:${Config.CONTACT_MAIL}?subject=Contact`"
        aria-label="Email"
        target="_blank"
      >
        <q-icon name="fa-solid fa-envelope" size="lg" />
      </a>
    </li>

    <!-- Discord server // not yet -->
    <!-- <li v-if="Config.DISCORD_SERVER">
                <a
                  :href="Config.DISCORD_SERVER"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                >
                  <q-icon name="fa-brands fa-discord" size="lg" />
                </a>
              </li> -->

    <!-- Bouton Instagram -->
    <li v-if="Config.INSTAGRAM_PROFIL">
      <a
        :href="Config.INSTAGRAM_PROFIL"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <q-icon name="fa-brands fa-instagram" size="lg" />
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Config } from 'src/modules/configuration';
</script>

<style scoped></style>
