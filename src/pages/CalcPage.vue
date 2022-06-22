<template>
  <q-page padding class="flex flex-center">
    <q-card dark flat style="width: 500px; height: 350px">
      <div class="row">
        <div class="col-12 q-pa-sm">
          <q-input
            @keyup.capture="pressedMe"
            borderless
            :dark="false"
            class="bg-grey-3 rounded-borders q-pa-sm text-h4 content-end items-end justify-end"
            v-model="input"
            readonly
          ></q-input>
        </div>
        <div class="col-9">
          <div class="row">
            <div class="col-4 q-pa-sm">
              <q-btn
                @click="chain = !chain"
                unelevated
                class="full-width text-dark"
                :color="chain ? 'orange' : 'grey-5'"
              >
                enchaine
                <q-tooltip class="text-body1">
                  Une fois activée le calcul se poursuit après avoir obtenu le
                  resultat
                </q-tooltip>
              </q-btn>
            </div>
            <div class="col-4 q-pa-sm">
              <q-btn
                unelevated
                @click="reset"
                class="full-width text-dark"
                color="grey-5"
              >
                CE
              </q-btn>
            </div>
            <div class="col-4 q-pa-sm">
              <q-btn
                icon="backspace"
                unelevated
                @click="backspace"
                class="full-width text-dark"
                color="grey-5"
              >
              </q-btn>
            </div>
          </div>
          <div class="row reverse justify-center">
            <div class="col-4 q-pa-sm" v-for="i in 9" :key="i">
              <q-btn
                unelevated
                color="grey-3"
                @click="insertNumber(10 - i)"
                class="full-width text-dark"
              >
                {{ 10 - i }}
              </q-btn>
            </div>
          </div>
          <div class="row">
            <div class="col-4 q-pa-sm">
              <q-btn
                unelevated
                color="grey-3"
                @click="insertNumber(0)"
                class="full-width text-dark"
              >
                {{ 0 }}
              </q-btn>
            </div>
            <div class="col-4 q-pa-sm">
              <q-btn
                @click="insertPoint"
                unelevated
                color="grey-3"
                class="full-width text-dark"
              >
                {{ "." }}
              </q-btn>
            </div>
            <div class="col-4 q-pa-sm">
              <q-btn
                @click="giveAnswer"
                unelevated
                color="primary"
                class="full-width"
              >
                {{ "=" }}
              </q-btn>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="row">
            <div class="col-12 q-pa-sm">
              <q-btn unelevated class="full-width text-dark" color="grey-5">
                %
                <q-tooltip class="text-body1">
                  j'avais la paresse de faire
                </q-tooltip>
              </q-btn>
            </div>
            <div
              class="col-12 q-pa-sm"
              v-for="op in ['/', 'x', '-', '+']"
              :key="op"
            >
              <q-btn
                unelevated
                color="grey-5"
                @click="insertOperator(op)"
                class="full-width text-dark"
              >
                {{ op }}
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref, computed } from "vue";
const input = ref("0");
const last = computed(() => input.value.trim().charAt(input.value.length - 1));
const result = ref(0);
const resulted = ref(false);
const chain = ref(false);

function insertNumber(number) {
  if (resulted.value) {
    input.value = "0";
    resulted.value = false;
  }
  if (input.value == "0") {
    input.value = String(number);
  } else {
    input.value = String(input.value) + String(number);
  }
}
function insertOperator(op) {
  if (input.value.length == 1 && input.value == 0) {
    if (!"-+".includes(op)) {
      return "";
    } else {
      input.value = op;
      return;
    }
  }
  if ("/x+-".includes(last)) {
    if (last.value == op) {
      //
    } else if (input.value.length == 1) {
      if (!"-+".includes(op)) {
        //
      } else {
        input.value = op;
      }
    } else {
      input.value =
        input.value.substring(0, input.value.lastIndexOf(last)) + op;
    }
  } else {
    input.value = String(input.value) + " " + String(op) + " ";
  }
}

function reset() {
  input.value = "0";
  result.value = 0;
}
function convertToNumber(x) {
  if ("+-/x".includes(x.trim())) return x;
  return Number(x.trim());
}

function giveAnswer() {
  input.value = input.value.trim();
  if ("/x-+".includes(last)) {
    input.value = input.value.substring(0, input.value.lastIndexOf(last));
  }
  const numbers = input.value.split(" ").map((x) => convertToNumber(x));
  let prev = 0;
  let sign = "+";
  for (let i in numbers) {
    if (i == 0) {
      if (typeof numbers[i] == "number") {
        prev = numbers[i];
      }
    } else {
      if (typeof numbers[i] == "string") {
        sign = numbers[i];
      } else {
        if (sign == "+") {
          prev += numbers[i];
        } else if (sign == "-") {
          prev -= numbers[i];
        } else if (sign == "x") {
          prev *= numbers[i];
        } else if (sign == "/") {
          if (numbers[i] == 0) {
            prev = prev / 1;
          } else {
            prev = prev / numbers[i];
          }
        }
      }
    }
  }
  result.value = prev;
  input.value = String(result.value);
  if (!chain.value) {
    resulted.value = true;
  }
}
function backspace() {
  input.value = input.value.substring(0, input.value.length - 1);
  if (!input.value.length) {
    input.value = "0";
  }
}
function insertPoint() {
  if (resulted.value) {
    input.value = "0";
    resulted.value = false;
  }
  if (
    !Boolean(last.value == ".") &&
    !Boolean(
      input.value
        .trim()
        .split(" ")
        [input.value.trim().split(" ").length - 1].includes(".")
    )
  ) {
    input.value += ".";
  }
}

function pressedMe(e) {
  if (e.key == "Backspace") {
    backspace();
    return;
  } else if ("/-+x".includes(e.key)) {
    insertOperator(e.key);
    return;
  } else if (e.key == ".") {
    insertPoint();
  }
  for (let i in [...Array(10).keys()]) {
    if (i == e.key) {
      insertNumber(Number(i));
    }
  }
}
</script>
