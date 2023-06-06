import api from '../api.js'
const stripe = {
    namespaced: true,
    state: () => ({
            status: "",
            terms: false,
            payment_method: null
    }),
    getters: {
        billing_details(state, getters, rootState) {
            if (rootState.payment.contact.email === "") {
                return {
                    name: rootState.payment.contact.first_name + ' ' + rootState.payment.contact.last_name,
                }
            }else{
                return {
                    name: rootState.payment.contact.first_name + ' ' + rootState.payment.contact.last_name,
                    email: rootState.payment.contact.email
                }
            }
        }
    },
    mutations: {
        status(state, val) {
            state.status = val
        },
        terms(state, val) {
            state.terms = val
        },
        payment_method(state, val) {
            state.payment_method = val
        }
    },
    actions: {
        payment_intent_create({state, rootState}) {
            var data = {
                payment_id: rootState.payment.payment_id,
                payment_type: rootState.payment.payment_type,
                terms: state.terms,
                status: "created"
            }
            return new Promise((resolve, reject) => {
                api.call.post('/v1/donations/payment/stripe/paymentintent', data)
                    .then((response) => {resolve(response)})
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        payment_intent_finish({rootState,state}) {
            var data = {
                payment_id: rootState.payment.payment_id,
                payment_type: rootState.payment.payment_type,
                payment_method: state.payment_method,
                terms: state.terms,
                status: state.status
            }
            return new Promise((resolve, reject) => {
                api.call.put('/v1/donations/payment/stripe/paymentintent', data)
                    .then((response) => {console.log(response), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        },

        setup_intent_create({state, rootState}) {
            var data = {
                payment_id: rootState.payment.payment_id,
                payment_type: rootState.payment.payment_type,
                terms: state.terms,
                interval: rootState.payment.interval,
                product_id: rootState.form.current.product.stripe_id

            }
            return new Promise((resolve, reject) => {
                api.call.post('/v1/donations/payment/stripe/setupintent', data)
                    .then((response) => {resolve(response)})
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        setup_intent_finish({rootState,state}) {
            var data = {
                payment_id: rootState.payment.payment_id,
                payment_method: state.payment_method,
                cycles: rootState.payment.cycles,
                status: state.status
            }
            return new Promise((resolve, reject) => {
                api.call.put('/v1/donations/payment/stripe/setupintent', data)
                    .then((response) => {console.log(response), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
}
export default stripe
