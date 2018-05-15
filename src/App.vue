<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="link-btn">
      <router-link :to="{name: 'useMyCalendar', path: '/usemycalendar'}">我的事件日历组件（超简洁版）></router-link>
      <br>
      <router-link :to="{name: 'HelloWorld', path: '/helloworld'}">滚动条插件 ></router-link>
    </div>
       
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
.link-btn {
  text-align: center;
}
</style>
