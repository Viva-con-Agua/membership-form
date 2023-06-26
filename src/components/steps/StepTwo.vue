<template>
    <div class="steptwo">
        <ContactTypeSelect />
        <ContactForm ref="contactdata" />
        <vca-arrow-navigation @next="submit" @back="back" :backLabel="this.$t('buttons.back')" :nextLabel="this.$t('buttons.next')" :nextEnabled="isValid"/>
    </div>
</template>
<script>

import ContactTypeSelect from '@/components/steps/two/ContactTypeSelect'
import ContactForm from '@/components/steps/two/ContactForm'
import { mapGetters } from 'vuex'
export default {
    name: 'StepTwo',
    components: {
        ContactTypeSelect, ContactForm
    },
    data () {
        return {
            isValid: true,
        }
    },
    computed:{
            ...mapGetters({
            trackingData: 'payment/trackingData'
        }),
    },
    mounted () {
        this.isValid = !this.$refs.contactdata.$v.$invalid
        this.$watch(() => {
                return this.$refs.contactdata.$v.$invalid
            },(val) => {
                this.isValid = !val
            }
        )
    },
    methods: {
        back() {
            this.tracker("prev", "StepTwo-Prev", 0)
            this.$emit("back")
        },
        submit() {
            this.$store.commit("payment/trackingData", "view_membership_form_step3")
            var data = this.trackingData
            this.trackingTrigger(data)
            this.tracker("next", "StepTwo-Next", 0)
            this.$store.dispatch("process").then(() => {
                this.$emit("submit")
            })
            .catch((err) => console.log(err))
        }
    }
}
</script>
