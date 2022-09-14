export default class LocalStorageAPI {
    name = 'max_values';
    myStorage = window.localStorage;

    getValues() {
        if (this.myStorage.getItem(this.name) === null) {
            return {
                speed: '0зн/м',
                accuracy: '100%',
            };
        }

        return JSON.parse(this.myStorage.getItem(this.name));
    }

    setValues(values) {
        values = JSON.stringify(values);
        this.myStorage.setItem(this.name, values);
    }
}