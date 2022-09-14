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

            <again
                @again="startExercisingAgain"
            class="mt-left-item"></again>

            <difficulty
                @changeMode="changeMode"
            class="mt-left-item"></difficulty>
        </div>
    </div>
</template>

<script>
import LoremText from '../API/lorem_text'

import Again from './again.vue'
import Difficulty from './difficulty.vue'
import statistic from './statistic.vue'

export default {
    props: {
        againMark: Boolean,
    },

    components: { 
        statistic,
        Again,
        Difficulty,
    },
    name: 'mainPopup',

    data() {
        return {
            lang: 'rus',
            numberOfSentences: 2,

            errorInput: false,
            spaceSymbol: false,

            completed: '',
            selected: '',
            originalText: '',

            stats: [
                {
                    title: 'Скорость',
                    value: '0зн/м',
                    maxValue: '0зн/м',
                },

                {
                    title: 'Точность',
                    value: '100%',
                    maxValue: '0%',
                }
            ],

            enteredValue: 0,
            timer: 0,

            pieceFullText: 0,

            speedInterval: null,
            roundInterval: null,
        }
    },

    mounted() {
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

        againMark() {
            this.updateOriginalText(this.lang);
        },

        numberOfSentences() {
            this.updateOriginalText(this.lang);
        }
    },

    methods: {
        updateTextsValue(symbol) {
            if (symbol === this.selected) {
                this.errorInput = false;

                this.completed += this.selected;
                this.selected = this.originalText[0];
                this.originalText = this.originalText.slice(1);

                if (this.originalText.length === 0 && this.selected === undefined) {
                    this.preCompletedGame();
                }

                this.enteredValue += 1;
            } else {
                if(this.errorInput === true) return;

                this.errorInput = true;
                this.accuracyCheck();
            }
        },

        newLetterSlice() {
            this.completed = '';
            this.selected = this.originalText[0];
            this.originalText = this.originalText.slice(1);
        },

        correctAmount(num, lang) {
            if (lang === 'eng') {
                return num * 2;
            }

            return num;
        },

        async updateOriginalText(lang) {
            let loremTextObj = new LoremText(lang);
            this.originalText = await loremTextObj.getLoremText(this.correctAmount(this.numberOfSentences, lang)); 

            this.pieceFullText = (100 / this.originalText.length).toFixed(1);
            
            this.newLetterSlice();
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

            function speed() {
                this.timer += piece;
                this.stats[0].value = Math.floor(this.enteredValue / this.timer) + 'зн/м';
            }

            function roundMin() {
                this.timer = Math.ceil(this.timer);
            }

            this.speedInterval = setInterval(speed.bind(this) , 1000);
            this.roundInterval = setInterval(roundMin, 60000);
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


        startExercisingAgain() {
            this.originalText = this.completed + this.selected + this.originalText;

            this.newLetterSlice();

            this.stats[0].value = '0зн/м';
            this.stats[1].value = '100%';
            
            this.enteredValue = 0;
            this.timer = 0;
            clearInterval(this.speedInterval);
            clearInterval(this.roundInterval);
        },

        
        preCompletedGame() {
            let values = {
                speed: this.stats[0].value.slice(0, this.stats[0].value.length - 4),
                accuracy: this.stats[1].value.slice(0, this.stats[1].value.length - 1),
                maxSpeed: this.stats[0].maxValue.slice(0, this.stats[0].maxValue.length - 4),
                maxAccuracy: this.stats[1].maxValue.slice(0, this.stats[1].maxValue.length - 1),
            }

            this.completedGame(values);
        },
        
        completedGame(values) {
            let fullStats = [
                {
                    title: this.stats[0].title
                },

                {
                    title: this.stats[1].title
                }
            ];
        
            if (values.speed > values.maxSpeed) {
                fullStats[0].oldValue = values.maxSpeed;
                fullStats[0].maxValue = values.speed;
                fullStats[0].value = values.speed;
            } else {
                fullStats[0].oldValue = values.maxSpeed;
                fullStats[0].maxValue = false;
                fullStats[0].value = values.speed;
            }

            if (values.accuracy > values.maxAccuracy) {
                fullStats[1].oldValue = values.maxAccuracy;
                fullStats[1].maxValue = values.accuracy;
                fullStats[1].value = values.accuracy;
            } else {
                fullStats[1].oldValue = values.maxAccuracy;
                fullStats[1].maxValue = false;
                fullStats[1].value = values.accuracy;
            }

            this.$emit('completedGame', fullStats);

            this.startExercisingAgain();
        },


        changeMode(mode) {
            switch(mode) {
                case 'hard':
                    this.numberOfSentences = 4;
                    break;
                case 'easy': 
                    this.numberOfSentences = 2;
                    break;
            }
        }
    }
}
</script>

<style>

</style>