<template>
  <div class="container">
    <main-popup
      @completedGame="completedGame"
      :againMark="againMark"
    ></main-popup>
    
    <div
      :class="{
        '_close-component': !completePopup
      }"
    class="wrapper-complete-component">
      <completed-game
        v-if="completePopup"
        :statistics="fullStats"
        @startAgain="startAgain"
      ></completed-game>
    </div>
  </div>
</template>

<script>
import CompletedGame from './components/completed-game.vue';
import mainPopup from "./components/main-popup.vue";


export default {
  name: 'App',
  components: { 
    mainPopup,
    CompletedGame 
  },

  data() {
    return {
      completePopup: false,
      fullStats: null,

      againMark: false,
    }
  },

  methods: {
    completedGame(fullStats) {
      this.fullStats = fullStats.slice(0);

      this.completePopup = true;
    },

    startAgain() {
      this.completePopup = false;

      this.againMark = !this.againMark;
    }
  }
}
</script>

<style src="./less/index.less" lang="less">
</style>
