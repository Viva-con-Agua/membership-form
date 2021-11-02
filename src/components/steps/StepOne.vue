<template>
    <div class="stepone">
        
        <Interval />
        <AmountButtons />
        <Amount ref="amount" />

        <vca-arrow-navigation @next="submit" :showBack="false" :nextLabel="this.$t('buttons.next')" :nextEnabled="isValid"/>
        
    </div>

</template>
<script>
import Amount from '@/components/steps/one/Amount.vue'
import Interval from '@/components/steps/one/Interval.vue'
import AmountButtons from '@/components/steps/one/AmountButtons.vue'
export default {
    name: 'StepOne',
    components: {Amount, Interval, AmountButtons},
    data() {
        return {
            isValid: true,
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
        hasSubscription() {
            return this.$store.state.form.current.subscription_types != null
        }
    },
    methods: {
        submit() {
            this.gtmTrack("click", "StepOne Next donation-form", 0)
            this.$emit("submit")
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
