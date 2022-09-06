<template>
  <div class="container">
    <main-popup></main-popup>
  </div>
</template>

<script>
import mainPopup from "./components/main-popup.vue";


export default {
  name: 'App',
  components: { 
    mainPopup 
  }
}
</script>

<style src="../less/index.less" lang="less">
</style>
