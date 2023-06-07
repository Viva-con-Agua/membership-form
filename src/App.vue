<template>
    <div id="app">
        <notifications position="top center" width="100%"/>
        <div id="payment-widget" class="payment-widget" ref="paymentwidget" @click="interaction">
            <router-view class="app-content"/>
        </div>
    </div>
</template>
<script>
//import VueI18n from 'vue-i18n'
//import de from '@/lang/de_DE.json';
//import en from '@/lang/en_GB.json';
/*let i18n = new VueI18n({
    locale: getUserLocale(),
    fallbackLocale: "de",
    messages: {
        'de': de,
        'de-DE': de,
        'de-CH': de,
        'ch': de,
        'en': en,
        'gb': en,
        'en-GB': en
    }
    });*/
export default {
    name: 'App',
    /*  props: {
        campaign_id: {
            type: String,
            default: ""
        }
    },
    created() {
        this.$store.dispatch({type: 'init', data: this.campaign_id})
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
    },*/
    methods: {
        success(e) {
            console.log(e)
        },
        interaction() {
            const contentHeight = this.$refs.paymentwidget.clientHeight;
            const message = {
                type: 'iframe-height',
                data: {
                    height: contentHeight,
                },
            };
            parent.postMessage(message, '*');
            if (process.env.VUE_APP_MODE === "debug") {
                console.log('client height: ', contentHeight);
            }
        },
    },
    mounted() {
        window.addEventListener(
            'message',
            (event) => {
                if (event.data.type === 'iframe-loaded') {
                    console.log('iframe loaded event received');
                    this.interaction();
                }
            },
            false,
        );
    },

}
</script>
