<template>
    <div class="cupslide">
        <div class="images-container">
        <div class="images">
            <div  v-for="index in all" :key="index" class="images_empty">
                <img v-if="index > full" src="@/assets/img/slider/cups/leeres_Glas.svg"/>
                <img v-if="index <= full" src="@/assets/img/slider/cups/volles_Glas.svg"/>
            </div>
        </div>
    </div>
    <div class="count">
    <img class="count" src="@/assets/img/slider/cups/Einheiten.svg"/>
    <input type="range" min="500" max="10000" :value="money.amount" step="500" @input="setAmount">
    </div>
    </div>
</template>
<script>
export default {
    name: 'CupSlider',
    data () {
        return {
            value: 0,
            empty: 0,
            all: 10,
            full: 0
        }
    },
    computed: {
        money: {
            get () {
                return this.$store.state.payment.money
            },
            set(value) {
                this.$store.commit('payment/money', value)
            }
        }
    },
    created() {
        var mask = parseInt(this.money.amount / 1000)
        this.full = mask
        this.empty = 10 - mask
    },
    methods: {
        setAmount (e) {
            var mask = parseInt(e.target.value / 1000)
            this.full = mask
            this.empty = 10 - mask

            this.money = { amount: parseInt(e.target.value), currency: this.money.currency }
        }
    }
}
</script>
<style>
.cupslide input {
    width: 100%;
    box-shadow: none;
}
.images {
    /*display: flex;
    flex-direction: row;*/
    white-space: nowrap;
    width: 100%;
    display: table;
}
.images_empty, .images_full {
    display: table-cell;

}

.images_full img {
    padding: 5px;
    width: 100%;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;   


}
.images_empty img {
    padding: 5px;
    width: 100%;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;   


}
.count {
    width: 100%;
}

.count img {
    width: 100%;
    padding: 5px;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;   
}
.count input[type=range] {
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;   
} 



</style>
