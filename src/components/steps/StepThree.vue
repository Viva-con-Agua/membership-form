<template>
    <div class="steptwo">
        <div v-if="errorMSG">
            <h2> Payment_id: {{payment}} </h2>
            <span>{{ $t('error.payment') }}</span>
        </div>
        <PaymentSelection v-if="!interval" ref="selection" :product="product" v-on:success="success" v-on:error="error" @isInvalid="validate"/>
        <SubscribeSelection v-if="interval" ref="selection" :product="product" v-on:success="success" v-on:error="error" @isInvalid="validate"/>
        <Policies />
        <vca-arrow-navigation @next="commit" @success="success" @back="back" :backLabel="this.$t('buttons.back')" :nextLabel="getLabel" :showNext="paymentType != 'paypal'" :nextLong="true" :nextEnabled="!isInvalid"/>
    </div>
</template>
<script>
import PaymentSelection from '@/components/steps/three/PaymentSelection'
import SubscribeSelection from '@/components/steps/three/SubscribeSelection'
import Policies from '@/components/steps/three/Policies'
import Money from 'vca-ui/src/utils/Money'
import { mapGetters } from 'vuex'
export default {
    name: 'StepThree',
    props: ['product'],
    components: {PaymentSelection, SubscribeSelection, Policies},
    data() {
        return {
            isInvalid: true,
            errorMSG: false
        }
    },
    computed: {
        ...mapGetters({
            payment: 'payment/payment_id',
            money: 'payment/money',
            interval: 'payment/interval',
            paymentType: 'payment/payment_type',
            cycles: 'payment/cycles'
        }),
        getLabel() {
            return this.$t('payment.submit', {0: Money.convertDE(this.money.amount), 1: this.money.currency})
        }
    },
    methods: {
        success() {
            if (this.paymentType != "paypal") {
                this.$store.commit('loadingFlow')
            }
            this.$emit("success")
        },
        error(e) {
            if (this.paymentType != "paypal") {
                this.$store.commit('loadingFlow')
            }
            this.notification({title: "Error", body:"Spende nicht möglich. Danke fürs Testen! Schreib uns bitte die PaymentID", type:"error"})
            this.errorMSG = true
            this.$emit("error", e)
        },
        validate(e) {
            this.isInvalid = e
        },
        commit() {
            this.$store.commit('loadingFlow')
            var value = 0
            if (this.interval == "monthly") {
                value = (this.money.amount * 12) / 100
                this.tracker("donate", "StepThree-Donation-Montly", value)
            } else {
                value = this.money.amount/100
                this.tracker("donate", "StepThree-Donation-Yearly", value)
            }
            this.$refs.selection.commit()
        },
        back() {
            this.tracker("prev", "StepThree-Prev", 0)
            this.$emit("back")
        }
    }
}
</script>
