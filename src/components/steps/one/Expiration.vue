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
                { label: this.$t("expiration.year"), value: 'year' },
                { label: this.$t("expiration.never"), value: 'never' }
            ]
        }
    },
    computed: {
        expiration: {
            get () {
                return this.$store.state.payment.expiration
            },
            set(value) {
                this.$store.commit('payment/expiration', value)
            }
        }
    }
}
</script>
