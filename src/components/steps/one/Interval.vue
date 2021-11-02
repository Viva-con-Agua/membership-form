<template>
    <vca-field v-if="abo" class="typo-roboto" :label="$t('interval.label')">

        <vca-card class="vca-row">
            <IntervalButton interval='monthly' :drops="0" />
            <IntervalButton interval='quarterly' :drops="4" />
            <IntervalButton interval='half' :drops="2" />
            <IntervalButton interval='yearly' :drops="1" />
        </vca-card>


    </vca-field>
</template>
<script>
import { mapGetters } from 'vuex'
import IntervalButton from '@/components/steps/one/IntervalButton'
export default {
    name: 'Interval',
    components: {IntervalButton},
    computed: {
        ...mapGetters({
            abo: 'payment/abo'
        })
    }
}
</script>
