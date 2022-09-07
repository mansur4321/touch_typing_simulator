<template>
    <div class="main-popup">
        <div class="main-popup__left-column">
            <div class="main-popup__text-field">
                <span class="main-popup__completed">{{completed}}</span>
                
                <span
                    :class="{
                        'main-popup__selected-error': errorInput,
                        '_spaceSymbol': spaceSymbol
                    }" 
                class="main-popup__selected">{{selected}}</span>
                
                <span class="main-popup__empty">{{originalText}}</span>
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
            errorInput: false,
            spaceSymbol: false,

            completed: '',
            selected: '',
            originalText: 'lorems sssssssss sssss ssssssssssss ssssssssssslkd ,clk slkdcl ksdmlckmslk dcmls mdlckmsl kdmclkmsdlkcml sdkmclksdm',
        }
    },

    mounted() {
        document.addEventListener('keydown', (event) => {
            let symbol = event.key;

            if (symbol.length > 1) return;

            this.updateText(symbol);
        });


        this.selected = this.originalText[0];
        this.originalText = this.originalText.slice(1);
    },

    watch: {
        selected(value) {
            if (value === ' ') {
                this.spaceSymbol = true;
            } else {
                this.spaceSymbol = false;
            }
        }
    },

    methods: {
        updateText(symbol) {
            if (symbol === this.selected) {
                this.errorInput = false;

                this.completed += this.selected;
                this.selected = this.originalText[0];
                this.originalText = this.originalText.slice(1);
            } else {
                this.errorInput = true;
            }
        }
    }
}
</script>

<style>

</style>