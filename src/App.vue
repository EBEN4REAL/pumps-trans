
<template>
  <div id="app" data-test="app">
    <transition >
      <router-view />
    </transition>
  </div>
</template>

<script>

export default {
  name: "AppComponent",
  components: {
  
  },
  data(){
    return {
      transitionName: ''
    }
  },
  methods: {
 
   
  }
};
</script>

<style lang="scss">
  @import "@/assets/sass/styles.scss";
  @import url("https://cdn.syncfusion.com/ej2/material.css");
</style>