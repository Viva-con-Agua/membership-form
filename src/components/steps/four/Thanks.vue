<template>
    <vca-card>
        <h1 class="text-center">{{ $t('thanks.header') }}</h1>
        <h2 class="text-center">{{ $t('thanks.subheader') }}</h2>
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
        }
   }
}
</script>