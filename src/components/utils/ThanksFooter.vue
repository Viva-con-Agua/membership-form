<template>
    <div class="thx-footer">
        <div class="thx-footer-text">{{ $t('thanks.footer.text', {0: money.amount / 100, 1: money.currency, 2: getInterval} ) }}</div>
        <div class="thx-footer-image"><img src="~@/assets/img/thanks/thank_you_small.png" /></div>
    </div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ThanksFooter',
    computed: {
        getInterval() {
            return this.$t('thanks.footer.' + this.interval)
        },
        getAmount() {
            return this.money.currency / 100
        },
        ...mapGetters({
            money: 'payment/money',
            interval: 'payment/interval'
        }),
    }
}
</script>
<style lang="scss">
    .thx-footer {
        color: white;
        background-color: #008fc2;
        vertical-align: middle;
        display: flex;
        flex-wrap: wrap;

        @include media(large) {
            flex-wrap: nowrap;
        }

        .thx-footer-text {

            text-align: center;
            margin: 10px;
            padding: 0;

            font-size: 1.2em;
            font-weight: bold;
            text-transform: uppercase;
            line-height: 1.3;

            @include media(large) {
                margin: auto 20px auto 50px;
                padding: 10px 0;
                text-align: left;
                font-size: 1.6em;
            }
        }

        .thx-footer-image {
            display: flex;

            width: 100%;
            margin: 0 0 10px 0;

            @include media(large) {
                width: auto;
                margin: auto 50px;
            }

            img {
                margin: auto;
                width: inherit;
            }
        }

    }
</style>
