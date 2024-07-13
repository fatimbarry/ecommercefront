<template>
  <div id="app">
    <HeaderComponent />
    <HomeComponent />
    <FooterComponent />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import HomeComponent from './components/HomeComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    HomeComponent,
    FooterComponent
  }
};
</script>

<style>
/* Styles globaux si nécessaire */
</style>
