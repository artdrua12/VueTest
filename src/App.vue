<template>
  <div id="app">
    <!-- <app-counter number="1" counterview="firstCounter">
      <p @click="clickSumma()">Сумма</p>
    </app-counter>
    <app-counter number="2" >
      <p @click="clickConst()">Константа</p>
    </app-counter>
    <app-counter number="3"></app-counter>-->
    <app-control number="1" counterview="firstCounter">
      <p @click="clickSumma()">Сумма</p>
    </app-control>
    <app-control number="2">
      <p @click="clickConst()">Константа</p>
    </app-control>
    <app-control number="3"></app-control>
  </div>
</template>

<script>
import Counter from "./Counter";
import Control from "./Control";
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    clickConst() {
      this.$store.commit("setCounter", {
        countervalue: 1000,
        counterview: "counter"
      });
    },
    clickSumma() {
      let val = this.$store.getters.computedCounter;
      this.$store.commit("setCounter", {
        countervalue: val * 2,
        counterview: "firstCounter"
      });
    }
  },
  components: {
    appCounter: Counter,
    appControl: Control
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
}
</style>
