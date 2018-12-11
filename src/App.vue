<template>
  <div id="app">
        <nav class="navbar navbar-light bg-light">
          <router-link class="navbar-brand mb=0 h1" to="/">Github users</router-link>
        </nav>
  <div class="content">
    <router-view></router-view>
</div>
  </div>

</template>

<script>

export default {
  methods: {

  },

  name: 'app',

}
</script>

 <style>
.content {
  margin-top:50px
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
