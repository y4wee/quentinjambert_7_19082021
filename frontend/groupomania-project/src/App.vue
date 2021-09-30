<template>
  <div class="main">

    <router-view/>

  </div>
</template>

<style lang="scss">
// #091f43 text bleu
// #122441 bleu
// #d1515a rose
// #aeaeb1 gris
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #091f43;
  min-height: 100vh;
  }

body {
  margin: 0;
  min-height: 100vh;
  min-width: 100vw;
}

.main {
  min-height: 100vh;
}

#nav {
  a {
    font-weight: bold;
    color: #091f43;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
