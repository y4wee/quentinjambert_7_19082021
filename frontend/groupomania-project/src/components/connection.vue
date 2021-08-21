<template>
  <div class="user">

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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
