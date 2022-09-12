<template>
    <div class="statistic">
        <p class="statistic__title">
            {{stat.title}}:
        </p>

        <div class="statistic__wrapper-stat">
            <p class="statistic__value">
                {{stat.value}}
            </p>
            <p class="statistic__max-stat">
                {{stat.maxValue}} <span>max</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        stat: Object,
    },
    
    name: 'statistic',
}
</script>

<style>

</style>