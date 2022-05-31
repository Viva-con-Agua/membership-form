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
            this.tracker("next", "StepTwo-Next", 0)
            this.$store.dispatch("process").then(() => {
                this.$emit("submit")
            })
            .catch((err) => console.log(err))
        }
    }
}
</script>
