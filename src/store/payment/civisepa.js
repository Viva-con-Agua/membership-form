//import api from '../api.js'
const civisepa = {
    namespaced: true,
    state: () => ({
        account: {
            iban: "",
            bic: ""
        },
        terms: false
    }),
    mutations: {
        account(state, val) {
            state.account = val
        },
        terms(state, val) {
            state.terms = val
        }
    },
    getters: {
        account(state) {
            return state.account
        },
        terms(state) {
            return state.terms
        }
    },
    actions: {
    }
}
export default civisepa