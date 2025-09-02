<template>
    <vca-card>
        <div class="text-center">
            <h2 class="text-center">
                {{ headline }}
            </h2>
            <br />
            <p class="text-center" style="font-weight: bold">{{ description }}</p>
            <br />
            <a
                class="text-center vca-button-small"
                style="width: auto; display: inline-flex"
                :href="fallbackUrl">
                {{ fallbackLabel }}</a
            >

            <br />
            <br />
            <p class="text-center">
                {{ $t('error_page.expired.contact') }}
                <a style="font-weight: bold" href="mailto:kontakt@vivaconagua.org"
                    >kontakt@vivaconagua.org</a
                >.
            </p>
        </div>
    </vca-card>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'ExpiredPage',
        computed: {
            ...mapGetters({
                expired: 'form/expired',
                expired_form: 'form/expired_form',
            }),
            description() {
                if (this.expired_form.description != '') {
                    return this.expired_form.description;
                } else {
                    return this.$t('error_page.expired.description');
                }
            },
            headline() {
                if (this.expired_form.headline != '') {
                    return this.expired_form.headline;
                } else {
                    return this.$t('error_page.expired.headline');
                }
            },
            fallbackUrl() {
                if (this.expired_form.fallback_url != '') {
                    return this.expired_form.fallback_url;
                } else {
                    return 'https://www.vivaconagua.org/spende/';
                }
            },
            fallbackLabel() {
                if (this.expired_form.fallback_label != '') {
                    return this.expired_form.fallback_label;
                } else {
                    return this.$t('error_page.expired.fallback_url');
                }
            },
        },
    };
</script>
