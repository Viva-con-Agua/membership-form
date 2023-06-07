import api from '../api.js'
import Money from 'vca-ui/src/utils/Money'

const paypal = {
        namespaced: true,
        state: () => ({
        subscription: {
            name: 'VcA Membership',
            description: 'VcA Membership PayPal subscription',
            interval: '',
            amount: '',
            currency: '',
            product_id: ''
        },
        plan_id:null,
        start_time: new Date().toISOString() ,
        status: null,
        checkout_id: null,
        invoice_id: null

    }),
    getters: {
        current(state) {
           return state.current
        },
        plan_id(state) {
            return state.plan_id
        },
        amount(state, commit, rootState) {
            return Money.getPayPalString(rootState.payment.money.amount)
        },
        currency(state, commit, rootState) {
            return rootState.payment.money.currency
        },
        items(state, commit, rootState) {
            return [
                {
                    name: rootState.form.current.name,
                    description: rootState.form.current.description,
                    quantity: "1",
                    price: Money.getPayPalString(rootState.payment.money.amount),
                    currency: rootState.payment.money.currency,

                }
            ]
        },
        start_time(state) {
            return state.start_time
        }
    },
    mutations: {
        product(state, val) {
            state.subscription.product_id = val
        },
        current(state, val) {
            state.current = val
        },
        checkout_id(state, val) {
            state.checkout_id = val
        },
        status(state, val) {
            state.status = val
        },
        plan_id(state, val) {
            state.plan_id = val
        },
        invoice_id(state, val) {
            state.invoice_id = val
        },
        start_time(state, val) {
            state.start_time = val
        }

    },
    actions: {
        checkout({rootState, state}) {
            var data = {
                payment_id: rootState.payment.payment_id,
                checkout_id: state.checkout_id,
                status: state.status
            }
            return new Promise((resolve, reject) => {
                    api.call.post('/payment/paypal/checkout', data)
                    .then((response) => {
                        if (response.status == 201) {
                            resolve()
                        }
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        subscription_create({rootState, commit}) {
            var data = {
                payment_id: rootState.payment.payment_id,
                interval: rootState.payment.interval,
                total_cycles: rootState.payment.cycles,
                product_id: rootState.form.current.product.paypal_id
            }
            return new Promise((resolve, reject) => {
                    api.call.post('/payment/paypal/subscription', data)
                    .then((response) => {
                            commit("plan_id", response.data.payload.subscription_plan_id)
                            commit("start_time", response.data.payload.start_time)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        subscription_finish({rootState, state}) {
            var data = {
                payment_id: rootState.payment.payment_id,
                invoice_id: state.invoice_id,
                status: state.status
            }
            return new Promise((resolve, reject) => {
                api.call.put('/payment/paypal/subscription', data)
                .then((response) => {
                        if (response.status == 200) {
                            resolve()
                        }
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}
export default paypal
