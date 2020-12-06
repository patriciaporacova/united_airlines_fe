import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        airlines: [],
    },
    mutations: {
        SET_AIRLINES(state, payload) {
            state.airlines = payload;
        },
    },
    getters: {
        airlines: (state) => state.airlines,
    },
    actions: {
        fetchAirlines({commit}) {
            axios.get('https://unitedairlinesassociation.azurewebsites.net/users/').then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    commit('SET_AIRLINES', response.data);
                }
            })
        },
    }

})
