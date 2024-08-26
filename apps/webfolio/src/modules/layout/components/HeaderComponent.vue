<template>
  <header class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <div class="row no-wrap gt-sm items-center tw-h-[15dvh] tw-gap-8">
          <q-img
            src="~assets/logo_lite.png"
            class="img-circle tw-w-8/12"
            alt="Profil's picture"
          ></q-img>

          <div style="height: 100%">
            <h2 class="profil_quote">
              Profil quote : Tell something quick about you
            </h2>
          </div>

          <div class="column justify-between tw-h-full">
            Contacts

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
                <a :href="`mailto:${Config.CONTACT_MAIL}`" aria-label="Email">
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
          </div>
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </header>
</template>

<script setup lang="ts">
import { Config } from 'src/modules/configuration';
</script>

<style lang="scss" scoped></style>
