<template>
  <div class="app" @click.self="show=false">
    <h2>Контролл {{number}}</h2>
    <h2 v-show="!show">
      {{counterSpace}}
      <button @click="show=true">
        <i class="material-icons">keyboard_arrow_down</i>
      </button>
    </h2>
    <div v-show="show" class="show">
      <div class="newInput">
        <input
          ref="refInput"
          :value="counter"
          @keyup.enter.esc.tab="keyupClick"
          @input="onInput"
          @mouseover="mouseover"
        />
        <div class="button">
          <button @click="updateCount(1)">
            <i class="material-icons">arrow_drop_up</i>
          </button>
          <button @click="updateCount(-1)">
            <i class="material-icons">arrow_drop_down</i>
          </button>
        </div>
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
      show: false,
      oldValueInput: ""
    };
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
  },
  methods: {
    updateCount(value) {
      this.$store.commit("changeCounter", {
        countervalue: value,
        counterview: this.counterview
      });
      this.$refs.refInput.focus();
    },
    onInput({ target }) {
      let val = +target.value;
      if (val >= 0) {
        this.$store.commit("setCounter", {
          countervalue: val,
          counterview: this.counterview
        });
      } else {
        target.value = this.$store.getters.computedCounter;
      }
    },
    keyupClick(e) {
      if (e.keyCode === 27) {
        console.log("click Esc");
        this.$store.commit("setCounter", {
          countervalue: this.oldValueInput,
          counterview: this.counterview
        });
      } else if (e.keyCode === 9) {
        console.log("click Tab");
      }
      this.show = false;
    },
    mouseover() {
      this.oldValueInput = this.$store.state[this.counterview];
    }
  }
};
</script>

<style scoped>
.app {
  display: flex;
  align-items: center;
  border: 1px dashed gainsboro;
  margin: auto;
  padding: 20px 10px;
  width: 700px;
}
.newInput {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid gainsboro;
}
.show {
  display: flex;
  flex-direction: column;
}
.button {
  display: flex;
  flex-direction: column;
}

button {
  border: none;
  background-color: white;
}
button:active,
button:focus {
  outline: none;
}
input {
  font-size: 20px;
  border: none;
}
input:focus {
  outline: none;
}
h2:first-child {
  margin-right: 30px;
  color: rgb(133, 131, 131);
}
h2:nth-child(2):hover {
  color: red;
}
p {
  color: royalblue;
  margin: 0px;
}
</style>

