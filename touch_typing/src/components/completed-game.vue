<template>
  <div class="completed">
    <p class="completed__title">
      Поздравляем!<br> Вы закончили тренировку!
    </p>

    <div
      v-if="recordWrapper"
    class="completed__new-record-wrapp">
      <p class="completed__text">
        Вы установили новый рекорд!
      </p>

      <div class="completed__new-record-values">
        <new-record
          v-for="stat of statistics"
          :key="stat.title"
          :stat="stat"
        ></new-record>
      </div>
    </div>

    <p class="completed__text">
      Ваши показатели: <span>{{statistics[0].value}}зн/м</span> | <span>{{statistics[1].value}}%</span>
    </p>

    <again
      @click="startAgain"
    ></again>
  </div>
</template>

<script>
import NewRecord from './new-record.vue';
import Again from './again.vue';

import LocalStorageAPI from '../API/localStorageAPI';

export default {
  components: {
    NewRecord,
    Again
},

  props: {
    statistics: Array,
  },

  data() {
    return {
      recordWrapper: true,
      myStorage: new LocalStorageAPI(),
    }
  },

  created() {
    let values = {
      speed: 'зн/м',
      accuracy: '%',
    }

    this.statistics.forEach((stat, index) => {
      if(!stat.maxValue) {
        this.statistics.splice(index, 1);
        
        switch(stat.title) {
          case 'Скорость': 
            values.speed = stat.oldValue + values.speed;
            break;
          
          case 'Точность':
            values.accuracy = stat.oldValue + values.accuracy;
            break;
        }

      } else {
        switch(stat.title) {
          case 'Скорость': 
            values.speed = stat.maxValue + values.speed;
            break;
          
          case 'Точность':
            values.accuracy = stat.maxValue + values.accuracy;
            break;
        }
      }
    });

    
    if (this.statistics.length === 0) {
      this.recordWrapper = false;
    } else {
      this.myStorage.setValues(values);
    }
  },

  methods: {
    startAgain() {
      this.$emit('startAgain');
    }
  }
}
</script>

<style>

</style>