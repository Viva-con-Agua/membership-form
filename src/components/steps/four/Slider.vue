<template>
    <div class="text-center slider-container">
        <vueper-slides
            class="no-shadow slider-container-mobile"
            :touchable="false"
            :visible-slides="2"
            :bullets="false"
            :infinite="false"
            :slide-ratio="1 / 3"
            >
            
            <template #arrow-left>
                <div class="swiper-button-prev"></div>
            </template>

            <template #arrow-right>    
                <div class="swiper-button-next"></div>
            </template>
            

            <vueper-slide
                v-for="(slide, i) in slides"
                :key="i"
                :image="slide.image"
                :title="slide.title" />

        </vueper-slides>


        <vueper-slides
            class="no-shadow slider-container-desktop"
            :touchable="false"
            :visible-slides="4"
            :bullets="false"
            :infinite="false"
            :slide-ratio="1 / 6"
            >
            
            <template #arrow-left>
                <div class="swiper-button-prev"></div>
            </template>

            <template #arrow-right>    
                <div class="swiper-button-next"></div>
            </template>
            

            <vueper-slide
                v-for="(slide, i) in slides"
                :key="i"
                :image="slide.image"
                :title="slide.title" />

        </vueper-slides>
    </div>
 </template> 

<script>

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
    name: 'Slider',
    components: {VueperSlides, VueperSlide},
    data() {
        return {
            slides: [
              { image: require('@/assets/img/thanks/img1.jpg') },
              { image: require('@/assets/img/thanks/img2.jpg') },
              { image: require('@/assets/img/thanks/img3.jpg') },
              { image: require('@/assets/img/thanks/img4.jpg') },
              { image: require('@/assets/img/thanks/img5.jpg') },
              { image: require('@/assets/img/thanks/img6.jpg') }
            ]
        }
    },
}
</script>
<style lang="scss">


    .slider-container {

        width: 90%; 
        margin: auto;
        box-sizing: border-box;

        .slider-container-mobile {
            display: block;
            width: 80%;
            margin: auto;
            @include media(large) {
                display: none;
            }
        }
        .slider-container-desktop {
            display: block;
            @include media(small) {
                display: none;
            }
        }


        .vueperslides__track {
            padding-right: 90px;
        }

        .vueperslide {
            margin-right: 15px;
            transition: transform .4s ;
            transform: scale(0.75);
        }
        .vueperslide--active {
            transform:  scale(1);
        }
        .swiper-button-next, .swiper-button-prev {
            top: auto;
            bottom: 0;
            left: auto;
            font-family: swiper-icons;
            right: 85px;
            width: 55px;
            height: 55px;
            background-image: url('~@/assets/img/swipeBox.svg');
            background-repeat: no-repeat;
            background-size: contain;
            transition: background-color .45s ease;
            margin-left: 10px;
        }

        .swiper-button-prev::after {
            content: url('~@/assets/img/swiperLeft.svg');
        }
        .swiper-button-next::after {
            content: url('~@/assets/img/swiperRight.svg');
        }

        .swiper-button-next::after, .swiper-button-prev::after {
            width: 16px;
            transition: transform .4s cubic-bezier(.32,.65,.14,1.35);
            letter-spacing: 0;
            font-variant: normal;
            line-height: 1;
            position: relative;
            top: 30%;
        }
    }


</style>