<template>
    <div class="main-popup">
        <div class="main-popup__left-column">
            <textarea class="main-popup__text-field">
                p[] ghbdtn rfr ltkf xnj ltkftim hahahahaha vexla
            </textarea>
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
    }
}
</script>

<style>

</style>