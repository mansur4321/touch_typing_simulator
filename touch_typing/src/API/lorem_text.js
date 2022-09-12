'use strict'

export default class LoremText {
    _lang = 'rus'
    _rus_URL = 'https://fish-text.ru/get?&type=sentence&number=';
    _eng_URL = 'https://baconipsum.com/api/?type=all-meat&sentences=';

    constructor(lang) {
        this.lang = lang;
    }

    set lang(value) {
        if (value === '') {
            return;
        }
        
        if (value === 'rus' || value === 'eng') {
            this._lang = value
        } else {
            console.log('не правильный тип языка');
        }
    }

    get lang() {
        return this._lang;
    }

    get correct_URL() {
        return this[`_${this.lang}_URL`];
    }

    async getLoremText(length) {
        let response = await fetch(`${this[`_${this.lang}_URL`] + length.toString()}`, {
            method: 'GET',
        });

        if(response.ok) {
            let message = await response.json();

            switch(this.lang) {
                case 'rus':
                    return message.text;
                
                case 'eng':
                    return message[0];
            }

            return message;
        } else {
            alert(Error('ошибка запроса'));
        }
    }

}