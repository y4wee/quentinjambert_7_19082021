<template>
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
</template>

<script>
export default {
  name: 'Inscription',
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
