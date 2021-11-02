<template>
    <vca-field class="typo-roboto" :label="$t('amounts.label')">

        <vca-card v-if="interval == 'yearly'" class="vca-row">
            <AmountButton selectedAmount='6000' :drops="1" />
            <AmountButton selectedAmount='12000' :drops="2" />
            <AmountButton selectedAmount='24000' :drops="4" />
        </vca-card>
        <vca-card v-else class="vca-row">
            <AmountButton selectedAmount='500' :drops="1" />
            <AmountButton selectedAmount='1000' :drops="2" />
            <AmountButton selectedAmount='2000' :drops="4" />
        </vca-card>

    </vca-field>
</template>
<script>
import { mapGetters } from 'vuex'
import AmountButton from '@/components/steps/one/AmountButton'
export default {
    name: 'AmountButtons',
    components: {AmountButton},
    computed: {
        ...mapGetters({
            interval: 'payment/interval'
        })
    }
}
</script>
