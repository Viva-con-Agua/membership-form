<template>
    <div>
        <vca-field :label="$t('paymentselection.label')">
            <div class="selection-button-box">
                <button v-for="(current, index) in paymentTypes" :key="index" :class="{ 'selected': getPaymentType(current.name)}" class="selection-button" @click.prevent="setPaymentType(current.name)">{{ $t(current.title) }}
                    <img src="~@/assets/img/payment/creditcard.png" class="paymenttype-icon" v-if="current.name == 'creditcard'"/>
                    <img src="~@/assets/img/payment/creditcard_white.png" class="paymenttype-icon-white" v-if="current.name == 'creditcard'"/>
                </button>
            </div>
        </vca-field>

        <StripePaymentSepa v-if="getPaymentType('sepa')" ref="sepa" :product="product" @success="success" @isInvalid="isInvalid" v-on:error="error"/>
        <CiviPaymentSEPA v-if="getPaymentType('civisepa')" @isInvalid="isInvalid" @success="success" v-on:error="error"/>
        <StripePaymentCreditCard v-if="getPaymentType('creditcard')" @success="success" ref="creditcard" :product="product" @isInvalid="isInvalid" v-on:error="error"/>
        <PayPalButton v-if="getPaymentType('paypal')" @success="success" v-on:error="error"/>
    </div>
</template>
<script>
import CiviPaymentSEPA from '@/components/payment/civi/CiviPaymentSEPA'
import StripePaymentSepa from '@/components/payment/stripe/StripePaymentSepa'
import PayPalButton from '@/components/payment/paypal/PayPalCheckoutButton'
import StripePaymentCreditCard from '@/components/payment/stripe/StripePaymentCreditCard'

import { mapGetters } from 'vuex'

export default {
    name: 'PaymentSelection',
    components: {StripePaymentSepa, CiviPaymentSEPA, StripePaymentCreditCard, PayPalButton},
    props: ['product'],
    computed: {
       ...mapGetters({
           paymentTypes: 'form/paymentTypes'
        }),
        paymentType: {
            get () {
                return this.$store.state.payment.payment_type
            },
            set(value) {
                this.$store.commit('payment/payment_type', value)
            }
        }
    },
    created() {
        let filter = this.paymentTypes.find(el => el.default)
        this.paymentType = (filter) ? filter.name : this.paymentTypes[0].name
    },
    methods: {
        isInvalid(e) {
            this.$emit("isInvalid", e)
        },
        success() {
            this.$emit("success")
        },
        error(e) {
            this.$emit("error", e)
        },
        getPaymentType(val) {
            return this.paymentType == val
        },
        setPaymentType(val) {
            this.paymentType = val
            //    this.commit('payment/payment_type', val)
            this.$emit("paymentType", val)
        },
        commit() {
            if (this.getPaymentType("creditcard")) {
                this.$refs.creditcard.purchase()
            } else if (this.getPaymentType("sepa")) {
                this.$refs.sepa.purchase()
            }
          }
    },
};
</script>
<style lang="scss">

.selection-button {

    .paymenttype-icon {
        display: inline-block;
        margin-left: 15px;
    }
    .paymenttype-icon-white {
        display: none;
        margin-left: 15px;
    }

    &.selected:hover {
        .paymenttype-icon {
            display: none;
        }
        .paymenttype-icon-white {
            display: inline-block;
        }
    }



}
</style>
