<template>
    <vca-field class="typo-roboto" :label="$t('expiration.label')">
        <vca-selection :selection="expirations" v-model="expiration"/>
    </vca-field>
</template>
<script>
export default {
    name: 'Expiration',
    data() {
        return {
            expirations: [
                { label: this.$t("expiration.year"), value: 12 },
                { label: this.$t("expiration.never"), value: 0 }
            ]
        }
    },
    computed: {
        expiration: {
            get () {
                return this.$store.state.payment.cycles
            },
            set(value) {
                this.$store.commit('payment/cycles', value)
            }
        }
    }
}
</script>
