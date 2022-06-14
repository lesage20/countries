<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 q-pa-lg">
        <q-toolbar class="q-px-lg">
          <q-btn
            icon="keyboard_arrow_left"
            :class="{ 'bg-dark': $q.dark.mode }"
            @click="$router.back"
          >
            Go Back
          </q-btn>
        </q-toolbar>
        <q-card-section v-if="Object.keys(country).length > 0" horizontal>
          <q-img
            class="col-6 q-pa-lg q-ma-lg"
            height="300px"
            :src="country.flags.png"
            contain
            ration="4/16"
          />
          <div class="text-body1 row">
            <div class="col-xs-12">
              <h4 class="q-mb-sm">{{ country.name.common }}</h4>
            </div>
            <div class="col-xs-12 col-sm-6">
              <b> Native Name: </b>

              {{
                country.name.nativeName[Object.keys(country.name.nativeName)[0]]
                  .common
              }}
              <br />
              <b> Population: </b>{{ country.population }} <br />
              <b> Region: </b>{{ country.region }} <br />
              <b> Sub Region: </b>{{ country.subregion }} <br />
              <b> capital: </b>{{ country.capital[0] }} <br />
            </div>
            <div class="col-xs-12 col-sm-6">
              <b> Top level domain: </b>
              <span v-for="domain in country.tld" :key="domain">
                {{ domain }}
              </span>
              <br />
              <b> Region: </b>
              <span v-for="cur in country.currencies" :key="cur">
                {{ cur.name }}
              </span>
              <br />
              <b> Languages: </b>
              <span v-for="lang in country.languages" :key="lang">
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
                v-for="border in country.borders"
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
import { countrieStore as store } from "src/stores/general";
const country = ref({});
const route = useRoute();
console.log(store().countries[0].name, route.params.name);

function getCountries() {
  axios
    .get("https://restcountries.com/v3.1/name/" + route.params.name)
    .then((res) => {
      country.value = res.data;
      store().loadCountries(res.data);
    })
    .catch((err) => {
      console.dir(err);
    });
}

onMounted(getCountries);
</script>
