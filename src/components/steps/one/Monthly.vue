<template>
    <div>
        <button class="btn-drop .btn-flex-box" :class="dropSelected(500)" @click.prevent="submit(500)">
            <div v-if="money.amount != 500" >
                <img src="~@/assets/icons/icon_vca.png"/>
            </div>
            <div v-else>
                <img src="~@/assets/icons/icon_vca_white.png"/>
            </div>
            <span class="btn-amount">5 EURO</span><br/><div class="btn-type">TROPFEN Fördermitglied</div>
        </button>
        <button class="btn-drop .btn-flex-box" :class="dropSelected(1000)" @click.prevent="submit(1000)">
            <div v-if="money.amount != 1000" >
                <img src="~@/assets/icons/icon_vca.png"/>
                <img src="~@/assets/icons/icon_vca.png"/>
            </div>
            <div v-else>
                <img src="~@/assets/icons/icon_vca_white.png"/>
                <img src="~@/assets/icons/icon_vca_white.png"/>
            </div>
            <span class="btn-amount">10 EURO</span><br/><div class="btn-type">BRUNNEN Fördermitglied</div>
        </button>
        <button class="btn-drop .btn-flex-box" :class="dropSelected(2000)" @click.prevent="submit(2000)">
            <div v-if="money.amount != 2000" >
                <img src="~@/assets/icons/icon_vca.png"/>
                <img src="~@/assets/icons/icon_vca.png"/>
                <img src="~@/assets/icons/icon_vca.png"/>
            </div>
            <div v-else>
                <img src="~@/assets/icons/icon_vca_white.png"/>
                <img src="~@/assets/icons/icon_vca_white.png"/>
                <img src="~@/assets/icons/icon_vca_white.png"/>
            </div>
            <span class="btn-amount">20 EURO</span><br/><div class="btn-type">QUELLEN Fördermitglied</div>
        </button>
    </div>
</template>

<script>
export default {
    name: "Monthly",
    props:{
        amount:{
            type: Number,
            default: 0
        }
    },
    methods: {
        submit(){
            this.$emit("submit", this.amount)
        }
    }
}
</script>

