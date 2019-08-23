<template>
  <div class="app" @click.self="show=false">
    <h2>Контролл {{number}}</h2>
    <h2 v-show="!show" @click="show=true">
      {{counterSpace}}
      <i @click="show=true" class="material-icons">keyboard_arrow_down</i>
    </h2>
    <div v-show="show">
      <div class="inputAdvance">
        <input
          :value="counter"
          ref="refInput"
          @input="onInput"
          @keypress="onKeypress"
          @click="inputClick"
        />
        <i class="top material-icons" @click="updateCount(1)">arrow_drop_up</i>
        <i class="bottom material-icons" @click="updateCount(-1)">arrow_drop_down</i>
      </div>
      <slot class="slot"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    counterview: {
      default: "counter"
    },
    number: ""
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    onKeypress(e) {
      let code = e.charCode || e.keyCode;
      if (code == 13) {
        alert("Enter");
      }
      if (code == 9) {
        alert("Esc");
      }
      if (code < 48 || code > 57) {
        e.preventDefault();
      }
    },
    updateCount(value) {
      this.$store.commit("changeCounter", {
        countervalue: value,
        counterview: this.counterview
      });
      this.$refs.refInput.focus();
    },
    onInput({ target }) {
      let val = +target.value;
      this.$store.commit("setCounter", {
        countervalue: val,
        counterview: this.counterview
      });
    },
    inputClick(e) {
      e.target.select();
    }
  },
  computed: {
    counter() {
      return this.$store.state[this.counterview];
    },
    counterSpace() {
      let str = new String(this.counter).split("").reverse();
      for (let i = 0; i < str.length; i += 4) {
        str.splice(i, 0, " ");
      }
      return str.reverse().join("");
    }
  }
};
</script>

<style scoped>
.app {
  display: flex;
  width: 450px;
  height: 50px;
  padding: 30px;
}
.inputAdvance {
  width: 220px;
  height: 40px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 2px solid gainsboro;
  background-color: #f8f8f8;
  overflow: hidden;
}
.material-icons {
  font-size: 20px;
  padding: 0px;
}

.slot {
  margin: 0 10px;
}
h2 {
  color: grey;
  margin: 10px 0 0 0;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: normal;
}
h2:first-child {
  width: 200px;
}

input {
  margin: 0 0px 0 10px;
  flex-basis: 100%;
  width: 180px;
  font-size: 20px;
  border: none;
  background-color: #f8f8f8;
}
input:focus {
  outline: none;
}
p {
  color: royalblue;
  margin: 0 10px;
}
</style>