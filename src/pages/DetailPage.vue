<template>
  <q-page padding :class="{ 'bg-grey-1': !$q.dark.mode }">
    <div class="row">
      <div class="col-xs-12 q-pa-lg">
        <q-toolbar class="q-px-lg">
          <q-btn
            icon="keyboard_arrow_left"
            :class="{ 'bg-dark': $q.dark.mode }"
            @click="$router.back"
          >
            Go Back {{ Object.keys(selected.country).length > 2 }}
          </q-btn>
        </q-toolbar>
        <q-card-section
          v-if="Object.keys(selected.country).length > 2"
          horizontal
        >
          <q-img
            class="col-6 q-pa-lg q-ma-lg"
            height="300px"
            :src="selected.country.flags.png"
            contain
            ration="4/16"
          />
          <div class="text-body1 row">
            <div class="col-xs-12">
              <h4 class="q-mb-sm">{{ selected.country.name.common }}</h4>
            </div>
            <div class="col-xs-12 col-sm-6">
              <b> Native Name: </b>

              {{
                selected.country.name.nativeName[
                  Object.keys(selected.country.name.nativeName)[0]
                ].common
              }}
              <br />
              <b> Population: </b>{{ selected.country.population }} <br />
              <b> Region: </b>{{ selected.country.region }} <br />
              <b> Sub Region: </b>{{ selected.country.subregion }} <br />
              <b> capital: </b>{{ selected.country.capital[0] }} <br />
            </div>
            <div class="col-xs-12 col-sm-6">
              <b> Top level domain: </b>
              <span v-for="domain in selected.country.tld" :key="domain">
                {{ domain }}
              </span>
              <br />
              <b> Region: </b>
              <span v-for="cur in selected.country.currencies" :key="cur">
                {{ cur.name }}
              </span>
              <br />
              <b> Languages: </b>
              <span v-for="lang in selected.country.languages" :key="lang">
                {{ lang }}
              </span>
              <br />
            </div>
            <div class="col-xs-12">
              <b> Border Countries: </b>
              <q-chip
                square
                class="shadow-1"
                :class="{ 'bg-white': !$q.dark.mode, 'bg-dark': $q.dark.mode }"
                size="md"
                v-for="border in selected.country.borders"
                :key="border"
              >
                {{ border }}
              </q-chip>
            </div>
          </div>
        </q-card-section>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useQuasar, QSpinnerFacebook } from "quasar";

const $q = useQuasar();

const selected = reactive({ country: { flags: {}, name: {} } });
const route = useRoute();
function getCountries() {
  const dialog = $q.dialog({
    message: "Veuilez patienter pendant que nous recupérons les données",
    title: "Récuperation de données",
    progress: {
      spinner: QSpinnerFacebook,
      color: "primary",
    },
    persistent: true,
    ok: false,
    class: $q.dark.mode ? "bg-dark" : "",
  });
  axios
    .get("https://restcountries.com/v3.1/name/" + route.params.name)
    .then((res) => {
      selected.country = res.data[0];
      dialog.hide();
    })
    .catch((err) => {
      console.dir(err);
      dialog.hide();
    });
}

onMounted(getCountries);
</script>
