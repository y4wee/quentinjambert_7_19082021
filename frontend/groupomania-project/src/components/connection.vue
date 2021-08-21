<template>
  <div class="user">
    <img alt="Vue logo" src="../assets/logo-groupomania.svg">
    <p>
      Bienvenue sur le réseau social interne de groupomania, créez, partagez et commentez afin de mieux nous connaitre au sain de l'entreprise !
    </p>

    <div class="userConnection">
      <h1>Connectez vous</h1>
      <form class="userConnectionForm">
        <label for="connectionEmail">Email</label>
        <input type="email" id="connectionEmail" name="connectionEmail" required>

        <label for="connectionPassword">Password</label>
        <input type="text" id="connectionPassword" name="connectionPassword" required>

        <input type="submit" value="Connection">
      </form>
    </div>

    <div class="userInscription">
      <h1>Inscrivez vous</h1>
      <form class="userInscriptionForm" method="post">
        <label for="inscriptionName">Nom</label>
        <input type="text" id="inscriptionName" name="inscriptionName" required>

        <label for="inscriptionFirstname">Prénom</label>
        <input type="text" id="inscriptionFirstname" name="inscriptionFirstname" required>

        <label for="inscriptionEmail">Email</label>
        <input type="email" id="inscriptionEmail" name="inscriptionEmail" required>

        <label for="inscriptionPassword">Password</label>
        <input type="text" id="inscriptionPassword" name="inscriptionPassword" required>

        <input type="submit" value="Validation">
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Connection',
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
