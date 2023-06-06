<template>
    <div class="steptwo">
        <vca-field :label="$t('contactform.label')">

                <div class="vca-row">
                    <vca-input
                        ref="email"
                        :errorMsg="$t('contactform.email.error')"
                        @input="lower"
                        :placeholder="$t('contactform.email.placeholder')"
                        v-model.trim="anonymous.email"
                        :rules="$v.anonymous.email">
                    </vca-input>
                </div>

                <vca-input
                   v-if="company"
                   ref="company"
                   :errorMsg="$t('contactform.company.error')"
                   :placeholder="$t('contactform.company.placeholder')"
                   v-model.trim="anonymous.company_name"
                   :rules="$v.anonymous.company_name"/>

                <vca-field-row>
                    <vca-input
                        ref="first_name"
                        first
                        :errorMsg="$t('contactform.firstname.error')"
                        :placeholder="$t('contactform.firstname.placeholder')"
                        v-model.trim="anonymous.first_name"
                        :rules="$v.anonymous.first_name">
                    </vca-input>
                    <vca-input
                        ref="last_name"
                        last
                        :errorMsg="$t('contactform.lastname.error')"
                        :placeholder="$t('contactform.lastname.placeholder')"
                        v-model.trim="anonymous.last_name"
                        :rules="$v.anonymous.last_name">
                    </vca-input>
                </vca-field-row>


                    <vca-field-row>
                        <vca-input
                            ref="street"
                            class="long"
                            first
                            :errorMsg="$t('contactform.street.error')"
                            :placeholder="$t('contactform.street.placeholder')"
                            v-model.trim="anonymous.street"
                            :rules="$v.anonymous.street">
                        </vca-input>
                        <vca-input
                            ref="number"
                            class="short"
                            last
                            :errorMsg="$t('contactform.number.error')"
                            :placeholder="$t('contactform.number.placeholder')"
                            v-model="anonymous.number"
                            :rules="$v.anonymous.number">
                        </vca-input>
                    </vca-field-row>

                    <vca-field-row>
                        <vca-input
                            class="short"
                            ref="zip"
                            first
                            :errorMsg="$t('contactform.zip.error')"
                            :placeholder="$t('contactform.zip.placeholder')"
                            v-model.trim="anonymous.zip"
                            :rules="$v.anonymous.zip">
                        </vca-input>
                        <vca-input
                            ref="city"
                            class="long"
                            last
                            :errorMsg="$t('contactform.city.error')"
                            :placeholder="$t('contactform.city.placeholder')"
                            v-model.trim="anonymous.city"
                            :rules="$v.anonymous.city">
                        </vca-input>
                    </vca-field-row>

                        <vca-country preselection="DE" countryCode="DE" :rules="$v.country" ref="country" v-model="country" label="" :placeholder="$t('contactform.country.placeholder')" :errorMsg="$t('contactform.country.error')"/>

                <div class="color-grey vca-right">{{ $t('contactform.required') }}</div>
            </vca-field>

    </div>
</template>
<script>

import { required, email} from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
    name: 'ContactForm',
    computed: {
       ...mapGetters({
           company: 'company'
        }),
        anonymous: {
            get () {
                return this.$store.state.payment.contact
            },
            set(value) {
                this.$store.commit('payment/contact', value)
            }
        },
        country: {
            get () {
                return this.$store.state.payment.country
            },
            set(value) {
                this.$store.commit('payment/country', value)
            }
        }
    },
    validations() {
        if (this.company) {
            return {
                anonymous: {
                    email: {
                        email,
                        required
                    },
                    first_name: {
                        required
                    },
                    last_name: {
                        required
                    },
                    street: {
                        required
                    },
                    number: {
                        required
                    },
                    zip: {
                        required
                    },
                    city: {
                        required
                    },
                    company_name: {
                        required
                    }
                },
                country: {
                    required
                }
            }
        } else {
            return {
                anonymous: {
                    email: {
                        email,
                        required
                    },
                    first_name: {
                        required
                    },
                    last_name: {
                        required
                    },
                    street: {
                        required
                    },
                    number: {
                        required
                    },
                    zip: {
                        required
                    },
                    city: {
                        required
                    }
                },
                country: {
                    required
                }
            }
        }
    },
    methods: {
        lower() {
            this.anonymous.email = this.anonymous.email.toLowerCase()
        }
    }
}
</script>
<style lang="scss">
.steptwo {
    .color-grey {
        color: #ccc;
    }
}
</style>
