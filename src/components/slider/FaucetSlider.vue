<template>
  <div class="faucetslide">
      <vca-card>
        <div class="images">
          <img :src="getFaucet"/>
      </div>
    </vca-card>
    <div class="count">
      <input type="range" class="slider" :min="amountMin" :max="amountMax" :value="money.amount" step="100" @input="setAmount">
    </div>
    <div class="amount">
      <h2>{{ currentAmount }} {{ money.currency }}</h2>
    </div>
    <h3 class="main-color">
      {{ getExample }}
    </h3>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'FaucetSlider',
    data () {
        return {
            current: 1,
            steps: 5,
        }
    },
    created() {
        this.setFaucet(this.money)
    },
    computed: {
        ...mapGetters({
           minAmount: 'form/minAmount'
        }),
        currentAmount() {
          return (this.money.amount / 100).toLocaleString(this.$i18n.locale)
        },
        getExample() {
            if (this.money.amount >= 8000) {
                return this.$t('example.workshop')
            } else if (this.money.amount >= 5000) {
                return this.$t('example.trees')
            } else if (this.money.amount >= 2000) {
                return this.$t('example.filter')
            } else if (this.money.amount >= 1500) {
                return this.$t('example.soap')
            }
            return this.$t('example.default')
        },
        amountMin() {
            return this.minAmount
        },
        amountMax() {
            return 10000
        },
        money: {
            get () {
                this.setFaucet(this.$store.state.payment.money)
                return this.$store.state.payment.money
            },
            set(value) {
                this.setFaucet(value)
                this.$store.commit('payment/money', value)
            }
        },
        getFaucet() {
          //return require('@/assets/img/slider/faucet/glas_empty.svg')
          return require('@/assets/img/slider/faucet/glas_' + this.current + '.png')
        }
    },
    methods: {
        setFaucet(value) {
            var parts = this.amountMax / this.steps
            let current = Math.max(1, Math.round(value.amount / parts))
            current = Math.min(5, current)
            this.current = current
        },
        setAmount (e) {
            this.money = { amount: parseInt(e.target.value), currency: this.money.currency }
        }
    }
}
</script>
<style lang="scss">
  .faucetslide {

    input {
      width: 100%;
      box-shadow: none;
    }

    .images {
      white-space: nowrap;
      width: 60%;
      margin: auto;
      display: flex;
      position: relative;

      @include media(large) {
        width: auto;
        display: table;
        text-align: center;
      }

      img {
        z-index: 100;
        width: 30%;
        margin: auto;
        position: relative;
      }

    }
    .amount h2 {
      margin: 15px;
    }

    .count {
      width: 100%;

      .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 15px;
        background: linear-gradient(to right, #82CFD0 0%, #82CFD0 50%, #fff 50%, #fff 100%);
        background: $primary-light;
        border-radius: 8px;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
      }

      .slider:hover {
        opacity: 1;
      }

      /* IE
      */
      .slider::-ms-fill-lower {
        background-color: $main-color;
      }
      .slider::-ms-fill-upper {
        background-color: $primary-light;
      }


      /* Firefox
      */
      .slider::-moz-range-progress {
        background-color: $main-color;
        height: 15px;
        border-radius: 8px;
      }
      .slider::-moz-range-track {
        background-color: $primary-light;
      }
      .slider::-moz-range-thumb {
        width: 50px;
        height: 50px;
        background-image: url("~@/assets/img/slider/faucet/drop.png");
        background-position: center;
        background-size: cover;
        background-color: transparent;
        border: none;
        cursor: pointer;
      }

      /*Chrome
      */
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 50px;
        height: 50px;
        background-image: url("~@/assets/img/slider/faucet/drop.png");
        background-position: center;
        background-size: cover;
        cursor: pointer;
      }
    }

    .count input[type=range] {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box;    /* Firefox, other Gecko */
      box-sizing: border-box;
    }

  }
</style>
