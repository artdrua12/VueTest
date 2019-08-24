<template>
  <div id="app">
    <app-control number="1" counterview="firstCounter">
      <p @click.stop="clickSumma()">Сумма</p>
    </app-control>
    <app-control number="2">
      <p @click.stop="clickConst()">Константа</p>
    </app-control>
    <app-control number="3"></app-control>
  </div>
</template>

<script>
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
    appControl: Control
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
}
</style>
