<template>
  <div id="app">
    <HeaderComponent />
    <router-view></router-view>
    <FooterComponent />
    
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';

import FooterComponent from './components/FooterComponent.vue';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  name: 'App',
  components: {
    HeaderComponent,
  
    FooterComponent
  }
};
</script>

<style>
/* Styles globaux si nécessaire */
</style>
