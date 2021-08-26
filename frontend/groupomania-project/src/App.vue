<template>
  <div class="main">
    <div id="nav">
      <router-link to="/">log</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/publication">publication</router-link> |
      <router-link to="/creation">créer</router-link> |
      <router-link to="/compte">compte</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
