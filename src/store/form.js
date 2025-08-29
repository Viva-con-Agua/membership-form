import api from './api.js'
import payment from './payment'

const form = {
    namespaced: true,
    modules: {
        payment: payment
    },
    state: () => ({
        setting: "",
        current: {
            product: null,
            type: "member",
            min_amount: 500,
            payment_types: [
                { name: 'civisepa', title: 'payment.type.sepa', default: true },
                { name: 'sepa', title: 'payment.type.sepa' },
                { name: 'creditcard', title: 'payment.type.creditcard' },
                { name: 'paypal', title: 'payment.type.paypal' }
            ],
            subscription_types: [
                { name: 'civisepa', title: 'payment.type.sepa', default: true },
                { name: 'sepa', title: 'payment.type.sepa' },
                { name: 'creditcard', title: 'payment.type.creditcard' },
                { name: 'paypal', title: 'payment.type.paypal' }
            ]
        }
    }),
    getters: {
        product(state) {
            return state.current.product
        },
        minAmount(state) {
            return (state.payment.interval == 'monthly') ? state.current.min_amount : state.current.min_amount * 12
        },
        paymentTypes(state) {
            return state.current.payment_types
        },
        subscriptionTypes(state) {
            return state.current.subscription_types
        },
        company(state) {
            return state.current.company
        },
        setting(state) {
            return state.setting
        },
        deprecated(state) {
            return state.current.deprecated;
        }
    },
    mutations: {
        get(state, value) {
            state.current = value
        },
        setting(state, value) {
            state.setting = value
        }
    },
    actions: {
        get({commit}, data) {
            return new Promise((resolve, reject) => {
                api.call.get(process.env.VUE_APP_BACKEND_CONTEXT + '/form/' + data.data)
                    .then((response) => {
                        commit('get', response.data.payload), commit('payment/default_amount', response.data.payload.default_amount, {root: true}), resolve()
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    },
}

export default form
