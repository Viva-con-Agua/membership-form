<template>
    <vca-field class="typo-roboto" :label="$t('interval.label')">
        <vca-selection :selection="intervals" v-model="interval"/>
    </vca-field>
</template>
<script>
export default {
    name: 'Interval',
    data() {
        return {
            intervals: [
                { label: this.$t("interval.monthly"), value: 'monthly' },
                { label: this.$t("interval.yearly"), value: 'yearly' }
            ]
        }
    },
    computed: {
        interval: {
            get () {
                return this.$store.state.payment.interval
            },
            set(value) {
                this.$store.commit('payment/interval', value)
            }
        }
    }
}
</script>
