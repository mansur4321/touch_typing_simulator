<template>
    <div class="difficulty">
        <a
            @click="changeMode(false)"
            :class="{
                '_btn-active': !hardMode
            }"
        class="difficulty__item">
            EASY
        </a>

        <a
            @click="changeMode(true)"
            :class="{
                '_btn-active': hardMode
            }"
        class="difficulty__item">
            HARD
        </a>
    </div>
</template>

<script>
export default {
    name: 'difficulty',

    data() {
        return {
            hardMode: false,
        }
    },

    methods: {
        changeMode(mode) {
            this.hardMode = mode;
        }
    }

}
</script>

<style>

</style>