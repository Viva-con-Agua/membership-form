import api from './api.js'
const membership = {
    namespaced: true,
    state: () => ({
        id: null,
    }),
    mutations: {
        create(state, val) {
            state.id = val.id
        }
    },
    actions: {
        async process({dispatch, state}) {
            if (state.id != null) {
                await dispatch("update")
            } else {
                await dispatch("create")
            }
        },
        create({rootState, commit}) {
            var data = {
                contact: rootState.payment.contact,
                form_id: rootState.form.current.id,
                payment_id: rootState.payment.payment_id
            }
            return new Promise((resolve, reject) => {
                api.call.post('/v1/membership/member', data)
                .then((response) => {
                    commit("create", response.data.payload)
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
            })
        },
        update({rootState, state}) {
            var data = {
                id: state.id,
                contact: rootState.payment.contact,
                form_id: rootState.form.current.id,
                payment_id: rootState.payment.payment_id
            }
            return new Promise((resolve, reject) => {
                api.call.put('/v1/membership/member', data)
                .then((response) => {
                    commit("create", response.data.payload)
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
            })
        },


    }

}

export default membership
