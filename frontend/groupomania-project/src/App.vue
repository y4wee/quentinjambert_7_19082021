<template>
  <div>
    <img alt="Vue logo" src="./assets/logo-groupomania.svg">
    <p>
      Bienvenue sur le réseau social interne de groupomania, créez, partagez et commentez afin de mieux nous connaitre au sain de l'entreprise !
    </p>
    <Connection/>
  </div>
</template>

<script>
import Connection from './components/connection.vue'

export default {
  name: 'App',
  components: {
    Connection
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    height: 500px;
  }
}
</style>
