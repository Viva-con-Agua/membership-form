<template>
    <vca-card>
        <h1 class="text-center">{{ $t('thanks.header') }}</h1>
        <h2 class="text-center">{{ $t('thanks.subheader') }}</h2>
        <p class="text-center">{{ $t('thanks.text', {0: getAmount, 1: getExample}) }}</p>
    </vca-card>
 </template> 

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Thanks',
    computed: {
       ...mapGetters({
           money: 'payment/money'
        }),
        getAmount() {
          return this.toLocaleString(this.money.amount / 100) + ' ' + this.money.currency
        },
        getExample() {
          if (this.money.amount >= 8000) {
                return this.$t('thanks.example.workshop')
            } else if (this.money.amount >= 5000) {
                return this.$t('thanks.example.trees')
            } else if (this.money.amount >= 2000) {
                return this.$t('thanks.example.filter')
            } else if (this.money.amount >= 1500) {
                return this.$t('thanks.example.soap')
            }
            return this.$t('thanks.example.default')
        }
   }
}
</script>