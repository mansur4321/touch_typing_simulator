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
                v-for="stat of stats"
                :key="stat.title"
                :stat="stat"
            class="mt-left-item"></statistic>

            <again class="mt-left-item"></again>

            <difficulty class="mt-left-item"></difficulty>
        </div>
    </div>
</template>

<script>
import LoremText from '../API/lorem_text'

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
            lang: 'rus',

            errorInput: false,
            spaceSymbol: false,

            completed: '',
            selected: '',
            originalText: 'lorems sssssssss sssss ssssssssssss ssssssssssslkd ,clk slkdcl ksdmlckmslk dcmls mdlckmsl kdmclkmsdlkcml sdkmclksdm',

            stats: [
                {
                    title: 'Скорость',
                    value: '0зн/м',
                    maxValue: '0',
                },

                {
                    title: 'Точность',
                    value: '100%',
                    maxValue: '0',
                }
            ],

            enteredValue: 0,

            pieceFullText: 0,
        }
    },

    async mounted() {
        let lang;

        document.addEventListener('keydown', (event) => {
            let symbol = event.key;

            if (symbol.length > 1) return;

            lang = this.defineLanguage(event.key);

            if (lang) {
                if (lang !== this.lang) {
                    let bool = confirm('Вы изменили раскладку. Изменить текст под неё?');

                    if (!bool) {
                        return;
                    }

                    this.updateOriginalText(lang);
                    this.lang = lang;
                }


                this.updateTextsValue(symbol);
            } else {
                return;
            }
        });

        this.updateOriginalText(this.lang);
    },

    watch: {
        selected(value) {
            if (value === ' ') {
                this.spaceSymbol = true;
            } else {
                this.spaceSymbol = false;
            }
        },

        completed(value) {
            if (value.length === 1) {
                this.speedometer();
            }
        },
    },

    methods: {
        updateTextsValue(symbol) {
            if (symbol === this.selected) {
                this.errorInput = false;

                this.completed += this.selected;
                this.selected = this.originalText[0];
                this.originalText = this.originalText.slice(1);

                this.enteredValue += 1;
            } else {
                if(this.errorInput === true) return;

                this.errorInput = true;
                this.accuracyCheck();
            }
        },

        async updateOriginalText(lang) {
            let loremTextObj = new LoremText(lang);
            this.originalText = await loremTextObj.getLoremText(4); 

            this.pieceFullText = (100 / this.originalText.length).toFixed(1);
            
            this.completed = '';
            this.selected = this.originalText[0];
            this.originalText = this.originalText.slice(1);
        },

        defineLanguage(value) {
            if (/[а-я]/i.test(value)) {
                return 'rus';
            } else if (/[a-z]/i.test(value)) {
                return 'eng';
            }else if(/[\s\d\W]/i.test(value)) {
                return this.lang;
            } else {
                alert('Приложение не работает с вашей раскладкой. Измените на русский или английский язык.');
                return false;
            }
        },


        speedometer() {
            let piece = 1 / 60;
            let timer = 0;

            function speed() {
                timer += piece;
                this.stats[0].value = Math.floor(this.enteredValue / timer) + 'зн/м';
            }

            setInterval(speed.bind(this) , 1000);
            setInterval(() => {
                timer = Math.ceil(timer);
            }, 60000);
        },

        accuracyCheck() {
            let valueAccuracy = +this.stats[1].value.slice(0, this.stats[1].value.length - 1);

            if (valueAccuracy === 0) return;


            if (valueAccuracy < this.pieceFullText) {
                this.stats[1].value = '0%';
                return;
            }


            this.stats[1].value = (valueAccuracy - this.pieceFullText).toFixed(1) + '%';
        },

    }
}
</script>

<style>

</style>