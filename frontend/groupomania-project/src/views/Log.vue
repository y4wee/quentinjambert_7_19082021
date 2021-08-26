<template>
  <div class="user">
    <img alt="Vue logo" src="../assets/logo-groupomania.svg">
    <p>
      Bienvenue sur le réseau social interne de groupomania, créez, partagez et commentez afin de mieux nous connaitre au sain de l'entreprise !
    </p>

    <Connection />

    <Inscription />

  </div>
</template>

<script>
import Connection from '../components/connection.vue'
import Inscription from '../components/inscription.vue'

export default {
  name: 'Log',
  components: {
    Connection,
    Inscription
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div, form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
img {
  height: 500px;
}
</style>
