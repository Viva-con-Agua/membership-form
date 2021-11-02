<template>
    <div class="sepa-payment-container">
        <vca-field :label="$t('payment.more_details')">
            <vca-input
                ref="iban"
                :errorMsg="$t('payment.sepa.error')"
                :placeholder="$t('payment.sepa.placeholder')"
                v-model.trim="account.iban"
                @input="isValid"
                @blur="isValid"
                :rules="$v.account.iban">
            </vca-input>

            <vca-checkbox
                :rules="$v.terms"
                ref="terms"
                v-model="terms"
                @change="isValid"
                :errorMsg="$t('payment.terms.sepa.error')">
                        <div v-html="$t('payment.terms.sepa.de.single')"></div>
            </vca-checkbox>
        </vca-field>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CiviSEPA',
    validations() {
        return {
            terms: {
                watcher: value => value === true
            },
            account: {
                iban: {
                    async isinvalid (value) {
                        if (value && value.length >= 15) {
                            const response = await axios.get("https://openiban.com/validate/" + value + "?getBIC=true&validateBankCode=true")
                            if(response.data.valid) {
                                this.bic = response.data.bankData.bic
                            }
                            return Boolean(await response.data.valid)
                        }
                        return false
                    }
                }
            }
        }
    },
    created() {
        this.$emit('isInvalid', this.$v.$invalid)
    },
    watch: {
        account: {
            handler(val) {
                this.$store.commit('payment/civisepa/account', val)
            },
            deep: true
        }
    },
    computed: {
        account: {
            get () {
                return this.$store.state.payment.civisepa.account
            }
        },
        terms: {
            get () {
                return this.$store.state.payment.civisepa.terms
            },
            set(value) {
                this.$store.commit('payment/civisepa/terms', value)
                this.$emit('isInvalid', this.$v.$invalid)
            }
        }
    },
    methods: {
        isValid() {
            this.$emit('isInvalid', this.$v.$invalid)
        }
    }

}
</script>
