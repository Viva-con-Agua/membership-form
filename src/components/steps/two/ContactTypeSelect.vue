<template>
    <div class="steptwo">
        <vca-field :label="getLabel">
                <div class="selection-button-box">
                    <button :class="btnSelected('private')" class="selection-button"  @click.prevent="company = false">{{ $t('contacttypeselection.individual') }}</button>
                    <button :class="btnSelected('company')" class="selection-button" @click.prevent="company = true">{{ $t('contacttypeselection.company') }}</button>
                </div>
        </vca-field>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'ContactTypeSelect',
    computed: {
        ...mapGetters({
            setting: 'form/setting'
        }),
        company: {
            get () {
                return this.$store.state.company
            },
            set(value) {
                this.$store.commit('company', value)
            }
        },
        getLabel() {
            return this.setting == 'gift' ? this.$t('contacttypeselection.label_gift') : this.$t('contacttypeselection.label')
        }
    },
    methods: {
        btnSelected(val) {
            if (this.company) {
                return (val == 'company') ? 'selected' : '';
            } else {
                return (val != 'company') ? 'selected' : '';
            }
        }
    }
}
</script>
