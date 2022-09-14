<template>
    <div
        @click="again"
    class="again">
        <img src="../assets/again.png" class="again__img">
        <span class="again__text">
            Заново
        </span>
    </div>
</template>

<script>
export default {
    name: 'again',

    methods: {
        again() {
            this.$emit('again');
        }
    }
}
</script>

<style>

</style>