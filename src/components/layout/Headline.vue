<template>
    <vca-card class="headline">
        <h1>{{ headLine }}</h1>
    </vca-card>
</template>
<script>

export default {
    name: 'Headline',
    props: {
        text: {
            type: String,
            default: null
        }
    },
    computed: {
        headLine() {
            return this.text ? this.text : this.$t('headline.donate')
        }
    }
}
</script>