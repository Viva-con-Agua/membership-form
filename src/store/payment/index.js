import stripe from './stripe.js'
import civisepa from './civisepa.js'
import paypal from './paypal.js'
//import intent from './intent.js'
//import subscription from './subscription.js'
import api from '../api.js'
const payment = {
    namespaced: true,
    modules: {
        stripe: stripe,
        paypal: paypal,
        civisepa: civisepa
        //intent: intent,
        //subscription: subscription
    },
    state: {
        payment_id: null,
        money: {
            amount: 500,
            currency: 'EUR'
        },
        contact: {
            email: "",
            first_name: "",
            last_name: "",
            street: "",
            number: "",
            zip: "",
            city: "",
            country: "",
            company_name:""
        },
        payment_type: "",
        interval: "monthly",
        country: [],
        abo: false,
        cycles: 0,
        donation_receipt: false,
        trackingData: {
            event: "view_membership_form_step1",
            currency: undefined,
            donation_value: undefined,
            donation_interval: undefined,
            donation_per_year: undefined,
            yearly_donation_value: undefined,
            donation_customer_type: undefined,
        }
    },
    mutations: {
        create(state, val) {
            state.payment_id = val.id
        },
        money(state, val) {
            if (!val.currency) {
                val.currency = state.money.currency
            }
            state.money = val
            state.money.amount = parseInt(state.money.amount)
        },
        interval(state, val) {
            state.interval = val
        },
        cycles(state, val) {
            state.cycles = val
        },
        payment_type(state, val) {
            state.payment_type = val
        },
        default_amount(state, val) {
            if (val > 0) {
                var nVal = {
                    amount: val,
                    currency: state.money.currency
                }
                state.money = nVal
            }
        },
        contact(state, val) {
            state.contact = val
        },
        country(state, val) {
            state.country = val
        },
        abo(state, val) {
            state.abo = val
        },
        donation_receipt(state, val) {
            state.donation_receipt = val
        },
        trackingData(state, val) {
            var data = {
                event: val,
                currency: state.money.currency,
                donation_value: state.money.amount / 100,
                donation_interval: "recurring",
                donation_per_year: 1,
                yearly_donation_value: undefined,
                donation_customer_type: undefined,
            }
                switch(state.interval) {
                    case "monthly":
                        data.donation_per_year = 12
                        break
                    case "quarterly":
                        data.donation_per_year = 4
                        break
                    case "half":
                        data.donation_per_year = 2
                        break
                    default:
                        data.donation_per_year = 1
                }
            data.yearly_donation_value = data.donation_value * data.donation_per_year
            if (state.contact.email !== "") {
                if (state.contact.company_name === "") {
                    data.donation_customer_type = "private"
                } else {
                    data.donation_customer_type = "business"
                }
            }
            state.trackingData = data
        }
    },
    getters: {
        money (state) {
            return state.money
        },
        cycles(state) {
            return state.cycles
        },
        interval(state) {
            return state.interval
        },
        payment_type(state) {
            return state.payment_type
        },
        contact(state) {
            return state.contact
        },
        abo(state) {
            return state.abo
        },
        payment_id(state) {
            return state.payment_id
        },
        donation_receipt(state) {
            return state.donation_receipt
        },
        trackingData(state) {
            return JSON.parse(JSON.stringify(state.trackingData))
        }
    },
    actions: {

        async process({dispatch, state}) {
            if (state.payment_id != null) {
                await dispatch("update")
            } else {
                await dispatch("create")
            }
        },
        create({rootState, state, commit}) {
            console.log(state.country)
            var country = state.country.length > 0 && state.country[0] ? state.country[0].value : 'DE'
            var data = {
                money: state.money,
                contact: state.contact,
                donation_form_id: rootState.form.current.id
            }
            data.contact.country = country
            return new Promise((resolve, reject) => {
                api.call.post(process.env.VUE_APP_BACKEND_CONTEXT + '/payment', data)
                    .then((response) => {commit("create", response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        update({rootState, state}) {
            var country = state.country.length > 0 && state.country[0] ? state.country[0].value : 'DE'
            var data = {
                id: state.payment_id,
                money: state.money,
                contact: state.contact,
                donation_form_id: rootState.form.current.id
            }
            data.contact.country = country
            return new Promise((resolve, reject) => {
                api.call.put(process.env.VUE_APP_BACKEND_CONTEXT + '/payment', data)
                    .then((response) => {console.log(response), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
}
export default payment
