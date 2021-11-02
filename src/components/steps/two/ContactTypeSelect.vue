<template>
    <div class="steptwo">
        <vca-field :label="$t('contacttypeselection.label')">
                <div class="selection-button-box">
                    <button :class="btnSelected('private')" class="selection-button"  @click.prevent="company = false">{{ $t('contacttypeselection.individual') }}</button>
                    <button :class="btnSelected('company')" class="selection-button" @click.prevent="company = true">{{ $t('contacttypeselection.company') }}</button>
                </div>
        </vca-field>
    </div>
</template>
<script>

export default {
    name: 'ContactTypeSelect',
    computed: {
        company: {
            get () {
                return this.$store.state.company
            },
            set(value) {
                this.$store.commit('company', value)
            }
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
