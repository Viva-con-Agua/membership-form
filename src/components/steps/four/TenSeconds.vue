<template>
    <vca-card>
        <vca-field :label="$t('tenseconds.label')">
            <div class="vca-row">
                <div class="vca-flexbox">
                    <vca-card>
                        <p v-html="$t('tenseconds.knownfrom.label')"></p>
                    </vca-card>
                </div>
                <div class="vca-flexbox">
                    <vca-dropdown v-model="offset.known_from" :options="knownfrom.dropdown" :placeholder="$t('tenseconds.knownfrom.dropdown.placeholder')" title="Dropdown" label=""/>
                </div>
            </div>
            <div class="vca-row">
                <div class="vca-flexbox">
                    <vca-card>
                        <p v-html="$t('tenseconds.comment.label')"></p>
                    </vca-card>
                </div>
                <div class="vca-flexbox"><vca-textarea ref="comment" :rules="$v.offset.comment" :errorMsg="$t('tenseconds.comment.error')" v-model="offset.comment" :maxlength="200" :placeholder="$t('tenseconds.comment.placeholder')" label=""/></div>
            </div>
            <button v-if="flow" class="vca-button quarter" @click.prevent="submit">{{ $t('tenseconds.comment.button') }}</button>
            <div class="vca-column" v-else>
                <button class="vca-button quarter" disabled @click.prevent="submit">{{ $t('tenseconds.comment.button') }}</button>
                <div class="primary-dark bold tenseconds-success vca-border text-center">{{ $t('tenseconds.success') }}</div>
            </div>
        </vca-field>
    </vca-card>
 </template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'TenSeconds',
    data() {
        return {
            flow: true
        }
    },
    computed: {
        knownfrom: {
            get () {
                // Translates the titles and labels of the dropdown
                var dropdown = []
                this.$store.state.knownfrom.dropdown.forEach(e => {
                    var temp = {title: this.$t(e.title), label: this.$t(e.label), value: e.value}
                    dropdown.push(temp)
                })
                return {dropdown: dropdown}
            }
        },
        offset: {
            get () {
                return this.$store.state.offset
            }
        }
    },
    watch: {
        offset: {
            handler(val) {
                this.$store.commit('offset', val)
            },
            deep: true
        }
    },
    validations() {
        return {
            offset: {
                comment: {
                    required
                }
            }
        }
    },
    methods: {
        submit() {
            this.tracker("contact_us", "StepFour-Contact-Us", 0)
            this.$refs.comment.validate()

            if(this.$v.$invalid) {
                return
            }
            this.$store.dispatch({type: 'feedback'})
            .then((resp) => {
                this.flow = false
                console.log(resp)
            })
            .catch((error) => {
                console.log(error)
            })

            this.$store.dispatch({type: 'contact'})
            .then((resp) => {
                this.flow = false
                console.log(resp)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>
<style lang="scss">
    .tenseconds-success {
        margin: auto;
    }

    .quarter {
        @include media(small) {
            width: 100% !important;
        }
    }
</style>
