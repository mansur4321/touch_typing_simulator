<template>
    <div class="main-popup">
        <div class="main-popup__left-column">
            <div class="main-popup__text-field">
                <span class="main-popup__completed">p[] ghbdtn rfr ltkf xnj ltkftim hahahahah</span><span class="main-popup__selected">a</span><span class="main-popup__empty"> vexla</span>
            </div>
        </div>

        <div class="main-popup__rigth-column">
            <statistic

            class="mt-left-item"></statistic>
            <statistic

            class="mt-left-item"></statistic>

            <again class="mt-left-item"></again>

            <difficulty class="mt-left-item"></difficulty>
        </div>
    </div>
</template>

<script>
import Again from './again.vue'
import Difficulty from './difficulty.vue'
import statistic from './statistic.vue'
export default {
    components: { 
        statistic,
        Again,
        Difficulty,
    },
    name: 'mainPopup',

    data() {
        return {

        }
    },

    methods: {
        
    }
}
</script>

<style>

</style>