<template>
  <div class="language-selection" :title="$t('language.title')">
    <div class="flag-cont" :class="{flagInactive: (language != lang.lang)}" v-for="(lang, index) in languages" :key="index" @click="changeLanguage(lang.lang)">
      <span v-if="language == lang.lang" class="flag-icon" :class="currentFlag"></span>
      <div v-else>
          <span class="flag-icon" :class="flag(lang.flag)"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LanguageSelection',
  data() {
    return {
      languages: [
        { "lang": "de-DE", "flag": "de" },
        { "lang": "de-CH", "flag": "ch" },
        { "lang": "en-GB", "flag": "gb" }
      ],
      language: localStorage.language
    }
  },
  computed: {
    currentFlag() {
      let lang = this.languages.filter(row =>  row.lang == this.$i18n.locale )
      return "flag-icon-" + lang[0].flag
    }
  },
  created() {
    if (localStorage.language === undefined) {
      localStorage.language = this.$i18n.locale.toLowerCase()
    } else {
      this.$i18n.locale = localStorage.language
    }
  },
  methods: {
    changeLanguage(language)  {
      localStorage.language = language
      this.$i18n.locale = language
      this.language = language
    },
    flag(lang) {
      return 'flag-icon-' + lang
    }
  }
};
</script>
<style lang="scss">
  .language-selection {
    .flag-cont {
      display: inline-block;
      cursor: pointer;
      font-size: 1.2em;
      margin: 0 3px;
    }
    .flagInactive {
      font-size: .7em;
    }
  }
</style>
