<template>
  <div class="app" @click="show=false" tabindex="-1">
    <h2>Контролл {{number}}</h2>
    <h2 :tabindex="number" v-show="!show" @click.stop="showClick">
      {{counterSpace}}
      <i class="material-icons">keyboard_arrow_down</i>
    </h2>
    <div v-show="show">
      <div class="inputAdvance">
        <input
          tabindex="-1"
          :value="counter"
          ref="refInput"
          @focus="onFocus"
          @input="onInput"
          @keypress="onKeypress"
          @keydown="onKeydown"
          @click.stop="inputClick"
        />
        <i class="top material-icons" @click.stop.prevent="updateCount(1)">arrow_drop_up</i>
        <i class="bottom material-icons" @click.stop.prevent="updateCount(-1)">arrow_drop_down</i>
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
    number: "",
    oldValue: ""
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
        this.show = false;
      }
      if (code < 48 || code > 57) {
        e.preventDefault();
      }
    },
    onKeydown(e) {
      let code = e.charCode || e.keyCode;
      switch (code) {
        case 40:
          this.updateCount(-1);
          e.preventDefault();
          break;
        case 38:
          this.updateCount(1);
          e.preventDefault();
          break;
        case 27:
          this.show = false;
          this.$store.commit("setCounter", {
            countervalue: this.oldValue,
            counterview: this.counterview
          });
          break;
        case 9:
          this.show = false;
          break;
        default:
          break;
      }
    },
    onFocus() {
      this.oldValue = this.$store.state[this.counterview];
    },
    showClick() {
      this.show = true;
      setTimeout(() => {
        this.$refs.refInput.select();
      }, 50);
    },
    updateCount(value) {
      this.$refs.refInput.focus();
      this.$store.commit("changeCounter", {
        countervalue: value,
        counterview: this.counterview
      });
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
  width: 500px;
  height: 50px;
  padding: 30px;
}
.app:focus {
  outline: none;
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
  user-select: none;
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
h2:nth-child(2):hover {
  color: rgb(16, 191, 197);
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