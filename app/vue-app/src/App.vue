<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>Vue应用已启动</p>
  </div>
</template>

<script>
window.vueAppLoad = "vueAppLoad";

export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: #b3fbaa;
}
</style>
