<template>
    <div id="paypal-button" class="paypal-button"></div>
</template>
<script>
import { mapGetters } from 'vuex'

let ppActions;
export default {
    methods: {
        onApprove: function(data) {
            // This function captures the funds from the transaction.
            // This function shows a transaction success message to your buyer.
            this.$emit('payment-completed', data.subscriptionID);
        },
        createSubscription: function(data, actions) {
            var that = this
            return actions.subscription.create({
                'plan_id': that.plan_id,
                'start_time': that.start_time
            });
        },
        onCancel(data) {
            console.log('trigger cancel')
            this.$emit('payment-cancelled', data);
        },
        onError(err) {
            console.log('trigger error')
            console.log(err)
            this.$emit('payment-error', err);
        },
        onClick(data) {
            if(this.disabled) {
                this.$emit('payment-validation-error', data);
            } 
        },
        onInit(data, actions) {
            ppActions = actions
            this.disabled ? actions.disable() : actions.enable()
        },
    },
    watch: { 
        disabled: function(nVal) {
            if (nVal == false) {
                ppActions.enable()
            } else {
                ppActions.disable()
            }
        }
    },
    computed: {
        ...mapGetters({
            company: 'form/company',
            plan_id: 'payment/paypal/plan_id',
            start_time: 'payment/paypal/start_time'
        })
    },
    mounted() {
        console.log("mounted2")
        var paypalLink = 'https://www.paypal.com/sdk/js?client-id='+ this.company.paypal_client_id +'&vault=true&disable-funding=credit,card,sepa,giropay,sofort&currency=EUR&intent=subscription'
        let paypalScript = document.createElement('script')
        paypalScript.setAttribute('src', paypalLink)
        document.head.appendChild(paypalScript)
        var that = this;

        paypalScript.onload = function () {
        window.paypal.Buttons({

            // Pass in the client ids to use to create your transaction
            // on sandbox and production environments
            client: that.client,

            // Pass the payment details for your transaction
            // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters
            createSubscription: that.createSubscription,

            // Pass a function to be called when the customer completes the payment
            onApprove: that.onApprove,

            // Pass a function to be called when the customer completes the payment
            onAuthorize: that.onAuthorize,

            // onInit is called when the button first renders
            onInit: that.onInit,

            // Pass a function to be called when the button is clicked
            onClick: that.onClick,

            // Pass a function to be called when an error occurs
            onError: that.onError,

            // Pass a function to be called when the customer cancels the payment
            onCancel: that.onCancel,
            style: {
                color:  'blue',
                shape:  'rect',
                label:  'pay',
                size: 'responsive'
            },

        }).render('#paypal-button');
        
        }
    },
};
</script>
