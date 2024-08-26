<template>
  <header class="bg-primary text-white">
    <q-toolbar class="no-padding">
      <q-toolbar-title>
        <div
          class="row no-wrap items-center justify-between tw-h-[15dvh] tw-gap-8"
        >
          <figure style="height: 100%" class="col-grow q-mx-xl row">
            <router-link to="/" class="no-decoration">
              <q-img
                src="~assets/logo_lite.png"
                class="img-circle"
                alt="Profil's picture"
              ></q-img>
            </router-link>

            <figcaption class="img-caption text-secondary text-italic">
              &ldquo; Profil quote : Tell something quick about you &rdquo;
            </figcaption>
          </figure>

          <div class="column justify-between col-2 tw-h-full">
            <socials-component></socials-component>
          </div>
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </header>
</template>

<script setup lang="ts">
import SocialsComponent from './SocialsComponent.vue';
</script>

<style lang="scss" scoped>
$square-profil-dimension: 110px;

.img-container {
  min-width: $square-profil-dimension; /* La largeur de l'image */
  height: $square-profil-dimension; /* La hauteur est égale à la */
}

.img-circle {
  width: $square-profil-dimension; /* La largeur de l'image */
  height: $square-profil-dimension; /* La hauteur est égale à la largeur pour un ratio carré */
  object-fit: contain;
  border-radius: 50%; /* Cela transforme l'image en cercle */
  background-color: white;
  transform: scale(1.4);
}

.img-circle:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.6); /* Ombre plus intense au hover */
}

.img-caption {
  text-align: left;
  padding-left: $square-profil-dimension * 0.4;
}
</style>
