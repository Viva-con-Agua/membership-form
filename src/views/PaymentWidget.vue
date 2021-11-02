<template>
    <div id="payment-widget" class="payment-widget">
        <DonationForm v-on:success="success" :campaign="campaign"/>
    </div>
</template>
<script>

import axios from 'axios'
import DonationForm from '@/components/DonationForm'
export default {
    name: 'PaymentWidget',
    components:{ DonationForm},
    props: {
        campaign_id: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            campaign: {
                id: this.campaign_id
            }
        }
    },
    methods: {
        success(e) {
            axios.post(process.env.VUE_APP_IROBERT, JSON.stringify(e))
            .then(response => (
                console.log(response.data)
            ))
        }
    }
}
</script>
<style lang="scss">
.payment-widget {
    max-width: 1600px;
    min-width: 80%;
    margin: auto;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;
}
</style>
