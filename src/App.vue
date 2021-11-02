<template>
  <div id="app">
    <notifications position="top center" width="100%"/>
    <div id="payment-widget" class="payment-widget">
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
        }
    }

}
</script>
