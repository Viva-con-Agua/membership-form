<template>
    <vca-field :label="$t('payment.more_details')">
        <div class="stripe-payment-container">
            <div class="vca-input-border"><div ref="card" class="stripe-payment"></div></div>
        </div>
    </vca-field>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
    name: 'StripeSubscriptionCreditCard',
    props: ['product'],
    data() {
        return {
            stripe: null,
            elements: null,
            element: null,
            cardInvalid: true,
            options: {
                style: {
                    base: {
                        color: '#32325d',
                        '::placeholder': {
                            color: '#aab7c4'
                        },
                        ':-webkit-autofill': {
                            color: '#32325d',
                        },
                    },
                    invalid: {
                        color: '#ff5522',
                        iconColor: '#ff5522',
                        ':-webkit-autofill': {
                            color: '#ff5522',
                        },
                    },
                    empty: {
                        color: '#0a6b91',
                        iconColor: '#0a6b91',
                        ':-webkit-autofill': {
                            color: '#0a6b91',
                        },
                    },
                }
            }
        }
    },
    mounted () {
        this.element.mount(this.$refs.card)
    },
    created() {
        this.stripe = window.Stripe(this.company.stripe_public_key)
        this.elements = this.stripe.elements()
        this.element = this.elements.create('card', this.options)

        this.element.on('change', (event) => {
            if (!event.complete) {
                this.cardInvalid = true
            } else {
                this.cardInvalid = false
            }
            this.$emit('isInvalid', this.isInvalid)
        })

        this.$emit('isInvalid', this.isInvalid)
    },
    computed: {
        isInvalid() {
            return this.cardInvalid
        },
        ...mapGetters({
            billing_details: 'payment/stripe/billing_details',
            company: 'form/company'
        })
    },
    methods: {
        stripeRequestCard(client_secret) {
            this.stripe.confirmCardSetup(client_secret, {
                payment_method: {
                    card: this.element,
                    billing_details: this.billing_details
                }
            }).then(result => {
                this.result(result)
            });
        },
         purchase () {
            if (!this.isInvalid) {
                console.log("purchase")
                this.$store.dispatch('payment/stripe/setup_intent_create')
                    .then(response => (
                        this.stripeRequestCard(response.data.payload.setup_intent.client_secret)
                    ))
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                console.log("isInvalid == true")
            }
         },
        result(result) {
            if (result.error) {
                this.$store.commit("payment/stripe/status", result.error.message)
                this.$store.dispatch("payment/stripe/setup_intent_finish")
                        .then(()=>{this.$emit('error', result.error)})
                        .catch((err) => {console.log(err), this.$emit("error", err)})
            } else {
                console.log(result)
                // The payment has been processed!
                if (result.setupIntent.status === 'succeeded') {
                    this.$store.commit("payment/stripe/status", "done")
                    this.$store.commit("payment/stripe/payment_method", result.setupIntent.payment_method)
                    this.$store.dispatch("payment/stripe/setup_intent_finish").catch(err => {console.log(err)})
                        .then(()=>{this.$emit('success')})
                        .catch((err) => { this.$emit("error", err)})
                }
            }
        }


    }


}
</script>
