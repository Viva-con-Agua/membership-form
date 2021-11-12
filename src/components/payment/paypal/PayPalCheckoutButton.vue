<template>
    <div class="paypal-payment-container">
        <vca-field :label="$t('payment.more_details')">
            <PayPal 
                ref="paypal"
                :amount="amount"
                :currency="currency"
                :client="credentials"
                :items="items"
                @payment_authorized="purchase"
                @payment-completed="success"
                @payment-validation-error="validationError">
            </PayPal>
        </vca-field>
    </div>
</template>

<script>
import PayPal from './PayPalCheckout'
import { mapGetters } from 'vuex'
export default {
    name: 'PayPalButton',
    components: {PayPal},
    computed : {
        ...mapGetters({
            items: 'payment/paypal/items',
            amount: 'payment/paypal/amount',
            currency: 'payment/paypal/currency',
            company: 'form/company'
        }),
    },
    data () {
        return {
            credentials: {
                sandbox: process.env.VUE_PAYPAL_PUBLIC_KEY_SANDBOX,
                production: process.env.VUE_PAYPAL_PUBLIC_KEY_PRDOUCTION
            }
        }
    },
    mounted() {
      var paypal = document.getElementById('paypalCheckout')
      if (paypal !== undefined) {
        let paypalScript = document.createElement('script')
        paypalScript.setAttribute('id', 'paypalCheckout')
        paypalScript.async = false
        paypalScript.setAttribute('src', 'https://www.paypal.com/sdk/js?client-id=<%= ' + this.company.paypal_client_id + ' %>&vault=true&disable-funding=credit,card,sepa,giropay,sofort&currency=EUR')
        document.head.appendChild(paypalScript)
      }
    },
    methods: {
        success(e) {
            this.$store.commit("payment/paypal/checkout_id", e.id)
            this.$store.commit("payment/paypal/status", "done")
            this.$store.dispatch("payment/paypal/checkout").then(() => {
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
            this.$refs.paypal 
        }
    }
}
</script>
<style>
    .paypal-button-label-container {
        color: green;
    }
    .paypal-payment-container {
        text-align: center;
    }
</style>
