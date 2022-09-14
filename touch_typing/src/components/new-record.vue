<template>
    <div class="new-record">
        <p class="new-record__title">
            {{stat.title}}:
        </p>

        <div class="new-record__wrapper">
            <div class="new-record__value">
                новое значение: <span>{{stat.maxValue}}</span>
            </div>

            <div class="new-record__value">
                старое значение: <span>{{stat.oldValue}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'new-record',
    props: ['stat']
}
</script>

<style>

</style>