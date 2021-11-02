<template>
    <div>
        <vca-loading v-if="loadingFlow"/>
        <Headline :text="getText" />
        <Slider v-if="step === 4"/>
        <HeaderSteps :currentStep=step :steps=steps />
        <div class="vca-card vca-border" id="topElement">
            <StepOne v-if="step === 1" @submit="navigate(), step++"/>
            <StepTwo v-if="step === 2" @submit="navigate(), step++" @back="navigate(), step--"/>
            <StepThree v-if="step === 3" ref="stepthree" :product="product" @back="navigate(), step--" @success="success"/>
            <StepThanks v-if="step === 4"/>
        </div>
        <PaymentFooter v-if="step < 4" />
    </div>
</template>
<script>
//import axios from 'axios'
import StepOne from '@/components/steps/StepOne'
import StepTwo from '@/components/steps/StepTwo'
import StepThree from '@/components/steps/StepThree'
import StepThanks from '@/components/steps/StepThanks'
import Slider from '@/components/steps/four/Slider'
import PaymentFooter from '@/components/layout/Footer'
import HeaderSteps from '@/components/layout/HeaderSteps'
//import LanguageSelection from "@/components/utils/LanguageSelection"
import Headline from '@/components/layout/Headline'
import { mapGetters } from 'vuex'
export default {
    name: 'DonationForm',
    components: {Slider, StepOne, StepTwo, StepThree, StepThanks, PaymentFooter, HeaderSteps, Headline },
    props: {
        donation_form_id: {
            type: String,
            default: ""
        }
    },
    created() {
        this.$store.dispatch({type: 'init', data: this.donation_form_id})
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
    },
    data() {
        return {
            step: 1,
            steps:
            [
                {id: 1, label: this.$t('header.amount') },
                {id: 2, label: this.$t('header.contact') },
                {id: 3, label: this.$t('header.payment') },
                {id: 4, label: this.$t('header.thanks') }
            ]
        }
    },
    computed: {
        ...mapGetters({
            product: 'form/product',
            loadingFlow: 'loadingFlow'
        }),
        getText() {
            return this.step == 4 ? this.$t('headline.thanks'): this.$t('headline.donate')
        }
    },
    methods: {
        navigate() {
            var top = document.getElementById('topElement').offsetTop;
            window.scrollTo(0, top);
            window.top.postMessage('navigate', '*')
        },
        success() {
            this.$emit("success")
            //this.$refs.stepthree.commit()
            this.step = 4
        }
    }
}
</script>
<style lang="scss">
    .arr-btn-box {
        width: max-content;
    }
</style>