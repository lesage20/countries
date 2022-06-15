<template>
  <q-page
    :padding="$q.platform.is.desktop"
    :class="{ 'bg-grey-1': !$q.dark.mode }"
  >
    <div class="row q-px-lg justify-between">
      <div
        :class="{
          'col-xs-12 col-sm-12 bg-white  col-md-4': !$q.dark.mode,
          'col-xs-12 col-sm-12 body--dark col-md-4': $q.dark.mode,
          'q-py-md': $q.screen.lt.md,
        }"
      >
        <q-input
          ref="input"
          borderless
          standout
          dense
          :dark="$q.dark.mode"
          :class="{
            'shadow-1 bg-light text-dark rounded-borders': !$q.dark.mode,
            'shadow-1 bg-dark text-light': $q.dark.mode,
          }"
          v-model.lazy="search"
          label="Search for a country"
          @keyup.enter="startSearch"
        >
          <template #prepend>
            <q-icon color="grey" right class="q-ml-sm" name="search"> </q-icon>
          </template>
        </q-input>
      </div>

      <div class="col-xs-12 col-md-2">
        <q-select
          v-model="filter"
          borderless
          :class="{
            'shadow-1 bg-white text-dark rounded-borders': !$q.dark.mode,
            'shadow-3 bg-dark text-light rounded-borders': $q.dark.mode,
          }"
          dense
          label="Filter by"
          :options="['name', 'region', 'subregion', 'population']"
        >
          <template #label>
            <p class="q-ml-sm text-center">filter by</p>
          </template>
        </q-select>
      </div>
    </div>
    <div class="row q-py-md justify-center">
      <div
        class="col-xs-12 q-pa-lg col-sm-6 col-md-3"
        v-for="country in countries"
        :key="country.name"
      >
        <q-card :class="{ 'bg-dark': $q.dark.mode }">
          <q-img height="150px" :src="country.flags.png" />

          <q-card-section class="q-pb-sm">
            <q-btn
              no-caps
              :to="{ name: 'detail', params: { name: country.name.common } }"
              class="text-h6 q-pl-none cursor-pointer"
              flat
            >
              {{ country.name.common }}
            </q-btn>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Population: {{ country.population }} <br />
            Region: {{ country.region }} <br />
            Capital: {{ country.capital ? country.capital[0] : "" }} <br />
          </q-card-section>
        </q-card>
      </div>
      <q-card> </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, onMounted, reactive } from "vue";
import axios from "axios";
import { useQuasar, QSpinnerFacebook } from "quasar";

const $q = useQuasar();
const countries = ref([]);
var countriesCopy = [];

const input = ref();
function getCountries() {
  const dialog = $q.dialog({
    message: "Veuilez patienter pendant que nous recupérons les données",
    title: "Récuperation de données",
    progress: {
      spinner: QSpinnerFacebook,
      color: "primary",
    },
    persistent: true,
    class: $q.dark.mode ? "bg-dark" : "",

    ok: false,
  });
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((res) => {
      countries.value = res.data;
      countriesCopy = [...res.data];
      dialog.hide();
    })
    .catch((err) => {
      console.dir(err);
      dialog.hide();
    });
}

onMounted(getCountries);
const filter = ref("");
watch(filter, () => {
  if (filter.value == "name") {
    countries.value.sort((a, b) => {
      if (a.name.common < b.name.common) return -1;
      else if (a.name.common > b.name.common) return 1;
      return 0;
    });
  }
  countries.value.sort((a, b) => {
    if (a[filter.value] < b[filter.value]) return -1;
    else if (a[filter.value] > b[filter.value]) return 1;
    return 0;
  });
});

const search = ref("");

function startSearch() {
  countries.value = countriesCopy.filter((country) =>
    country.name.common.toLowerCase().includes(search.value.toLowerCase())
  );
}
</script>
