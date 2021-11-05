<template>
    <div v-if="show" class="paypal-payment-container">
        <PayPal 
            ref="paypal"
            :client="credentials"
            :plan_id="plan_id"
            vault="true"
            @payment_authorized="purchase"
            @payment-completed="success"
            @payment-validation-error="validationError"
            @payment-error="error">
        </PayPal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PayPal from './PayPalSubscription'
export default {
    name: 'PayPalButton',
    components: {PayPal},
    props: ['valid'],
    computed : {
        ...mapGetters({
            plan_id: 'payment/paypal/plan_id',
            company: 'form/company'
        }),
    },
    data () {
        return {
            show: false,
            credentials: {
                sandbox: process.env.VUE_APP_PAYPAL_PUBLIC_KEY,
                production: process.env.VUE_PAYPAL_PUBLIC_KEY,
            },
        }
    },
    mounted() {
        var paypal = document.getElementById('paypalSubscription')
        if (paypal !== undefined) {
            let paypalScript = document.createElement('script')
            paypalScript.setAttribute('id', 'paypalSubscription')
            paypalScript.async = false
            paypalScript.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id=' + this.company.paypal_client_id + '&vault=true&disable-funding=credit,card,sepa,giropay,sofort&currency=EUR&intent=subscription')
            document.head.appendChild(paypalScript)
        }
    },
    methods: {
        success(e) {
            this.$store.commit("payment/paypal/checkout_id", e.id)
            console.log(e)
            this.$store.commit("payment/paypal/status", "done")
            this.$store.commit("payment/paypal/invoice_id", e)
            this.$store.dispatch("payment/paypal/subscription_finish").then(() => {
                this.$emit("success")
            }).catch(error => console.log(error))
        },
        error(e) {
            this.$store.commit("payment/paypal/status", e)
            this.$store.dispatch("payment/paypal/subscription_finish")
            this.$emit("error", e)
        },
        validationError() {
            this.$emit("not-valid")
        },
        purchase () {
            if (this.valid.$invalid === false ) {
                this.$refs.paypal 
            } else {
                this.$emit('not-valid')
            }
        }
    },
    created() {
        this.$store.dispatch('payment/paypal/subscription_create')
            .then( () => {
                this.show = true
            })
            .catch(error => {console.log(error)})
    }
}
</script>
<style>
.paypal-payment-container {
    text-align: center;
}
</style>
