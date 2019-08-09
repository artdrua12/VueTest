import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        firstCounter: 0,
        counter: 0
    },
    getters: {
        computedCounter(state) {
            return state.counter;
        }
    },
    mutations: {
        changeCounter(state, payload) {
            if (state[payload.counterview] + payload.countervalue >= 0) {
                state[payload.counterview] += payload.countervalue;
            } else {
                return
            }
        },
        setCounter(state, payload) {
            state[payload.counterview] = payload.countervalue;
        }
    }
})
