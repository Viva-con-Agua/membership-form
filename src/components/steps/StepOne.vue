<template>
    <div class="stepone">

        <Expiration v-if="setting == 'gift'"/>
        <Interval />
        <AmountButtons />
        <Amount ref="amount" />

        <vca-arrow-navigation
        @next="submit"
        :showBack="false"
        :nextLabel="this.$t('buttons.next')"
        :nextEnabled="isValid"
        v-observe-visibility="visibilityChanged"/>

    </div>

</template>
<script>
import Amount from '@/components/steps/one/Amount.vue'
import Interval from '@/components/steps/one/Interval.vue'
import Expiration from '@/components/steps/one/Expiration.vue'
import AmountButtons from '@/components/steps/one/AmountButtons.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'StepOne',
    components: {Amount, Expiration, Interval, AmountButtons},
    data() {
        return {
            isValid: true
        }
    },
    mounted () {
        this.isValid = !this.$refs.amount.$v.$invalid
        this.$watch(() => {
            return this.$refs.amount.$v.$invalid
        },(val) => {
            this.isValid = !val
        }
                   )
    },
    computed: {
        ...mapGetters({
            setting: 'form/setting',
            trackingData: 'payment/trackingData'
        }),
        hasSubscription() {
            return this.$store.state.form.current.subscription_types != null
        }
    },
    methods: {
        submit() {
            this.$store.commit("payment/trackingData", "view_membership_form_step2")
            var data = this.trackingData
            this.trackingTrigger(data)
            this.tracker("next", "StepOne-Next", 0)
            this.$emit("submit")
        },
        visibilityChanged(isVisible, entry) {
            this.isVisible = isVisible
            if (entry.isIntersecting && !this.tracked) {
                this.tracked = true
                this.trackingTrigger(this.trackingData)
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.slider-box {
    width: 85%;
    margin: auto;
}
</style>
