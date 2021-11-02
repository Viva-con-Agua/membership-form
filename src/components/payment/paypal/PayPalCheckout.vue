<template>
    <div id="paypal-button" class="paypal-button"></div>
</template>
<script>
import defaultProps from './js/util/defaultProps';
import additionalProps from './js/util/additionalProps';

let ppActions;

export default {
    props: Object.assign(
        defaultProps(),
        additionalProps.vmProps(),
    ),
    methods: {
        onApprove: function(data, actions) {
            var that = this
            // This function captures the funds from the transaction.
            return actions.order.capture().then(function(details) {
                // This function shows a transaction success message to your buyer.
                that.$emit('payment-completed', details);
            });
        },
        createOrder(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: this.amount,
                        currency_code: this.currency
                    }
                }]
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
    mounted() {
        var paypalLink = 'https://www.paypal.com/sdk/js?client-id='+process.env.VUE_APP_PAYPAL_CLIENT_ID +'&vault=true&disable-funding=credit,card,sepa,giropay,sofort&currency=EUR'
        let paypalScript = document.createElement('script')
        paypalScript.setAttribute('src', paypalLink)
        document.head.appendChild(paypalScript)

        /*    const vue = this;
              const button = Object.assign({
        // Pass in env
        env: vue.env,

        // Pass in the client ids to use to create your transaction
        // on sandbox and production environments
        client: vue.client,

        // Pass the payment details for your transaction
        // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters
        payment: vue.payment,

        // Display a "Pay Now" button rather than a "Continue" button
        commit: vue.commit,

        // Validates the data an disables the button
        validate: vue.validate,

        // Pass a function to be called when the customer completes the payment
        onAuthorize: vue.onAuthorize,

        // Pass a function to be called when the customer cancels the payment
        onCancel: vue.onCancel,

        // Pass a function to be called when the button is clicked
        onClick: vue.onClick,

        onInit: vue.onInit,

        // Pass a function to be called when an error occurs
        onError: vue.onError,

        }, assignTo(vue, propTypes.BUTTON));
         */
        var that = this;

        paypalScript.onload = function () {
            window.paypal.Buttons({

                // Pass in the client ids to use to create your transaction
                // on sandbox and production environments
                client: that.client,

                // Pass the payment details for your transaction
                // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters
                createOrder: that.createOrder,

                // Pass a function to be called when the customer completes the payment
                onApprove: that.onApprove,

                // Display a "Pay Now" button rather than a "Continue" button
                commit: that.commit,

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
