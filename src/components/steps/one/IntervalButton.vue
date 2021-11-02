<template>
    <vca-drop-button :selected="paymentInterval == interval" @click.prevent="paymentInterval = interval">
        <div v-if="paymentInterval != interval" class="vca-row vca-center btn-icon">
            <div v-for="(drop, index) in drops" :key="index" class="icon-box"><img src="~@/assets/icons/icon_vca.png" /></div>
        </div>
        <div v-else class="vca-row vca-center btn-icon">
            <div v-for="(drop, index) in drops" :key="index" class="icon-box"><img src="~@/assets/icons/icon_vca_white.png" /></div>
        </div>
        <span class="btn-amount">{{ $t('interval.' + interval ) }}</span>
    </vca-drop-button>
</template>
<script>
export default {
    name: 'IntervalButton',
    props: {
        interval: {
            type: String,
            default: 'monthly'
        },
        drops: {
            type: Number,
            default: 1
        }
    },
    computed: {
        paymentInterval: {
            get () {
                return this.$store.state.payment.interval
            },
            set(value) {
                this.$store.commit('payment/interval', value)
            }
        }
    },
    methods: {
        dropSelected(val) {
            return (this.paymentInterval == val) ? 'selected' : ''
        },
        modulo(index, mod) {
            return ((index + 1) % mod) == 1 
        }
    }
}
</script>
<style lang="scss">


/*
    CSS DROP BUTTON
*/
.btn-drop {
    cursor: pointer;
    background-image:url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" viewBox="0 0 4442 720"><g transform="translate(0.000000,210.000000) scale(0.100000,-0.100000)"><path d="M566 2081 c-18 -19 -17 -22 12 -73 17 -29 36 -74 42 -100 11 -44 10 -52 -13 -100 -16 -33 -74 -104 -153 -188 -179 -191 -240 -263 -301 -356 -161 -248 -192 -499 -91 -742 123 -295 387 -471 773 -513 201 -22 448 23 644 117 439 210 622 641 461 1086 -163 450 -678 797 -1311 883 -37 5 -48 2 -63 -14z"/></g></svg>');
    
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    fill: #008fc3;
    border: solid thin transparent;
    font-weight: bold;
    width: 50%;
    max-width: 160px !important;
    text-decoration: none;
    vertical-align: middle;
    color: #008fc2;
    min-height: 200px;
    margin: 0 auto;

    .btn-icon {
        width: max-content;
        flex-basis: 50%;
        margin: auto;
        display: flex;
        flex-wrap: wrap;

        .icon-box {
            flex-basis: 50%;
            display: inline-flex;

            img {
                width: 30px;
                bottom: 0 !important;
                @include media(large) {
                    width: 35px;                
                }
            }
        }
        .icon-box:nth-child(2n + 1) {
            justify-content: flex-end;
        }
        .icon-box:nth-child(2n) {
            justify-content: flex-start;
        }
    }
    span {
        position: relative;
        top: 10px;
        font-size: 1.25em;
    }
    &.selected, &.selected:hover {
        color: #fff;
        fill: #008fc3;
    }

    &:hover {
        fill: green;
    }


}




</style>