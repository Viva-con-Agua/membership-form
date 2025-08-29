<template>
    <div>
        <vca-loading v-if="loadingFlow" />
        <div v-if="deprecated">
            <Headline :text="$t('error.deprecated.headline')" />
            <vca-card v-html="$t('error.deprecated.text')"></vca-card>
        </div>
        <div v-else>
            <Headline :text="getText" />
            <Slider v-if="step === 4" />
            <HeaderSteps :currentStep="step" :steps="steps" />
            <div class="vca-card vca-border" id="topElement">
                <StepOne v-if="step === 1" @submit="navigate(), step++" />
                <StepTwo
                    v-if="step === 2"
                    @submit="navigate(), step++"
                    @back="navigate(), step--" />
                <StepThree
                    v-if="step === 3"
                    ref="stepthree"
                    :product="product"
                    @back="navigate(), step--"
                    @success="success" />
                <StepThanks v-if="step === 4" />
            </div>
            <PaymentFooter v-if="step < 4" />
            <!--ThanksFooter /-->
        </div>
    </div>
</template>
<script>
    //import axios from 'axios'
    import StepOne from '@/components/steps/StepOne';
    import StepThanks from '@/components/steps/StepThanks';
    import StepThree from '@/components/steps/StepThree';
    import StepTwo from '@/components/steps/StepTwo';
    //import ThanksFooter from '@/components/utils/ThanksFooter'
    import PaymentFooter from '@/components/layout/Footer';
    import HeaderSteps from '@/components/layout/HeaderSteps';
    import Slider from '@/components/steps/four/Slider';
    //import LanguageSelection from "@/components/utils/LanguageSelection"
    import Headline from '@/components/layout/Headline';
    import { mapGetters } from 'vuex';
    export default {
        name: 'DonationForm',
        components: {
            Slider,
            StepOne,
            StepTwo,
            StepThree,
            StepThanks,
            PaymentFooter,
            HeaderSteps,
            Headline /*, ThanksFooter */,
        },
        props: {
            donation_form_id: {
                type: String,
                default: '',
            },
            setting: {
                type: String,
                default: '',
            },
            amount: {
                type: String,
                default: '',
            },
            interval: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                step: 1,
                steps: [
                    { id: 1, label: this.$t('header.amount') },
                    { id: 2, label: this.$t('header.contact') },
                    { id: 3, label: this.$t('header.payment') },
                    { id: 4, label: this.$t('header.thanks') },
                ],
            };
        },
        created() {
            this.$store
                .dispatch({
                    type: 'init',
                    data: { form_id: this.donation_form_id, setting: this.setting },
                })
                .then(() => {
                    let next = 0;
                    if (this.amount && this.amount >= this.minAmount) {
                        this.$store.commit('payment/money', {
                            amount: this.amount,
                        });
                        next++;
                    }
                    if (this.interval && ['monthly', 'yearly'].includes(this.interval)) {
                        this.$store.commit('payment/interval', this.interval);
                        next++;
                    }
                    if (next == 2) {
                        this.step = 2;
                    }
                })
                .catch((error) => console.log(error));
        },
        computed: {
            ...mapGetters({
                product: 'form/product',
                minAmount: 'form/minAmount',
                loadingFlow: 'loadingFlow',
                deprecated: 'form/deprecated',
            }),
            getText() {
                return this.step == 4 ? this.$t('headline.thanks') : this.$t('headline.donate');
            },
        },
        methods: {
            navigate() {
                var top = document.getElementById('topElement').offsetTop;
                window.scrollTo(0, top);
                window.top.postMessage('navigate', '*');
            },
            success() {
                this.$emit('success');
                //this.$refs.stepthree.commit()
                this.step = 4;
            },
        },
    };
</script>
<style lang="scss">
    .arr-btn-box {
        width: max-content;
    }
</style>
