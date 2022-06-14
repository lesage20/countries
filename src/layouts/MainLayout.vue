<template>
  <q-layout view="HHh Lpr lFf">
    <q-header dark>
      <q-toolbar
        elevated
        :class="{
          'bg-white shadow-1 q-px-xl text-dark': !$q.dark.mode,
          'bg-dark shadow-1 q-px-xl text-white': $q.dark.mode,
        }"
      >
        <q-toolbar-title> Where in the world! </q-toolbar-title>

        <div>
          <q-btn flat @click="$q.dark.toggle" v-if="$q.dark.mode">
            <q-icon size="sm" name="dark_mode"></q-icon> Light Mode
          </q-btn>
          <q-btn flat v-else @click="$q.dark.toggle">
            <q-icon size="sm" name="nightlight" outlined></q-icon> Dark Mode
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useQuasar } from "quasar";
</script>
<style>
.body--dark {
  background: hsl(207, 26%, 17%) !important;
}
.body--light {
  color: hsl(200, 15%, 8%) !important;
}
.bg-dark {
  background: hsl(209, 23%, 22%) !important;
  color: hsl(0, 0%, 100%) !important;
  border-color: hsl(209, 23%, 22%) !important;
}
.text-dark {
  color: hsl(200, 15%, 8%) !important;
}
.text-light {
  color: hsl(0, 0%, 100%) !important;
}
</style>
